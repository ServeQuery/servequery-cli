"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDatabaseLocal = void 0;
function buildDatabaseUrl(dbConfig) {
    let connectionString;
    if (!dbConfig) {
        return null;
    }
    if (dbConfig.dbConnectionUrl) {
        connectionString = dbConfig.dbConnectionUrl;
    }
    else {
        let protocol = dbConfig.dbDialect;
        let port = `:${dbConfig.dbPort}`;
        let password = '';
        if (dbConfig.dbDialect === 'mongodb' && dbConfig.mongodbSrv) {
            protocol = 'mongodb+srv';
            port = '';
        }
        if (dbConfig.dbPassword) {
            // NOTICE: Encode password string in case of special chars.
            password = `:${encodeURIComponent(dbConfig.dbPassword)}`;
        }
        connectionString = `${protocol}://${dbConfig.dbUser || ''}${password}${dbConfig.dbUser || password ? '@' : ''}${dbConfig.dbHostname}${port}/${dbConfig.dbName}`;
    }
    return connectionString;
}
exports.default = buildDatabaseUrl;
function isDatabaseLocal(dbConfig) {
    const databaseUrl = buildDatabaseUrl(dbConfig);
    return !!databaseUrl && (databaseUrl.includes('127.0.0.1') || databaseUrl.includes('localhost'));
}
exports.isDatabaseLocal = isDatabaseLocal;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YWJhc2UtdXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2RhdGFiYXNlLXVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUF3QixnQkFBZ0IsQ0FBQyxRQUFrQjtJQUN6RCxJQUFJLGdCQUF3QixDQUFDO0lBRTdCLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQzVCLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUM7S0FDN0M7U0FBTTtRQUNMLElBQUksUUFBUSxHQUFXLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDMUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDakMsSUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWxCLElBQUksUUFBUSxDQUFDLFNBQVMsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUMzRCxRQUFRLEdBQUcsYUFBYSxDQUFDO1lBQ3pCLElBQUksR0FBRyxFQUFFLENBQUM7U0FDWDtRQUVELElBQUksUUFBUSxDQUFDLFVBQVUsRUFBRTtZQUN2QiwyREFBMkQ7WUFDM0QsUUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7U0FDMUQ7UUFFRCxnQkFBZ0IsR0FBRyxHQUFHLFFBQVEsTUFBTSxRQUFRLENBQUMsTUFBTSxJQUFJLEVBQUUsR0FBRyxRQUFRLEdBQ2xFLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ3RDLEdBQUcsUUFBUSxDQUFDLFVBQVUsR0FBRyxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDO0FBOUJELG1DQThCQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxRQUFrQjtJQUNoRCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvQyxPQUFPLENBQUMsQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNuRyxDQUFDO0FBSEQsMENBR0MifQ==