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
const abstract_project_create_command_1 = __importDefault(require("../../../abstract-project-create-command"));
const projectCreateOptions = __importStar(require("../../../services/projects/create/options"));
const agents_1 = __importDefault(require("../../../utils/agents"));
const option_parser_1 = require("../../../utils/option-parser");
class NosqlCommand extends abstract_project_create_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        this.agent = agents_1.default.NodeJS;
        const { assertPresent, agentNodejsDumper, databaseAnalyzer } = this.context;
        assertPresent({ agentNodejsDumper, databaseAnalyzer });
        this.dumper = agentNodejsDumper;
        this.databaseAnalyzer = databaseAnalyzer;
    }
    async generateProject(config) {
        const schema = await this.analyzeDatabase(config.dbConfig);
        await this.createFiles(config, schema);
    }
    async getCommandOptions() {
        return {
            ...(await super.getCommandOptions()),
            databaseDialect: 'mongodb',
        };
    }
    async analyzeDatabase(dbConfig) {
        this.logger.info('Analyzing the database');
        const connection = await this.database.connect(dbConfig);
        const schema = await this.databaseAnalyzer.analyzeMongoDb(connection, dbConfig, true);
        await this.database.disconnect(connection);
        this.logger.success('Database is analyzed', { lineColor: 'green' });
        return schema;
    }
    async createFiles(config, schema) {
        this.spinner.start({ text: 'Creating your project files' });
        const dumperConfig = {
            dbConfig: config.dbConfig,
            appConfig: config.appConfig,
            servequeryAuthSecret: config.servequeryAuthSecret,
            servequeryEnvSecret: config.servequeryEnvSecret,
            language: config.language,
        };
        const dumpPromise = this.dumper.dump(dumperConfig, schema);
        await this.spinner.attachToPromise(dumpPromise);
    }
}
exports.default = NosqlCommand;
_a = NosqlCommand;
NosqlCommand.options = {
    databaseConnectionURL: projectCreateOptions.databaseConnectionURL,
    databaseName: projectCreateOptions.databaseName,
    databaseHost: projectCreateOptions.databaseHost,
    databasePort: projectCreateOptions.databasePort,
    databaseUser: projectCreateOptions.databaseUser,
    databasePassword: projectCreateOptions.databasePassword,
    // Set prompter to null to replicate bug from previous version (we don't ask for SSL there).
    databaseSslMode: { ...projectCreateOptions.databaseSslMode, prompter: null },
    databaseSSL: { ...projectCreateOptions.databaseSSL, prompter: null },
    mongoDBSRV: projectCreateOptions.mongoDBSRV,
    applicationHost: projectCreateOptions.applicationHost,
    applicationPort: projectCreateOptions.applicationPort,
    language: projectCreateOptions.language,
};
/** @see https://oclif.io/docs/args */
NosqlCommand.args = abstract_project_create_command_1.default.args;
/** @see https://oclif.io/docs/flags */
NosqlCommand.flags = (0, option_parser_1.optionsToFlags)(_a.options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9zcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tbWFuZHMvcHJvamVjdHMvY3JlYXRlL25vc3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBT0EsK0dBQW9GO0FBQ3BGLGdHQUFrRjtBQUNsRixtRUFBMkM7QUFDM0MsZ0VBQThEO0FBRTlELE1BQXFCLFlBQWEsU0FBUSx5Q0FBNEI7SUErQnBFLFlBQVksSUFBYyxFQUFFLE1BQW1CLEVBQUUsSUFBSztRQUNwRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUhULFVBQUssR0FBRyxnQkFBTSxDQUFDLE1BQU0sQ0FBQztRQUt2QyxNQUFNLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUU1RSxhQUFhLENBQUMsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFFdkQsSUFBSSxDQUFDLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDM0MsQ0FBQztJQUVTLEtBQUssQ0FBQyxlQUFlLENBQUMsTUFBYztRQUM1QyxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekMsQ0FBQztJQUVrQixLQUFLLENBQUMsaUJBQWlCO1FBQ3hDLE9BQU87WUFDTCxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUNwQyxlQUFlLEVBQUUsU0FBUztTQUMzQixDQUFDO0lBQ0osQ0FBQztJQUVPLEtBQUssQ0FBQyxlQUFlLENBQUMsUUFBa0I7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUMzQyxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUNwRSxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRU8sS0FBSyxDQUFDLFdBQVcsQ0FBQyxNQUFjLEVBQUUsTUFBTTtRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSw2QkFBNkIsRUFBRSxDQUFDLENBQUM7UUFDNUQsTUFBTSxZQUFZLEdBQUc7WUFDbkIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixnQkFBZ0IsRUFBRSxNQUFNLENBQUMsZ0JBQWdCO1lBQ3pDLGVBQWUsRUFBRSxNQUFNLENBQUMsZUFBZTtZQUN2QyxRQUFRLEVBQUUsTUFBTSxDQUFDLFFBQVE7U0FDMUIsQ0FBQztRQUNGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7O0FBMUVILCtCQTJFQzs7QUExRTJCLG9CQUFPLEdBQW1CO0lBQ2xELHFCQUFxQixFQUFFLG9CQUFvQixDQUFDLHFCQUFxQjtJQUNqRSxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxZQUFZLEVBQUUsb0JBQW9CLENBQUMsWUFBWTtJQUMvQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxnQkFBZ0I7SUFFdkQsNEZBQTRGO0lBQzVGLGVBQWUsRUFBRSxFQUFFLEdBQUcsb0JBQW9CLENBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7SUFDNUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxXQUFXLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUVwRSxVQUFVLEVBQUUsb0JBQW9CLENBQUMsVUFBVTtJQUMzQyxlQUFlLEVBQUUsb0JBQW9CLENBQUMsZUFBZTtJQUNyRCxlQUFlLEVBQUUsb0JBQW9CLENBQUMsZUFBZTtJQUNyRCxRQUFRLEVBQUUsb0JBQW9CLENBQUMsUUFBUTtDQUN4QyxDQUFDO0FBRUYsc0NBQXNDO0FBQ2IsaUJBQUksR0FBRyx5Q0FBNEIsQ0FBQyxJQUFJLENBQUM7QUFFbEUsdUNBQXVDO0FBQ2Qsa0JBQUssR0FBRyxJQUFBLDhCQUFjLEVBQUMsRUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDIn0=