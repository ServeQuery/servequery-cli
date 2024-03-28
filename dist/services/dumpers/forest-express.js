const { URL } = require('url');
const { plural, singular } = require('pluralize');
const IncompatibleLianaForUpdateError = require('../../errors/dumper/incompatible-liana-for-update-error');
const InvalidServequeryCLIProjectStructureError = require('../../errors/dumper/invalid-servequery-cli-project-structure-error');
const AbstractDumper = require('./abstract-dumper').default;
class ServequeryExpress extends AbstractDumper {
    constructor(context) {
        super(context);
        this.templateFolder = 'servequery-express';
        const { assertPresent, env, Sequelize, Handlebars, mkdirp, isLinuxOs, buildDatabaseUrl, isDatabaseLocal, toValidPackageName, strings, lodash, } = context;
        assertPresent({
            env,
            Sequelize,
            Handlebars,
            mkdirp,
            isLinuxOs,
            buildDatabaseUrl,
            isDatabaseLocal,
            toValidPackageName,
            strings,
            lodash,
        });
        this.DEFAULT_PORT = 3310;
        this.env = env;
        this.isLinuxOs = isLinuxOs;
        this.Sequelize = Sequelize;
        this.Handlebars = Handlebars;
        this.mkdirp = mkdirp;
        this.lodash = lodash;
        this.buildDatabaseUrl = buildDatabaseUrl;
        this.isDatabaseLocal = isDatabaseLocal;
        this.toValidPackageName = toValidPackageName;
        this.strings = strings;
    }
    static getModelsNameSorted(schema) {
        return Object.keys(schema).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    }
    getSafeReferences(references) {
        return references.map(reference => ({
            ...reference,
            ref: this.getModelNameFromTableName(reference.ref),
        }));
    }
    // HACK: If a table name is "sessions" or "stats" the generated routes will conflict with
    //       Serve Query internal route (session or stats creation).
    static shouldSkipRouteGenerationForModel(modelName) {
        return ['sessions', 'stats'].includes(modelName.toLowerCase());
    }
    writePackageJson(dbDialect, appName) {
        const orm = dbDialect === 'mongodb' ? 'mongoose' : 'sequelize';
        const dependencies = {
            'body-parser': '1.19.0',
            chalk: '~1.1.3',
            'cookie-parser': '1.4.4',
            cors: '2.8.5',
            debug: '~4.0.1',
            dotenv: '~6.1.0',
            express: '~4.17.1',
            'express-jwt': '6.1.2',
            [`servequery-express-${orm}`]: '^9.0.0',
            morgan: '1.9.1',
            'require-all': '^3.0.0',
            sequelize: '~6.29.0',
        };
        if (dbDialect) {
            if (dbDialect.includes('postgres')) {
                dependencies.pg = '~8.2.2';
            }
            else if (dbDialect === 'mysql') {
                dependencies.mysql2 = '~2.2.5';
            }
            else if (dbDialect === 'mssql') {
                dependencies.tedious = '^15.1.3';
            }
            else if (dbDialect === 'mongodb') {
                delete dependencies.sequelize;
                dependencies.mongoose = '~5.13.9';
            }
        }
        const pkg = {
            name: this.toValidPackageName(appName),
            version: '0.0.1',
            private: true,
            scripts: { start: 'node ./server.js' },
            dependencies,
        };
        this.writeFile('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
    }
    tableToFilename(table) {
        return this.lodash.kebabCase(table);
    }
    static isLocalUrl(url) {
        return /^http:\/\/(?:localhost|127\.0\.0\.1)$/.test(url);
    }
    getApplicationUrl(appHostname, appPort) {
        const hostUrl = /^https?:\/\//.test(appHostname) ? appHostname : `http://${appHostname}`;
        return ServequeryExpress.isLocalUrl(hostUrl)
            ? `${hostUrl}:${appPort || this.DEFAULT_PORT}`
            : hostUrl;
    }
    writeDotEnv(config) {
        const port = config.appConfig.appPort || this.DEFAULT_PORT;
        const databaseUrl = this.buildDatabaseUrl(config.dbConfig);
        const context = {
            databaseUrl,
            ssl: config.dbConfig.dbSsl || 'false',
            dbSchema: config.dbConfig.dbSchema,
            hostname: config.appConfig.appHostname,
            port,
            servequeryEnvSecret: config.servequeryEnvSecret,
            servequeryAuthSecret: config.servequeryAuthSecret,
            hasDockerDatabaseUrl: false,
            applicationUrl: this.getApplicationUrl(config.appConfig.appHostname, port),
        };
        if (!this.isLinuxOs) {
            context.dockerDatabaseUrl = databaseUrl.replace('localhost', 'host.docker.internal');
            context.hasDockerDatabaseUrl = true;
        }
        this.copyHandleBarsTemplate('env.hbs', '.env', context);
    }
    getModelNameFromTableName(table) {
        return this.strings.transformToCamelCaseSafeString(table);
    }
    writeModel(config, table, fields, references, options = {}) {
        const { underscored } = options;
        let modelPath = `models/${this.tableToFilename(table)}.js`;
        if (config.appConfig.useMultiDatabase) {
            modelPath = `models/${config.appConfig.modelsExportPath}/${this.tableToFilename(table)}.js`;
        }
        const fieldsDefinition = fields.map(field => {
            const expectedConventionalColumnName = underscored
                ? this.lodash.snakeCase(field.name)
                : field.name;
            // NOTICE: sequelize considers column name with parenthesis as raw Attributes
            // only set as unconventional name if underscored is true for adding special field attribute
            // and avoid sequelize issues
            const hasParenthesis = field.nameColumn && (field.nameColumn.includes('(') || field.nameColumn.includes(')'));
            const nameColumnUnconventional = field.nameColumn !== expectedConventionalColumnName ||
                (underscored && (/[1-9]/g.test(field.name) || hasParenthesis));
            return {
                ...field,
                ref: field.ref && this.getModelNameFromTableName(field.ref),
                nameColumnUnconventional,
                hasParenthesis,
                // Only output default value when non-null
                hasSafeDefaultValue: !this.lodash.isNil(field.defaultValue),
                safeDefaultValue: field.defaultValue instanceof this.Sequelize.Utils.Literal
                    ? `Sequelize.literal('${field.defaultValue.val.replace(/'/g, "\\'")}')`
                    : JSON.stringify(field.defaultValue),
            };
        });
        const referencesDefinition = references.map(reference => ({
            ...reference,
            isBelongsToMany: reference.association === 'belongsToMany',
            targetKey: this.lodash.camelCase(reference.targetKey),
            sourceKey: this.lodash.camelCase(reference.sourceKey),
        }));
        this.copyHandleBarsTemplate(`models/${config.dbConfig.dbDialect === 'mongodb' ? 'mongo' : 'sequelize'}-model.hbs`, modelPath, {
            modelName: this.getModelNameFromTableName(table),
            modelVariableName: this.strings.pascalCase(this.strings.transformToSafeString(table)),
            table,
            fields: fieldsDefinition,
            references: referencesDefinition,
            ...options,
            schema: config.dbConfig.dbSchema,
            dialect: config.dbConfig.dbDialect,
            noId: !options.hasIdColumn && !options.hasPrimaryKeys,
        });
    }
    writeRoute(dbDialect, modelName) {
        const routesPath = `routes/${this.tableToFilename(modelName)}.js`;
        const modelNameDasherized = this.lodash.kebabCase(modelName);
        const readableModelName = this.lodash.startCase(modelName);
        this.copyHandleBarsTemplate('routes/route.hbs', routesPath, {
            modelName: this.getModelNameFromTableName(modelName),
            modelNameDasherized,
            modelNameReadablePlural: plural(readableModelName),
            modelNameReadableSingular: singular(readableModelName),
            isMongoDB: dbDialect === 'mongodb',
        });
    }
    writeServequeryCollection(dbDialect, table) {
        const collectionPath = `servequery/${this.tableToFilename(table)}.js`;
        this.copyHandleBarsTemplate('servequery/collection.hbs', collectionPath, {
            isMongoDB: dbDialect === 'mongodb',
            table: this.getModelNameFromTableName(table),
        });
    }
    writeAppJs(dbDialect) {
        this.copyHandleBarsTemplate('app.hbs', 'app.js', {
            isMongoDB: dbDialect === 'mongodb',
            servequeryUrl: this.env.SERVEQUERY_SERVER_URL,
        });
    }
    writeModelsIndex(dbDialect) {
        this.copyHandleBarsTemplate('models/index.hbs', 'models/index.js', {
            isMongoDB: dbDialect === 'mongodb',
        });
    }
    writeDatabasesConfig(dbDialect) {
        this.copyHandleBarsTemplate('config/databases.hbs', 'config/databases.js', {
            isMongoDB: dbDialect === 'mongodb',
            isMSSQL: dbDialect === 'mssql',
            isMySQL: dbDialect === 'mysql',
        });
    }
    writeDockerfile() {
        this.copyHandleBarsTemplate('Dockerfile.hbs', 'Dockerfile');
    }
    writeDockerCompose(config) {
        const databaseUrl = `\${${this.isLinuxOs ? 'DATABASE_URL' : 'DOCKER_DATABASE_URL'}}`;
        const servequeryUrl = this.env.SERVEQUERY_URL_IS_DEFAULT
            ? false
            : `\${SERVEQUERY_URL-${this.env.SERVEQUERY_SERVER_URL}}`;
        let servequeryExtraHost = false;
        if (servequeryUrl) {
            try {
                const parsedServequeryUrl = new URL(this.env.SERVEQUERY_SERVER_URL);
                servequeryExtraHost = parsedServequeryUrl.hostname;
            }
            catch (error) {
                throw new Error(`Invalid value for SERVEQUERY_SERVER_URL: "${this.env.SERVEQUERY_SERVER_URL}"`);
            }
        }
        this.copyHandleBarsTemplate('docker-compose.hbs', 'docker-compose.yml', {
            containerName: this.lodash.snakeCase(config.appConfig.appName),
            databaseUrl,
            dbSchema: config.dbConfig.dbSchema,
            servequeryExtraHost,
            servequeryUrl,
            network: this.isLinuxOs && this.isDatabaseLocal(config.dbConfig) ? 'host' : null,
        });
    }
    writeServequeryMiddleware(dbDialect) {
        this.copyHandleBarsTemplate('middlewares/servequery.hbs', 'middlewares/servequery.js', {
            isMongoDB: dbDialect === 'mongodb',
        });
    }
    // NOTICE: Generate files in alphabetical order to ensure a nice generation console logs display.
    async createFiles(config, schema) {
        const { isUpdate, useMultiDatabase, modelsExportPath } = config.appConfig;
        await this.mkdirp(`${this.projectPath}/routes`);
        await this.mkdirp(`${this.projectPath}/servequery`);
        await this.mkdirp(`${this.projectPath}/models`);
        if (useMultiDatabase) {
            await this.mkdirp(`${this.projectPath}/models/${modelsExportPath}`);
        }
        if (!isUpdate) {
            await this.mkdirp(`${this.projectPath}/config`);
            await this.mkdirp(`${this.projectPath}/public`);
            await this.mkdirp(`${this.projectPath}/views`);
            await this.mkdirp(`${this.projectPath}/middlewares`);
        }
        const modelNames = ServequeryExpress.getModelsNameSorted(schema);
        if (!isUpdate)
            this.writeDatabasesConfig(config.dbConfig.dbDialect);
        modelNames.forEach(modelName => this.writeServequeryCollection(config.dbConfig.dbDialect, modelName));
        if (!isUpdate) {
            this.writeServequeryMiddleware(config.dbConfig.dbDialect);
            this.copyHandleBarsTemplate('middlewares/welcome.hbs', 'middlewares/welcome.js');
            this.writeModelsIndex(config.dbConfig.dbDialect);
        }
        modelNames.forEach(modelName => {
            const { fields, references, options } = schema[modelName];
            const safeReferences = this.getSafeReferences(references);
            this.writeModel(config, modelName, fields, safeReferences, options);
        });
        if (!isUpdate)
            this.copyHandleBarsTemplate('public/favicon.png', 'public/favicon.png');
        modelNames.forEach(modelName => {
            // HACK: If a table name is "sessions" or "stats" the generated routes will conflict with
            //       Serve Query internal route (session or stats creation).
            //       As a workaround, we don't generate the route file.
            // TODO: Remove the if condition, once the routes paths refactored to prevent such conflict.
            if (!ServequeryExpress.shouldSkipRouteGenerationForModel(modelName)) {
                this.writeRoute(config.dbConfig.dbDialect, modelName);
            }
        });
        if (!isUpdate) {
            this.copyHandleBarsTemplate('views/index.hbs', 'views/index.html');
            this.copyHandleBarsTemplate('dockerignore.hbs', '.dockerignore');
            this.writeDotEnv(config);
            this.copyHandleBarsTemplate('gitignore.hbs', '.gitignore');
            this.writeAppJs(config.dbConfig.dbDialect);
            this.writeDockerCompose(config);
            this.writeDockerfile();
            this.writePackageJson(config.dbConfig.dbDialect, config.appConfig.appName);
            this.copyHandleBarsTemplate('server.hbs', 'server.js');
        }
    }
    checkServequeryCLIProjectStructure() {
        try {
            if (!this.fs.existsSync('routes'))
                throw new Error('No "routes" directory.');
            if (!this.fs.existsSync('servequery'))
                throw new Error('No "servequery" directory.');
            if (!this.fs.existsSync('models'))
                throw new Error('No "models“ directory.');
        }
        catch (error) {
            throw new InvalidServequeryCLIProjectStructureError(this.projectPath, error);
        }
    }
    checkLianaCompatiblityForUpdate() {
        const packagePath = 'package.json';
        if (!this.fs.existsSync(packagePath))
            throw new IncompatibleLianaForUpdateError(`"${packagePath}" not found in current directory.`);
        const file = this.fs.readFileSync(packagePath, 'utf8');
        const match = /servequery-express-\D*((\d+).\d+.\d+)/g.exec(file);
        let lianaMajorVersion = 0;
        if (match) {
            [, , lianaMajorVersion] = match;
        }
        if (Number(lianaMajorVersion) < 7) {
            throw new IncompatibleLianaForUpdateError('Your project is not compatible with the `servequery schema:update` command. You need to use an agent version greater than 7.0.0.');
        }
    }
    hasMultipleDatabaseStructure() {
        const files = this.fs.readdirSync('models', { withFileTypes: true });
        return !files.some(file => file.isFile() && file.name !== 'index.js');
    }
}
module.exports = ServequeryExpress;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0LWV4cHJlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvZHVtcGVycy9mb3Jlc3QtZXhwcmVzcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELE1BQU0sK0JBQStCLEdBQUcsT0FBTyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7QUFDM0csTUFBTSxxQ0FBcUMsR0FBRyxPQUFPLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztBQUN4SCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFNUQsTUFBTSxhQUFjLFNBQVEsY0FBYztJQUd4QyxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBSGpCLG1CQUFjLEdBQUcsZ0JBQWdCLENBQUM7UUFLaEMsTUFBTSxFQUNKLGFBQWEsRUFDYixHQUFHLEVBQ0gsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sU0FBUyxFQUNULGdCQUFnQixFQUNoQixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLE9BQU8sRUFDUCxNQUFNLEdBQ1AsR0FBRyxPQUFPLENBQUM7UUFFWixhQUFhLENBQUM7WUFDWixHQUFHO1lBQ0gsU0FBUztZQUNULFVBQVU7WUFDVixNQUFNO1lBQ04sU0FBUztZQUNULGdCQUFnQjtZQUNoQixlQUFlO1lBQ2Ysa0JBQWtCO1lBQ2xCLE9BQU87WUFDUCxNQUFNO1NBQ1AsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFH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