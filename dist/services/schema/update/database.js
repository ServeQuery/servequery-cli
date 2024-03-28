class Database {
    constructor({ assertPresent, mongodb, Sequelize, terminator }) {
        assertPresent({
            mongodb,
            Sequelize,
            terminator,
        });
        this.mongodb = mongodb;
        this.Sequelize = Sequelize;
        this.terminator = terminator;
    }
    async handleAuthenticationError(error) {
        return this.terminator.terminate(1, {
            logs: ['Cannot connect to the database due to the following error:', error],
            errorCode: 'database_authentication_error',
            errorMessage: error.message,
        });
    }
    sequelizeAuthenticate(connection) {
        return connection
            .authenticate()
            .then(() => connection)
            .catch(error => this.handleAuthenticationError(error));
    }
    // eslint-disable-next-line class-methods-use-this
    getDialect(dbConnectionUrl, dbDialect) {
        if (dbConnectionUrl) {
            if (dbConnectionUrl.startsWith('postgres://')) {
                return 'postgres';
            }
            if (dbConnectionUrl.startsWith('mysql://')) {
                return 'mysql';
            }
            if (dbConnectionUrl.startsWith('mssql://')) {
                return 'mssql';
            }
            // NOTICE: For MongoDB can be "mongodb://" or "mongodb+srv://"
            if (dbConnectionUrl.startsWith('mongodb')) {
                return 'mongodb';
            }
        }
        return dbDialect;
    }
    connectToMongodb(options, isSSL) {
        let connectionOptionsMongoClient = options.connectionOptions;
        if (!connectionOptionsMongoClient) {
            connectionOptionsMongoClient = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };
            if (isSSL) {
                connectionOptionsMongoClient.ssl = true;
            }
        }
        let connectionUrl = options.dbConnectionUrl;
        if (!connectionUrl) {
            connectionUrl = 'mongodb';
            if (options.mongodbSrv) {
                connectionUrl += '+srv';
            }
            connectionUrl += '://';
            if (options.dbUser) {
                connectionUrl += options.dbUser;
            }
            if (options.dbPassword) {
                connectionUrl += `:${options.dbPassword}`;
            }
            if (options.dbUser || options.dbPassword) {
                connectionUrl += '@';
            }
            connectionUrl += options.dbHostname;
            if (!options.mongodbSrv) {
                connectionUrl += `:${options.dbPort}`;
            }
            connectionUrl += `/${options.dbName}`;
        }
        return this.mongodb.MongoClient.connect(connectionUrl, connectionOptionsMongoClient).catch(error => this.handleAuthenticationError(error));
    }
    connectToSequelize(databaseDialect, options, isSSL) {
        let connectionOptionsSequelize = options.connectionOptions;
        if (!connectionOptionsSequelize) {
            connectionOptionsSequelize = {};
            if (databaseDialect === 'mssql') {
                connectionOptionsSequelize.dialectOptions = { options: { encrypt: isSSL } };
            }
            else if (isSSL) {
                // Add SSL options only if the user selected SSL mode.
                // SSL Cerificate is always trusted during `servequery projects:create` command
                // to ease their onboarding.
                connectionOptionsSequelize.dialectOptions = { ssl: { rejectUnauthorized: false } };
            }
        }
        connectionOptionsSequelize.logging = false;
        let connection;
        if (options.dbConnectionUrl) {
            connection = new this.Sequelize(options.dbConnectionUrl, connectionOptionsSequelize);
        }
        else {
            connectionOptionsSequelize.host = options.dbHostname;
            connectionOptionsSequelize.port = options.dbPort;
            connectionOptionsSequelize.dialect = databaseDialect;
            connection = new this.Sequelize(options.dbName, options.dbUser, options.dbPassword, connectionOptionsSequelize);
        }
        return this.sequelizeAuthenticate(connection);
    }
    async connect(options) {
        const isSSL = options.dbSSL || options.dbSsl;
        const databaseDialect = this.getDialect(options.dbConnectionUrl, options.dbDialect);
        if (databaseDialect === 'mongodb') {
            return this.connectToMongodb(options, isSSL);
        }
        return this.connectToSequelize(databaseDialect, options, isSSL);
    }
    connectFromDatabasesConfig(databasesConfig) {
        return Promise.all(databasesConfig.map(async (databaseConfig) => {
            const connectionOptions = { ...databaseConfig.connection.options };
            const connectionInstance = await this.connect({
                dbConnectionUrl: databaseConfig.connection.url,
                connectionOptions,
            });
            return {
                ...databaseConfig,
                connectionInstance,
            };
        }));
    }
    // eslint-disable-next-line class-methods-use-this
    disconnectFromDatabases(databaseConnections) {
        return Promise.all(databaseConnections.map(connection => this.disconnect(connection.connectionInstance)));
    }
    // eslint-disable-next-line class-methods-use-this
    async disconnect(connection) {
        return connection.close();
    }
    areAllDatabasesOfTheSameType(databasesConfig) {
        const databasesDialect = databasesConfig.map(databaseConfig => this.getDialect(databaseConfig.connection.url));
        const hasMongoDb = databasesDialect.some(dialect => dialect === 'mongodb');
        const hasAnotherDbType = databasesDialect.some(dialect => dialect !== 'mongodb');
        return !(hasMongoDb && hasAnotherDbType);
    }
}
module.exports = Database;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3VwZGF0ZS9kYXRhYmFzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFFBQVE7SUFDWixZQUFZLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFO1FBQzNELGFBQWEsQ0FBQztZQUNaLE9BQU87WUFDUCxTQUFTO1lBQ1QsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxLQUFLLENBQUMseUJBQXlCLENBQUMsS0FBSztRQUNuQyxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtZQUNsQyxJQUFJLEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxLQUFLLENBQUM7WUFDM0UsU0FBUyxFQUFFLCtCQUErQjtZQUMxQyxZQUFZLEVBQUUsS0FBSyxDQUFDLE9BQU87U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELHFCQUFxQixDQUFDLFVBQVU7UUFDOUIsT0FBTyxVQUFVO2FBQ2QsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQzthQUN0QixLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQsa0RBQWtEO0lBQ2xELFVBQVUsQ0FBQyxlQUFlLEVBQUUsU0FBUztRQUNuQyxJQUFJLGVBQWUsRUFBRTtZQUNuQixJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQzdDLE9BQU8sVUFB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