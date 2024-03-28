"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const datasource_sql_1 = require("@servequery/datasource-sql");
const abstract_project_create_command_1 = __importDefault(require("../../../abstract-project-create-command"));
const projectCreateOptions = __importStar(require("../../../services/projects/create/options"));
const agents_1 = __importDefault(require("../../../utils/agents"));
const option_parser_1 = require("../../../utils/option-parser");
class SqlCommand extends abstract_project_create_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        this.agent = agents_1.default.NodeJS;
        const { assertPresent, agentNodejsDumper } = this.context;
        assertPresent({ agentNodejsDumper });
        this.dumper = agentNodejsDumper;
    }
    async generateProject(config) {
        this.spinner.start({ text: 'Creating your project files' });
        const dumperConfig = {
            dbConfig: config.dbConfig,
            appConfig: config.appConfig,
            servequeryAuthSecret: config.servequeryAuthSecret,
            servequeryEnvSecret: config.servequeryEnvSecret,
            language: config.language,
        };
        const dumpPromise = this.dumper.dump(dumperConfig);
        await this.spinner.attachToPromise(dumpPromise);
    }
    async testDatabaseConnection(dbConfig) {
        this.spinner.start({ text: 'Testing connection to your database' });
        const connectionPromise = (0, datasource_sql_1.introspect)({
            uri: dbConfig.dbConnectionUrl,
            dialect: dbConfig.dbDialect,
            host: dbConfig.dbHostname,
            database: dbConfig.dbName,
            password: dbConfig.dbPassword,
            port: dbConfig.dbPort,
            schema: dbConfig.dbSchema,
            sslMode: dbConfig.dbSslMode,
            username: dbConfig.dbUser,
        });
        await this.spinner.attachToPromise(connectionPromise);
    }
}
exports.default = SqlCommand;
_a = SqlCommand;
SqlCommand.options = {
    databaseConnectionURL: projectCreateOptions.databaseConnectionURL,
    databaseDialect: projectCreateOptions.databaseDialectSqlV2,
    databaseName: projectCreateOptions.databaseName,
    databaseSchema: projectCreateOptions.databaseSchema,
    databaseHost: projectCreateOptions.databaseHost,
    databasePort: projectCreateOptions.databasePort,
    databaseUser: projectCreateOptions.databaseUser,
    databasePassword: projectCreateOptions.databasePassword,
    // Set prompter to null to replicate bug from previous version (we don't ask for SSL there).
    databaseSslMode: { ...projectCreateOptions.databaseSslMode, prompter: null },
    databaseSSL: { ...projectCreateOptions.databaseSSL, prompter: null },
    applicationHost: projectCreateOptions.applicationHost,
    applicationPort: projectCreateOptions.applicationPort,
    language: projectCreateOptions.language,
};
/** @see https://oclif.io/docs/args */
SqlCommand.args = abstract_project_create_command_1.default.args;
/** @see https://oclif.io/docs/flags */
SqlCommand.flags = (0, option_parser_1.optionsToFlags)(_a.options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3Byb2plY3RzL2NyZWF0ZS9zcWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLQSxnRUFBeUQ7QUFFekQsK0dBQW9GO0FBQ3BGLGdHQUFrRjtBQUNsRixtRUFBMkM7QUFDM0MsZ0VBQThEO0FBRTlELE1BQXFCLFVBQVcsU0FBUSx5Q0FBNEI7SUE4QmxFLFlBQVksSUFBYyxFQUFFLE1BQW1CLEVBQUUsSUFBSztRQUNwRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUhULFVBQUssR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQztRQUt2QyxNQUFNLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUUxRCxhQUFhLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBRVMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxNQUFjO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxFQUFFLDZCQUE2QixFQUFFLENBQUMsQ0FBQztRQUM1RCxNQUFNLFlBQVksR0FBRztZQUNuQixRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7WUFDekIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTO1lBQzNCLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0I7WUFDekMsZUFBZSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1lBQ3ZDLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTtTQUMxQixDQUFDO1FBQ0YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkQsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRWtCLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxRQUFrQjtRQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxxQ0FBcUMsRUFBRSxDQUFDLENBQUM7UUFFcEUsTUFBTSxpQkFBaUIsR0FBRyxJQUFBLDJCQUFVLEVBQUM7WUFDbkMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxlQUFlO1lBQzdCLE9BQU8sRUFBRSxRQUFRLENBQUMsU0FBc0Q7WUFDeEUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxVQUFVO1lBQ3pCLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTTtZQUN6QixRQUFRLEVBQUUsUUFBUSxDQUFDLFVBQVU7WUFDN0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1lBQ3JCLE1BQU0sRUFBRSxRQUFRLENBQUMsUUFBUTtZQUN6QixPQUFPLEVBQUUsUUFBUSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNO1NBQzFCLENBQUMsQ0FBQztRQUVILE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUN4RCxDQUFDOztBQXJFSCw2QkFzRUM7O0FBckVrQixrQkFBTyxHQUFtQjtJQUN6QyxxQkFBcUIsRUFBRSxvQkFBb0IsQ0FBQyxxQkFBcUI7SUFDakUsZUFBZSxFQUFFLG9CQUFvQixDQUFDLG9CQUFvQjtJQUMxRCxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxjQUFjLEVBQUUsb0JBQW9CLENBQUMsY0FBYztJQUNuRCxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxnQkFBZ0I7SUFFdkQsNEZBQTRGO0lBQzVGLGVBQWUsRUFBRSxFQUFFLEdBQUcsb0JBQW9CLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDNUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUVwRSxlQUFlLEVBQUUsb0JBQW9CLENBQUMsZUFBZTtJQUNyRCxlQUFlLEVBQUUsb0JBQW9CLENBQUMsZUFBZTtJQUNyRCxRQUFRLEVBQUUsb0JBQW9CLENBQUMsUUFBUTtDQUN4QyxDQUFDO0FBRUYsc0NBQXNDO0FBQ2IsZUFBSSxHQUFHLHlDQUE0QixDQUFDLElBQUksQ0FBQztBQUVsRSx1Q0FBdUM7QUFDZCxnQkFBSyxHQUFHLElBQUEsOEJBQWMsRUFBQyxFQUFJLENBQUMsT0FBTyxDQUFDLENBQUMifQ==