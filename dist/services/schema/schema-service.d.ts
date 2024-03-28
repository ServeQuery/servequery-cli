export = SchemaService;
declare class SchemaService {
    constructor({ assertPresent, constants, database, databaseAnalyzer, servequeryExpressDumper, env, errorHandler, fs, logger, path, spinner, }: {
        assertPresent: any;
        constants: any;
        database: any;
        databaseAnalyzer: any;
        servequeryExpressDumper: any;
        env: any;
        errorHandler: any;
        fs: any;
        logger: any;
        path: any;
        spinner: any;
    });
    constants: any;
    database: any;
    databaseAnalyzer: any;
    dumper: any;
    env: any;
    errorHandler: any;
    fs: any;
    logger: any;
    path: any;
    spinner: any;
    _assertOutputDirectory(outputDirectory: any): void;
    _getDatabasesConfig(path: any): any;
    _connectToDatabases(databasesConfig: any): Promise<any>;
    _disconnectFromDatabases(databaseConnections: any): Promise<any>;
    _analyzeDatabases(databasesConnection: any, dbSchema: any): Promise<any>;
    _dumpSchemas(databasesSchema: any, appName: any, isUpdate: any, useMultiDatabase: any): Promise<any>;
    _warnIfSingleToMulti(outputDirectory: any, useMultiDatabase: any): void;
    _update({ isUpdate, outputDirectory, dbSchema, dbConfigPath }: {
        isUpdate: any;
        outputDirectory: any;
        dbSchema: any;
        dbConfigPath: any;
    }): Promise<void>;
    update(options: any): Promise<void>;
}
//# sourceMappingURL=schema-service.d.ts.map