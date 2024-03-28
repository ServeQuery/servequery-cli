export = DatabaseAnalyzer;
declare class DatabaseAnalyzer {
    constructor({ assertPresent, mongoAnalyzer, sequelizeAnalyzer, terminator }: {
        assertPresent: any;
        mongoAnalyzer: any;
        sequelizeAnalyzer: any;
        terminator: any;
    });
    mongoAnalyzer: any;
    sequelizeAnalyzer: any;
    terminator: any;
    reportEmptyDatabase(orm: any, dialect: any): Promise<any>;
    _analyze(analyze: any, databaseConnection: any, config: any, allowWarning: any): Promise<any>;
    analyzeMongoDb(databaseConnection: any, config: any, allowWarning: any): Promise<any>;
    analyze(databaseConnection: any, config: any, allowWarning: any): Promise<any>;
}
//# sourceMappingURL=database-analyzer.d.ts.map