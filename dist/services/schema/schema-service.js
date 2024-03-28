const ServequeryCLIError = require('../../errors/servequery-cli-error');
module.exports = class SchemaService {
    constructor({ assertPresent, constants, database, databaseAnalyzer, servequeryExpressDumper, env, errorHandler, fs, logger, path, spinner, }) {
        assertPresent({
            constants,
            database,
            databaseAnalyzer,
            servequeryExpressDumper,
            env,
            errorHandler,
            fs,
            logger,
            path,
            spinner,
        });
        this.constants = constants;
        this.database = database;
        this.databaseAnalyzer = databaseAnalyzer;
        this.dumper = servequeryExpressDumper;
        this.env = env;
        this.errorHandler = errorHandler;
        this.fs = fs;
        this.logger = logger;
        this.path = path;
        this.spinner = spinner;
    }
    _assertOutputDirectory(outputDirectory) {
        if (!outputDirectory) {
            this.dumper.checkServequeryCLIProjectStructure();
        }
        else if (this.fs.existsSync(outputDirectory)) {
            throw new ServequeryCLIError(`The output directory "${outputDirectory}" already exists.`);
        }
    }
    _getDatabasesConfig(path) {
        const configPath = this.path.resolve(this.constants.CURRENT_WORKING_DIRECTORY, path);
        if (!this.fs.existsSync(configPath)) {
            throw new ServequeryCLIError(`The configuration file "${configPath}" does not exist.`);
        }
        // eslint-disable-next-line global-require, import/no-dynamic-require
        const databasesConfig = require(configPath);
        if (!this.database.areAllDatabasesOfTheSameType(databasesConfig)) {
            throw new ServequeryCLIError(`The "${configPath}" file contains different databases types.`);
        }
        return databasesConfig;
    }
    async _connectToDatabases(databasesConfig) {
        this.spinner.start({ text: 'Connecting to your database(s)' });
        const databasesConnectionPromise = this.database.connectFromDatabasesConfig(databasesConfig);
        return this.spinner.attachToPromise(databasesConnectionPromise);
    }
    async _disconnectFromDatabases(databaseConnections) {
        this.spinner.start({ text: 'Disconnecting from your database(s)' });
        const databasesConnectionPromise = this.database.disconnectFromDatabases(databaseConnections);
        return this.spinner.attachToPromise(databasesConnectionPromise);
    }
    async _analyzeDatabases(databasesConnection, dbSchema) {
        this.spinner.start({ text: 'Analyzing the database(s)' });
        const databasesSchemaPromise = Promise.all(databasesConnection.map(async (databaseConnection) => {
            const analyzerOptions = {
                dbDialect: this.database.getDialect(databaseConnection.connection.url),
                dbSchema,
            };
            const schema = await this.databaseAnalyzer.analyze(databaseConnection.connectionInstance, analyzerOptions, true);
            return {
                ...databaseConnection,
                schema,
                analyzerOptions,
            };
        }));
        return this.spinner.attachToPromise(databasesSchemaPromise);
    }
    async _dumpSchemas(databasesSchema, appName, isUpdate, useMultiDatabase) {
        this.spinner.start({ text: 'Generating your files' });
        const dumpPromise = Promise.all(databasesSchema.map(databaseSchema => this.dumper.dump({
            appConfig: {
                appName,
                isUpdate,
                useMultiDatabase,
                modelsExportPath: this.path.relative('models', databaseSchema.modelsDir),
            },
            dbConfig: {
                dbDialect: databaseSchema.analyzerOptions.dbDialect,
                dbSchema: databaseSchema.analyzerOptions.dbSchema,
            },
        }, databaseSchema.schema)));
        return this.spinner.attachToPromise(dumpPromise);
    }
    _warnIfSingleToMulti(outputDirectory, useMultiDatabase) {
        const fromSingleToMultipleDatabases = !outputDirectory && useMultiDatabase && !this.dumper.hasMultipleDatabaseStructure();
        if (fromSingleToMultipleDatabases) {
            this.logger.warn('It looks like you are switching from a single to a multiple databases.');
            this.logger.log('You will need to move the models files from your existing database to' +
                ' the dedicated folder, or simply remove them.');
        }
    }
    async _update({ isUpdate, outputDirectory, dbSchema, dbConfigPath }) {
        this.dumper.checkLianaCompatiblityForUpdate();
        this._assertOutputDirectory(outputDirectory);
        const databasesConfig = this._getDatabasesConfig(dbConfigPath);
        const databasesConnection = await this._connectToDatabases(databasesConfig);
        const databasesSchema = await this._analyzeDatabases(databasesConnection, dbSchema);
        await this._disconnectFromDatabases(databasesConnection);
        const useMultiDatabase = databasesSchema.length > 1;
        await this._dumpSchemas(databasesSchema, outputDirectory, isUpdate, useMultiDatabase);
        this._warnIfSingleToMulti(outputDirectory, useMultiDatabase);
    }
    async update(options) {
        try {
            await this._update(options);
        }
        catch (error) {
            await this.errorHandler.handle(error);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3NjaGVtYS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxhQUFhO0lBQ2xDLFlBQVksRUFDVixhQUFhLEVBQ2IsU0FBUyxFQUNULFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsbUJBQW1CLEVBQ25CLEdBQUcsRUFDSCxZQUFZLEVBQ1osRUFBRSxFQUNGLE1BQU0sRUFDTixJQUFJLEVBQ0osT0FBTyxHQUNSO1FBQ0MsYUFBYSxDQUFDO1lBQ1osU0FBUztZQUNULFFBQVE7WUFDUixnQkFBZ0I7WUFDaEIsbUJBQW1CO1lBQ25CLEdBQUc7WUFDSCxZQUFZO1lBQ1osRUFBRTtZQUNGLE1BQU07WUFDTixJQUFJO1lBQ0osT0FBTztTQUNSLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO1FBQ2xDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRUQsc0JBQXNCLENBQUMsZUFBZTtRQUNwQyxJQUFJLENB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