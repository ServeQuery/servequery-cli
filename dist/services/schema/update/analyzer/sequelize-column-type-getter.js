const chalk = require('chalk');
const Context = require('@servequery/context');
const DIALECT_MYSQL = 'mysql';
const DIALECT_POSTGRES = 'postgres';
const typeMatch = (type, value) => (type.match(value) || {}).input;
const typeStartsWith = (type, value) => typeMatch(type, new RegExp(`^${value}.*`, 'i'));
const typeContains = (type, value) => typeMatch(type, new RegExp(`${value}.*`, 'i'));
function ColumnTypeGetter(databaseConnection, schema, allowWarning = true) {
    const queryInterface = databaseConnection.getQueryInterface();
    function isDialect(dialect) {
        return queryInterface.sequelize.options.dialect === dialect;
    }
    function isColumnTypeEnum(columnName) {
        const type = queryInterface.sequelize.QueryTypes.SELECT;
        const query = `
      SELECT i.udt_name
      FROM pg_catalog.pg_type t
      JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
      JOIN pg_catalog.pg_enum e ON t.oid = e.enumtypid
      LEFT JOIN INFORMATION_SCHEMA.columns i ON t.typname = i.udt_name
      WHERE i.column_name = :columnName OR t.typname = :columnName
      GROUP BY i.udt_name;
    `;
        const replacements = { columnName };
        return queryInterface.sequelize
            .query(query, { replacements, type })
            .then(result => !!result.length);
    }
    function getTypeOfArrayForPostgres(table, columnName) {
        const type = queryInterface.sequelize.QueryTypes.SELECT;
        const query = `
      SELECT e.udt_name as "udtName",
        (CASE WHEN e.udt_name = 'hstore'
            THEN e.udt_name ELSE e.data_type END)
          || (CASE WHEN e.character_maximum_length IS NOT NULL
            THEN '(' || e.character_maximum_length || ')' ELSE '' END) as "type",
        (SELECT array_agg(en.enumlabel) FROM pg_catalog.pg_type t
          JOIN pg_catalog.pg_enum en
          ON t.oid = en.enumtypid
          WHERE t.typname = e.udt_name) AS "special"
      FROM INFORMATION_SCHEMA.columns c
      LEFT JOIN INFORMATION_SCHEMA.element_types e
      ON ((c.table_catalog, c.table_schema, c.table_name, 'TABLE', c.dtd_identifier) = (e.object_catalog, e.object_schema, e.object_name, e.object_type, e.collection_type_identifier))
      WHERE table_schema = :schema
        AND table_name = :table AND c.column_name = :columnName
    `;
        const replacements = { schema, table, columnName };
        return queryInterface.sequelize
            .query(query, { replacements, type })
            .then(result => result[0])
            .then(info => ({
            ...info,
            special: info.special ? info.special.slice(1, -1).split(',') : [],
        }));
    }
    async function getTypeForUserDefined(columnName, columnInfo) {
        const { special } = columnInfo;
        if (isDialect(DIALECT_POSTGRES) && (await isColumnTypeEnum(columnName))) {
            return `ENUM(\n        '${special.join("',\n        '")}',\n      )`;
        }
        return 'STRING';
    }
    this.getTypeForArray = async (tableName, columnName) => {
        if (!isDialect(DIALECT_POSTGRES)) {
            return null;
        }
        const innerColumnInfo = await getTypeOfArrayForPostgres(tableName, columnName);
        return `ARRAY(DataTypes.${await this.perform(innerColumnInfo, innerColumnInfo.udtName, tableName)})`;
    };
    this.perform = async (columnInfo, columnName, tableName) => {
        const { logger } = Context.inject();
        const { type } = columnInfo;
        switch (type) {
            case 'JSON':
                return 'JSON';
            case type === 'BIT(1)' && isDialect(DIALECT_MYSQL) && 'BIT(1)': // NOTICE: MySQL boolean type.
            case 'BIT': // NOTICE: MSSQL type.
            case 'BOOLEAN':
                return 'BOOLEAN';
            case 'CHARACTER VARYING':
            case 'TEXT':
            case 'NTEXT': // MSSQL type
            case typeContains(type, 'TEXT'):
            case typeContains(type, 'VARCHAR'):
            case typeContains(type, 'CHAR'):
            case 'NVARCHAR': // NOTICE: MSSQL type.
                return 'STRING';
            case 'USER-DEFINED':
                return getTypeForUserDefined(columnName, columnInfo);
            case typeMatch(type, /ENUM\((.*)\)/i):
                return type;
            case 'UNIQUEIDENTIFIER':
            case 'UUID':
                return 'UUID';
            case 'JSONB':
                return 'JSONB';
            case 'INTEGER':
            case 'SERIAL':
            case 'BIGSERIAL':
            case typeStartsWith(type, 'INT'):
            case typeStartsWith(type, 'SMALLINT'):
            case typeStartsWith(type, 'TINYINT'):
            case typeStartsWith(type, 'MEDIUMINT'):
                return 'INTEGER';
            case typeStartsWith(type, 'BIGINT'):
                return 'BIGINT';
            case typeContains(type, 'FLOAT'):
                return 'FLOAT';
            case 'NUMERIC':
            case 'DECIMAL':
            case 'REAL':
            case 'DOUBLE':
            case 'DOUBLE PRECISION':
            case typeContains(type, 'DECIMAL'):
                return 'DOUBLE';
            case 'DATE':
                return 'DATEONLY';
            case 'DATETIME':
            case typeStartsWith(type, 'TIMESTAMP'):
                return 'DATE';
            case 'TIME':
            case 'TIME WITHOUT TIME ZONE':
                return 'TIME';
            case 'ARRAY':
                return this.getTypeForArray(tableName, columnName);
            case 'INET':
                return 'INET';
            default:
                if (allowWarning) {
                    logger.warn(`Type ${chalk.bold(type)} is not handled: The column ${chalk.bold(columnName)} won't be generated by Servequery CLI. If you need it please create it manually.`);
                }
                return null;
        }
    };
}
module.exports = ColumnTypeGetter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLWNvbHVtbi10eXBlLWdldHRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9zY2hlbWEvdXBkYXRlL2FuYWx5emVyL3NlcXVlbGl6ZS1jb2x1bW4tdHlwZS1nZXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQy9CLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQztBQUM5QixNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQztBQUVwQyxNQUFNLFNBQVMsR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDbkUsTUFBTSxjQUFjLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUN4RixNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxNQUFNLENBQUMsR0FBRyxLQUFLLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBRXJGLFNBQVMsZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLFlBQVksR0FBRyxJQUFJO0lBQ3ZFLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFOUQsU0FBUyxTQUFTLENBQUMsT0FBTztRQUN4QixPQUFPLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUM7SUFDOUQsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsVUFBVTtRQUNsQyxNQUFNLElBQUksR0FBRyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDeEQsTUFBTSxLQUFLLEdBQUc7Ozs7Ozs7O0tBUWIsQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLEVBQUUsVUFBVSxFQUFFLENBQUM7UUFFcEMsT0FBTyxjQUFjLENBQUMsU0FBUzthQUM1QixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxDQUFDO2FBQ3BDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFNBQVMseUJBQXlCLENBQUMsS0FBSyxFQUFFLFVBQVU7UUFDbEQsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQ3hELE1BQU0sS0FBSyxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7S0FlYixDQUFDO1FBQ0YsTUFBTSxZQUFZLEdBQUcsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDO1FBRW5ELE9BQU8sY0FBYyxDQUFDLFNBQVM7YUFDNUIsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsQ0FBQzthQUNwQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNiLEdBQUcsSUFBSTtZQUNQLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDbEUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBRUQsS0FBSyxVQUFVLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVO1FBQ3pELE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDL0IsSUFBSSxTQUFTLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRTtZQUN2RSxPQUFPLG1CQUFtQixPQUFPLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUM7U0FDdEU7UUFDRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxFQUFFO1FBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtZQUNoQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsTUFBTSxlQUFlLEdBQUcsTUFBTSx5QkFBeUIsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDL0UsT0FBTyxtQkFBbUIsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUMxQyxlQUFlLEVBQ2YsZUFBZSxDQUFDLE9BQU8sRUFDdkIsU0FBUyxDQUNWLEdBQUcsQ0FBQztJQUNQLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUU7UUFDekQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNwQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsVUFBVSxDQUFDO1FBRTVCLFFBQVEsSUFBSSxFQUFFO1lBQ1osS0FBSyxNQUFNO2dCQUNULE9BQU8sTUFBTSxDQUFDO1lBQ2hCLEtBQUssSUFBSSxLQUFLLFFBQVEsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsOEJBQThCO1lBQzlGLEtBQUssS0FBSyxDQUFDLENBQUMsc0JBQXNCO1lBQ2xDLEtBQUssU0FBUztnQkFDWixPQUFPLFNBQVMsQ0FBQztZQUNuQixLQUFLLG1CQUFtQixDQUFDO1lBQ3pCLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxPQUFPLENBQUMsQ0FBQyxhQUFhO1lBQzNCLEtBQUssWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNoQyxLQUFLLFlBQVksQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDbkMsS0FBSyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ2hDLEtBQUssVUFBVSxFQUFFLHNCQUFzQjtnQkFDckMsT0FBTyxRQUFRLENBQUM7WUFDbEIsS0FBSyxjQUFjO2dCQUNqQixPQUFPLHFCQUFxQixDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN2RCxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDO2dCQUNuQyxPQUFPLElBQUksQ0FBQztZQUNkLEtBQUssa0JBQWtCLENBQUM7WUFDeEIsS0FBSyxNQUFNO2dCQUNULE9BQU8sTUFBTSxDQUFDO1lBQ2hCLEtBQUssT0FBTztnQkFDVixPQUFPLE9BQU8sQ0FBQztZQUNqQixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2pDLEtBQUssY0FBYyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN0QyxLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDckMsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQztnQkFDcEMsT0FBTyxTQUFTLENBQUM7WUFDbkIsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQztnQkFDakMsT0FBTyxRQUFRLENBQUM7WUFDbEIsS0FBSyxZQUFZLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQztnQkFDOUIsT0FBTyxPQUFPLENBQUM7WUFDakIsS0FBSyxTQUFTLENBQUM7WUFDZixLQUFLLFNBQVMsQ0FBQztZQUNmLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLGtCQUFrQixDQUFDO1lBQ3hCLEtBQUssWUFBWSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUM7Z0JBQ2hDLE9BQU8sUUFBUSxDQUFDO1lBQ2xCLEtBQUssTUFBTTtnQkFDVCxPQUFPLFVBQVUsQ0FBQztZQUNwQixLQUFLLFVBQVUsQ0FBQztZQUNoQixLQUFLLGNBQWMsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDO2dCQUNwQyxPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssd0JBQXdCO2dCQUMzQixPQUFPLE1BQU0sQ0FBQztZQUNoQixLQUFLLE9BQU87Z0JBQ1YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUNyRCxLQUFLLE1BQU07Z0JBQ1QsT0FBTyxNQUFNLENBQUM7WUFDaEI7Z0JBQ0UsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQ1QsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQywrQkFBK0IsS0FBSyxDQUFDLElBQUksQ0FDL0QsVUFBVSxDQUNYLDhFQUE4RSxDQUNoRixDQUFDO2lCQUNIO2dCQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2Y7SUFDSCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyJ9