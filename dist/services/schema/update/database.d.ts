export = Database;
declare class Database {
    constructor({ assertPresent, mongodb, Sequelize, terminator }: {
        assertPresent: any;
        mongodb: any;
        Sequelize: any;
        terminator: any;
    });
    mongodb: any;
    Sequelize: any;
    terminator: any;
    handleAuthenticationError(error: any): Promise<any>;
    sequelizeAuthenticate(connection: any): any;
    getDialect(dbConnectionUrl: any, dbDialect: any): any;
    connectToMongodb(options: any, isSSL: any): any;
    connectToSequelize(databaseDialect: any, options: any, isSSL: any): any;
    connect(options: any): Promise<any>;
    connectFromDatabasesConfig(databasesConfig: any): Promise<any[]>;
    disconnectFromDatabases(databaseConnections: any): Promise<any[]>;
    disconnect(connection: any): Promise<any>;
    areAllDatabasesOfTheSameType(databasesConfig: any): boolean;
}
//# sourceMappingURL=database.d.ts.map