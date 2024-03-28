const { inject } = require('@servequery/context');
const P = require('bluebird');
const { plural, singular } = require('pluralize');
const ColumnTypeGetter = require('./sequelize-column-type-getter');
const DefaultValueExpression = require('./sequelize-default-value');
const TableConstraintsGetter = require('./sequelize-table-constraints-getter');
const EmptyDatabaseError = require('../../../../errors/database/empty-database-error');
const { isUnderscored } = require('../../../../utils/fields');
const ASSOCIATION_TYPE_BELONGS_TO = 'belongsTo';
const ASSOCIATION_TYPE_BELONGS_TO_MANY = 'belongsToMany';
const ASSOCIATION_TYPE_HAS_MANY = 'hasMany';
const ASSOCIATION_TYPE_HAS_ONE = 'hasOne';
const FOREIGN_KEY = 'FOREIGN KEY';
/** Queries database for default schema name */
async function getDefaultSchema(connection, userProvidedSchema) {
    if (userProvidedSchema) {
        return userProvidedSchema;
    }
    const dialect = connection.getDialect();
    const queries = {
        mssql: 'SELECT SCHEMA_NAME() AS default_schema',
        mysql: 'SELECT DATABASE() AS default_schema',
        mariadb: 'SELECT DATABASE() AS default_schema',
        postgres: 'SELECT CURRENT_SCHEMA() AS default_schema',
    };
    if (queries[dialect]) {
        const rows = await connection.query(queries[dialect], { type: connection.QueryTypes.SELECT });
        return rows.length && rows[0].default_schema ? rows[0].default_schema : 'public';
    }
    return 'public';
}
/** Retrieve the description of the fields in a given table. */
async function analyzeFields(queryInterface, tableName, config) {
    const dialect = queryInterface.sequelize.getDialect();
    let columnsByName;
    // Workaround bug in sequelize/dialects/mysql/query-generator#describe
    // => Don't provide the schema when using mysql/mariadb
    if (['mysql', 'mariadb'].includes(dialect)) {
        columnsByName = await queryInterface.describeTable(tableName, {});
    }
    else {
        columnsByName = await queryInterface.describeTable(tableName, { schema: config.dbSchema });
    }
    // Workaround bug in sequelize/dialects/(postgres|mssql)/query.js#run()
    // => Fetch the unmodified default value from the information schema
    if (dialect === 'postgres' || dialect === 'mssql') {
        const getDefaultsQuery = `
      SELECT column_name as colname, column_default as coldefault
      FROM information_schema.columns
      WHERE table_schema = ? AND table_name = ?
    `;
        const rows = await queryInterface.sequelize.query(getDefaultsQuery, {
            type: queryInterface.sequelize.QueryTypes.SELECT,
            replacements: [config.dbSchema, tableName],
        });
        rows.forEach(row => {
            columnsByName[row.colname].defaultValue = row.coldefault;
        });
    }
    Object.values(columnsByName).forEach(column => {
        const defaultValue = new DefaultValueExpression(dialect, column.type, column.defaultValue);
        // eslint-disable-next-line no-param-reassign
        column.defaultValue = defaultValue.parse();
    });
    return columnsByName;
}
async function analyzePrimaryKeys(schema) {
    return Object.keys(schema).filter(column => schema[column].primaryKey);
}
/** Retrieve table names from the provided schema. */
async function showAllTables(queryInterface, databaseConnection, schema) {
    const dbDialect = databaseConnection.getDialect();
    if (['mysql', 'mariadb'].includes(dbDialect)) {
        return queryInterface.showAllTables();
    }
    const tables = await queryInterface.sequelize.query("SELECT table_name as table_name FROM INFORMATION_SCHEMA.TABLES WHERE table_schema = ? AND table_type LIKE '%TABLE' AND table_name != 'spatial_ref_sys'", { type: queryInterface.sequelize.QueryTypes.SELECT, replacements: [schema] });
    return tables.map(table => table.table_name);
}
function hasTimestamps(fields) {
    let hasCreatedAt = false;
    let hasUpdatedAt = false;
    fields.forEach(field => {
        if (field.name === 'createdAt') {
            hasCreatedAt = true;
        }
        if (field.name === 'updatedAt') {
            hasUpdatedAt = true;
        }
    });
    return hasCreatedAt && hasUpdatedAt;
}
function formatAliasName(columnName) {
    const { assertPresent, lodash } = inject();
    assertPresent({ lodash });
    const alias = lodash.camelCase(columnName);
    if (alias.endsWith('Id') && alias.length > 2) {
        return alias.substring(0, alias.length - 2);
    }
    if (alias.endsWith('Uuid') && alias.length > 4) {
        return alias.substring(0, alias.length - 4);
    }
    return alias;
}
// NOTICE: Look for the id column in both fields and primary keys.
function hasIdColumn(fields, primaryKeys) {
    return (fields.some(field => field.name === 'id' || field.nameColumn === 'id') ||
        primaryKeys?.includes('id'));
}
function isTechnicalTimestamp({ type, name }) {
    // NOTICE: Ignore technical timestamp fields.
    const FIELDS_TO_IGNORE = [
        'createdAt',
        'updatedAt',
        'deletedAt',
        'createDate',
        'updateDate',
        'deleteDate',
        'creationDate',
        'deletionDate',
    ];
    return type === 'DATE' && FIELDS_TO_IGNORE.includes(name);
}
function isJunctionTable(fields, constraints) {
    for (let index = 0; index < fields.length; index += 1) {
        const field = fields[index];
        // NOTICE: The only fields accepted are primary keys, technical timestamps and foreignKeys
        if (!isTechnicalTimestamp(field) && !field.primaryKey) {
            return false;
        }
    }
    const foreignKeys = constraints.filter(constraint => constraint.foreignTableName && constraint.columnName && constraint.columnType === FOREIGN_KEY);
    // NOTICE: To be a junction table it means you have 2 foreignKeys, no more no less
    return foreignKeys.length === 2;
}
// NOTICE: Check the foreign key's reference unicity
function checkUnicity(primaryKeys, uniqueIndexes, columnName) {
    const { assertPresent, lodash } = inject();
    assertPresent({ lodash });
    const isUnique = uniqueIndexes !== null &&
        uniqueIndexes.find(indexColumnName => indexColumnName.length === 1 && indexColumnName.includes(columnName));
    const isPrimary = lodash.isEqual([columnName], primaryKeys);
    return isPrimary || isUnique;
}
function associationNameAlreadyExists(existingReferences, newReference) {
    return existingReferences.some(reference => reference && reference.as === newReference.as);
}
function referenceAlreadyExists(existingReferences, newReference) {
    return existingReferences.some(reference => reference &&
        reference.ref === newReference.ref &&
        reference.association === newReference.association &&
        reference.foreignKey === newReference.foreignKey);
}
// NOTICE: Format the references depending on the type of the association
function createReference(tableName, existingsReferences, association, foreignKey, manyToManyForeignKey) {
    const { assertPresent, lodash, strings } = inject();
    assertPresent({ lodash, strings });
    const foreignKeyName = lodash.camelCase(foreignKey.columnName);
    const reference = {
        foreignKey: foreignKey.columnName,
        foreignKeyName: `${foreignKeyName}Key`,
        association,
    };
    if (association === ASSOCIATION_TYPE_BELONGS_TO) {
        reference.ref = foreignKey.foreignTableName;
        reference.as = formatAliasName(foreignKey.columnName);
        if (foreignKey.foreignColumnName !== 'id') {
            reference.targetKey = foreignKey.foreignColumnName;
        }
    }
    else if (association === ASSOCIATION_TYPE_BELONGS_TO_MANY) {
        reference.ref = manyToManyForeignKey.foreignTableName;
        reference.otherKey = manyToManyForeignKey.columnName;
        reference.through = lodash.camelCase(strings.transformToSafeString(foreignKey.tableName));
        reference.as = lodash.camelCase(plural(`${manyToManyForeignKey.foreignTableName}_through_${foreignKey.tableName}`));
    }
    else {
        reference.ref = foreignKey.tableName;
        const formater = association === ASSOCIATION_TYPE_HAS_MANY ? plural : singular;
        const prefix = singular(tableName) === formatAliasName(foreignKeyName)
            ? ''
            : `${formatAliasName(foreignKeyName)}_`;
        if (foreignKey.foreignColumnName !== 'id') {
            reference.sourceKey = foreignKey.foreignColumnName;
        }
        reference.as = lodash.camelCase(formater(`${prefix}${foreignKey.tableName}`));
    }
    if (referenceAlreadyExists(existingsReferences, reference))
        return null;
    if (associationNameAlreadyExists(existingsReferences, reference)) {
        reference.as = lodash.camelCase(`${reference.as} ${reference.foreignKey}`);
    }
    return reference;
}
async function analyzeTable(queryInterface, tableConstraintsGetter, table, config) {
    const schema = await analyzeFields(queryInterface, table, config);
    return {
        schema,
        constraints: await tableConstraintsGetter.perform(table),
        primaryKeys: await analyzePrimaryKeys(schema),
    };
}
function createBelongsToReference(referenceTable, tableReferences, constraint) {
    const referenceColumnName = constraint.foreignColumnName;
    const referencePrimaryKeys = referenceTable.primaryKeys;
    const referenceUniqueConstraint = referenceTable.constraints.find(({ columnType }) => ['UNIQUE', 'PRIMARY KEY'].includes(columnType));
    const referenceUniqueIndexes = referenceUniqueConstraint
        ? referenceUniqueConstraint.uniqueIndexes
        : null;
    const isReferencePrimaryOrUnique = checkUnicity(referencePrimaryKeys, referenceUniqueIndexes, referenceColumnName);
    if (isReferencePrimaryOrUnique) {
        return createReference(null, tableReferences, ASSOCIATION_TYPE_BELONGS_TO, constraint);
    }
    return null;
}
// NOTICE: Use the foreign key and reference properties to determine the associations
//         and push them as references of the table.
function createAllReferences(databaseSchema, schemaGenerated) {
    const references = {};
    Object.keys(databaseSchema).forEach(tableName => {
        references[tableName] = [];
    });
    Object.keys(databaseSchema).forEach(tableName => {
        const table = databaseSchema[tableName];
        const { constraints, primaryKeys } = table;
        const { isJunction } = schemaGenerated[tableName].options;
        const foreignKeysWithExistingTable = constraints.filter(constraint => constraint.columnType === FOREIGN_KEY && databaseSchema[constraint.foreignTableName]);
        foreignKeysWithExistingTable.forEach(constraint => {
            const { columnName } = constraint;
            const uniqueIndexes = constraint.uniqueIndexes || null;
            const isPrimaryOrUnique = checkUnicity(primaryKeys, uniqueIndexes, columnName);
            const referenceTableName = constraint.foreignTableName;
            if (isJunction) {
                const manyToManyKeys = foreignKeysWithExistingTable.filter(otherKey => otherKey.columnName !== constraint.columnName);
                manyToManyKeys.forEach(manyToManyKey => {
                    references[referenceTableName].push(createReference(referenceTableName, references[referenceTableName], ASSOCIATION_TYPE_BELONGS_TO_MANY, constraint, manyToManyKey));
                });
            }
            else {
                references[referenceTableName].push(createReference(referenceTableName, references[referenceTableName], isPrimaryOrUnique ? ASSOCIATION_TYPE_HAS_ONE : ASSOCIATION_TYPE_HAS_MANY, constraint));
            }
            references[tableName].push(createBelongsToReference(databaseSchema[referenceTableName], references[tableName], constraint));
        });
    });
    // remove null references
    return Object.entries(references).reduce((accumulator, [tableName, tableReferences]) => {
        accumulator[tableName] = tableReferences.filter(Boolean);
        return accumulator;
    }, {});
}
function isOnlyJoinTableWithId(schema, constraints) {
    const idColumn = Object.keys(schema).find(columnName => columnName === 'id');
    if (!idColumn)
        return false;
    const possibleForeignColumnNames = Object.keys(schema).filter(columnName => !isTechnicalTimestamp(schema[columnName]) && columnName !== 'id');
    const columnWithoutForeignKey = possibleForeignColumnNames.find(columnName => !constraints.find(constraint => constraint.columnName === columnName && constraint.columnType === FOREIGN_KEY));
    return !columnWithoutForeignKey;
}
async function createTableSchema(columnTypeGetter, { schema, constraints, primaryKeys }, tableName) {
    const { assertPresent, lodash } = inject();
    assertPresent({ lodash });
    const fields = [];
    await P.each(Object.keys(schema), async (columnName) => {
        const columnInfo = schema[columnName];
        const type = await columnTypeGetter.perform(columnInfo, columnName, tableName);
        const foreignKey = constraints.find(constraint => constraint.columnName === columnName && constraint.columnType === FOREIGN_KEY);
        const isValidField = type &&
            (!foreignKey ||
                !foreignKey.foreignTableName ||
                !foreignKey.columnName ||
                columnInfo.primaryKey);
        // NOTICE: If the column is of integer type, named "id" and primary, Sequelize will handle it
        //         automatically without necessary declaration.
        const isIdIntegerPrimaryColumn = columnName === 'id' && ['INTEGER', 'BIGINT'].includes(type) && columnInfo.primaryKey;
        // NOTICE: But in some cases we want to force the id to be still generated.
        //         For example, Sequelize will not use a default id field on a model
        //         that has only foreign keys, so if the id primary key is present, we need to force it.
        const forceIdColumn = isIdIntegerPrimaryColumn && isOnlyJoinTableWithId(schema, constraints);
        if (isValidField && (!isIdIntegerPrimaryColumn || forceIdColumn)) {
            // NOTICE: sequelize considers column name with parenthesis as raw Attributes
            // do not try to camelCase the name for avoiding sequelize issues
            const hasParenthesis = columnName.includes('(') || columnName.includes(')');
            const name = hasParenthesis ? columnName : lodash.camelCase(columnName);
            let isRequired = !columnInfo.allowNull;
            if (isTechnicalTimestamp({ name, type })) {
                isRequired = false;
            }
            const field = {
                name,
                nameColumn: columnName,
                type,
                primaryKey: columnInfo.primaryKey,
                defaultValue: columnInfo.defaultValue,
                isRequired,
            };
            fields.push(field);
        }
    });
    const options = {
        underscored: isUnderscored(fields),
        timestamps: hasTimestamps(fields),
        hasIdColumn: hasIdColumn(fields, primaryKeys),
        hasPrimaryKeys: Boolean(primaryKeys?.length),
        isJunction: isJunctionTable(fields, constraints),
    };
    return {
        fields,
        primaryKeys,
        options,
    };
}
// NOTICE: This detects two generated fields (regular or reference's alias) with the same name
//         and rename reference's alias as `Linked${collectionReferenced}` to prevent Sequelize
//         from crashing at startup.
function fixAliasConflicts(wholeSchema) {
    const { assertPresent, lodash } = inject();
    assertPresent({ lodash });
    const tablesName = Object.keys(wholeSchema);
    if (!tablesName.length) {
        return;
    }
    tablesName.forEach(tableName => {
        const table = wholeSchema[tableName];
        if (table.references.length && table.fields.length) {
            const fieldNames = table.fields.map(field => field.name);
            table.references.forEach((reference, index) => {
                if (fieldNames.includes(reference.as)) {
                    table.references[index].as = `linked${lodash.upperFirst(reference.as)}`;
                }
            });
        }
    });
}
async function analyzeSequelizeTables(connection, config, allowWarning) {
    const { assertPresent, lodash } = inject();
    assertPresent({ lodash });
    // User provided a schema, check if it exists
    if (config.dbSchema) {
        const schemas = await connection.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?;', { type: connection.QueryTypes.SELECT, replacements: [config.dbSchema] });
        if (!schemas.length) {
            const message = 'This schema does not exists.';
            return inject().terminator.terminate(1, {
                errorCode: 'database_authentication_error',
                errorMessage: message,
                logs: [message],
            });
        }
    }
    // If dbSchema was not provided by user, get default one.
    const configWithSchema = {
        ...config,
        dbSchema: await getDefaultSchema(connection, config.dbSchema),
    };
    // Build the db schema.
    const schemaAllTables = {};
    const queryInterface = connection.getQueryInterface();
    const databaseSchema = {};
    const tableNames = await showAllTables(queryInterface, connection, configWithSchema.dbSchema);
    const constraintsGetter = new TableConstraintsGetter(connection, configWithSchema.dbSchema);
    await P.each(tableNames, async (tableName) => {
        const { schema, constraints, primaryKeys } = await analyzeTable(queryInterface, constraintsGetter, tableName, configWithSchema);
        databaseSchema[tableName] = {
            schema,
            constraints,
            primaryKeys,
            references: [],
        };
    });
    const columnTypeGetter = new ColumnTypeGetter(connection, configWithSchema.dbSchema, allowWarning);
    await P.each(tableNames, async (tableName) => {
        schemaAllTables[tableName] = await createTableSchema(columnTypeGetter, databaseSchema[tableName], tableName);
    });
    // NOTICE: Fill the references field for each table schema
    const referencesPerTable = createAllReferences(databaseSchema, schemaAllTables);
    Object.keys(referencesPerTable).forEach(tableName => {
        schemaAllTables[tableName].references = lodash.sortBy(referencesPerTable[tableName], 'association');
        // NOTE: When a table contains no field, it will be considered camelCased
        //       by default, so we need to check its references to ensure whether
        //       it is camelCased or not.
        if (!schemaAllTables[tableName].fields.length) {
            schemaAllTables[tableName].options.underscored = isUnderscored(schemaAllTables[tableName].references.map(({ foreignKey }) => ({ nameColumn: foreignKey })));
        }
    });
    if (Object.keys(schemaAllTables).length === 0) {
        throw new EmptyDatabaseError('no tables found', {
            orm: 'sequelize',
            dialect: connection.getDialect(),
        });
    }
    fixAliasConflicts(schemaAllTables);
    return schemaAllTables;
}
module.exports = analyzeSequelizeTables;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLXRhYmxlcy1hbmFseXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zY2hlbWEvdXBkYXRlL2FuYWx5emVyL3NlcXVlbGl6ZS10YWJsZXMtYW5hbHl6ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ25ELE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM5QixNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNsRCxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO0FBQ25FLE1BQU0sc0JBQXNCLEdBQUcsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDcEUsTUFBTSxzQkFBc0IsR0FBRyxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQztBQUMvRSxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBQ3ZGLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUU5RCxNQUFNLDJCQUEyQixHQUFHLFdBQVcsQ0FBQztBQUNoRCxNQUFNLGdDQUFnQyxHQUFHLGVBQWUsQ0FBQztBQUN6RCxNQUFNLHlCQUF5QixHQUFHLFNBQVMsQ0FBQztBQUM1QyxNQUFNLHdCQUF3QixHQUFHLFFBQVEsQ0FBQztBQUUxQyxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFFbEMsK0NBQStDO0FBQy9DLEtBQUssVUFBVSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCO0lBQzVELElBQUksa0JBQWtCLEVBQUU7UUFDdEIsT0FBTyxrQkFBa0IsQ0FBQztLQUMzQjtJQUVELE1BQU0sT0FBTyxH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