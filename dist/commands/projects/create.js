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
const abstract_project_create_command_1 = __importDefault(require("../../abstract-project-create-command"));
const projectCreateOptions = __importStar(require("../../services/projects/create/options"));
const option_parser_1 = require("../../utils/option-parser");
class CreateCommand extends abstract_project_create_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        this.agent = null;
        const { assertPresent, databaseAnalyzer, servequeryExpressDumper } = this.context;
        assertPresent({ databaseAnalyzer, servequeryExpressDumper });
        this.databaseAnalyzer = databaseAnalyzer;
        this.dumper = servequeryExpressDumper;
    }
    async generateProject(config) {
        const schema = await this.analyzeDatabase(config.dbConfig);
        await this.createFiles(config, schema);
    }
    async analyzeDatabase(dbConfig) {
        const connection = await this.database.connect(dbConfig);
        if (dbConfig.dbDialect === 'mongodb') {
            // the mongodb analyzer display a progress bar during the analysis
            this.logger.info('Analyzing the database');
            const schema = await this.databaseAnalyzer.analyzeMongoDb(connection, dbConfig, true);
            await this.database.disconnect(connection);
            this.logger.success('Database is analyzed', { lineColor: 'green' });
            return schema;
        }
        this.spinner.start({ text: 'Analyzing the database' });
        const schemaPromise = this.databaseAnalyzer.analyze(connection, dbConfig, true);
        const schema = await this.spinner.attachToPromise(schemaPromise);
        this.logger.success('Database is analyzed', { lineColor: 'green' });
        await this.database.disconnect(connection);
        return schema;
    }
    async createFiles(config, schema) {
        this.spinner.start({ text: 'Creating your project files' });
        const dumpPromise = this.dumper.dump(config, schema);
        await this.spinner.attachToPromise(dumpPromise);
    }
}
exports.default = CreateCommand;
_a = CreateCommand;
CreateCommand.options = {
    databaseConnectionURL: projectCreateOptions.databaseConnectionURL,
    databaseDialect: projectCreateOptions.databaseDialectV1,
    databaseName: projectCreateOptions.databaseName,
    databaseSchema: projectCreateOptions.databaseSchema,
    databaseHost: projectCreateOptions.databaseHost,
    databasePort: projectCreateOptions.databasePort,
    databaseUser: projectCreateOptions.databaseUser,
    databasePassword: projectCreateOptions.databasePassword,
    databaseSSL: { ...projectCreateOptions.databaseSSL, prompter: null },
    mongoDBSRV: projectCreateOptions.mongoDBSRV,
    applicationHost: projectCreateOptions.applicationHost,
    applicationPort: projectCreateOptions.applicationPort,
};
/** @see https://oclif.io/docs/args */
CreateCommand.args = abstract_project_create_command_1.default.args;
/** @see https://oclif.io/docs/flags */
CreateCommand.flags = (0, option_parser_1.optionsToFlags)(_a.options);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3Byb2plY3RzL2NyZWF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1BLDRHQUFpRjtBQUNqRiw2RkFBK0U7QUFDL0UsNkRBQTJEO0FBRTNELE1BQXFCLGFBQWMsU0FBUSx5Q0FBNEI7SUE0QnJFLFlBQVksSUFBYyxFQUFFLE1BQW1CLEVBQUUsSUFBSztRQUNwRCxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUhULFVBQUssR0FBRyxJQUFJLENBQUM7UUFLOUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDOUUsYUFBYSxDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBRXpELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO0lBQ3BDLENBQUM7SUFFUyxLQUFLLENBQUMsZUFBZSxDQUFDLE1BQWM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFTyxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQWtCO1FBQzlDLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFekQsSUFBSSxRQUFRLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBRTtZQUNwQyxrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLE1BQU0s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