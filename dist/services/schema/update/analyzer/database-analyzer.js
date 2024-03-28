const EmptyDatabaseError = require('../../../../errors/database/empty-database-error');
module.exports = class DatabaseAnalyzer {
    constructor({ assertPresent, mongoAnalyzer, sequelizeAnalyzer, terminator }) {
        assertPresent({
            mongoAnalyzer,
            sequelizeAnalyzer,
            terminator,
        });
        this.mongoAnalyzer = mongoAnalyzer;
        this.sequelizeAnalyzer = sequelizeAnalyzer;
        this.terminator = terminator;
    }
    async reportEmptyDatabase(orm, dialect) {
        const logs = [
            `Your database looks empty! Please create some ${orm === 'mongoose' ? 'collections' : 'tables'} before running the command.`,
        ];
        if (orm === 'sequelize') {
            logs.push('If not, check whether you are using a custom database schema (use in that case the --schema option).');
        }
        return this.terminator.terminate(1, {
            logs,
            errorCode: 'database_empty',
            errorMessage: 'Your database is empty.',
            context: {
                orm,
                dialect,
            },
        });
    }
    async _analyze(analyze, databaseConnection, config, allowWarning) {
        return analyze(databaseConnection, config, allowWarning).catch(error => {
            if (error instanceof EmptyDatabaseError) {
                return this.reportEmptyDatabase(error.details.orm, error.details.dialect);
            }
            throw error;
        });
    }
    async analyzeMongoDb(databaseConnection, config, allowWarning) {
        const analyze = this.mongoAnalyzer.analyzeMongoCollections.bind(this.mongoAnalyzer);
        return this._analyze(analyze, databaseConnection.db(), config, allowWarning);
    }
    async analyze(databaseConnection, config, allowWarning) {
        let analyze;
        if (config.dbDialect === 'mongodb') {
            analyze = this.mongoAnalyzer.analyzeMongoCollectionsWithoutProgressBar.bind(this.mongoAnalyzer);
            databaseConnection = databaseConnection.db();
        }
        else {
            analyze = this.sequelizeAnalyzer;
        }
        return this._analyze(analyze, databaseConnection, config, allowWarning);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3VwZGF0ZS9hbmFseXplci9kYXRhYmFzZS1hbmFseXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBRXZGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxnQkFBZ0I7SUFDckMsWUFBWSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFO1FBQ3pFLGFBQWEsQ0FBQztZQUNaLGFBQWE7WUFDYixpQkFBaUI7WUFDakIsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsRUFBRSxPQUFPO1FBQ3BDLE1BQU0sSUFBSSxHQUFHO1lBQ1gsaURBQ0UsR0FBRyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxRQUN2Qyw4QkFBOEI7U0FDL0IsQ0FBQztRQUNGLElBQUksR0FBRyxLQUFLLFdBQVcsRUFBRTtZQUN2QixJQUFJLENBQUMsSUFBSSxDQUNQLHNHQUFzRyxDQUN2RyxDQUFDO1NBQ0g7UUFDRCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtZQUNsQyxJQUFJO1lBQ0osU0FBUyxFQUFFLGdCQUFnQjtZQUMzQixZQUFZLEVBQUUseUJBQXlCO1lBQ3ZDLE9BQU8sRUFBRTtnQkFDUCxHQUFHO2dCQUNILE9BQU87YUFDUjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsWUFBWTtRQUM5RCxPQUFPLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JFLElBQUksS0FBSyxZQUFZLGtCQUFrQixFQUFFO2dCQUN2QyxPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzNFO1lBQ0QsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxZQUFZO1FBQzNELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMvRSxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLEVBQUUsWUFBWTtRQUNwRCxJQUFJLE9BQU8sQ0FBQztRQUNaLElBQUksTUFBTSxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7WUFDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUNBQXlDLENBQUMsSUFBSSxDQUN6RSxJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFDO1lBRUYsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDOUM7YUFBTTtZQUNMLE9BQU8sR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDbEM7UUFDRCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRSxDQUFDO0NBQ0YsQ0FBQyJ9