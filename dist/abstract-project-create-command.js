"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const abstract_authenticated_command_1 = __importDefault(require("./abstract-authenticated-command"));
const options_1 = require("./services/projects/create/options");
class AbstractProjectCreateCommand extends abstract_authenticated_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, authenticator, eventSender, optionParser, projectCreator, database, messages, spinner, } = this.context;
        assertPresent({
            authenticator,
            eventSender,
            optionParser,
            projectCreator,
            database,
            messages,
            spinner,
        });
        this.eventSender = eventSender;
        this.optionParser = optionParser;
        this.projectCreator = projectCreator;
        this.database = database;
        this.messages = messages;
        this.spinner = spinner;
    }
    async runAuthenticated() {
        try {
            const { appConfig, dbConfig, language, meta, authenticationToken } = await this.getConfig();
            this.spinner.start({ text: 'Creating your project on Serve Query' });
            const projectCreationPromise = this.projectCreator.create(authenticationToken, appConfig, meta);
            const { id, envSecret, authSecret } = await this.spinner.attachToPromise(projectCreationPromise);
            this.eventSender.meta.projectId = id;
            await this.testDatabaseConnection(dbConfig);
            await this.generateProject({
                dbConfig,
                appConfig,
                servequeryAuthSecret: authSecret,
                servequeryEnvSecret: envSecret,
                language,
            });
            await this.notifySuccess();
        }
        catch (error) {
            // Display customized error for non-authentication errors.
            if (error.status !== 401 && error.status !== 403) {
                this.logger.error(['Cannot generate your project.', `${this.messages.ERROR_UNEXPECTED}`]);
                this.logger.log(`${this.chalk.red(error)}`);
                this.exit(1);
            }
            else {
                throw error;
            }
        }
    }
    async getConfig() {
        const config = await this.getCommandOptions();
        // FIXME: Works as only one instance at execution time. Not ideal.
        this.eventSender.command = 'projects:create';
        this.eventSender.applicationName = config.applicationName;
        if (!config.databaseDialect && !config.databaseConnectionURL) {
            this.logger.error('Missing database dialect option value');
            this.exit(1);
        }
        const appConfig = {
            appName: config.applicationName,
            appHostname: config.applicationHost,
            appPort: Number(config.applicationPort),
        };
        const dbConfig = {
            dbConnectionUrl: config.databaseConnectionURL,
            dbDialect: config.databaseDialect,
            dbSchema: config.databaseSchema,
            dbName: config.databaseName,
            dbHostname: config.databaseHost,
            dbPort: config.databasePort,
            dbSsl: config.databaseSSL,
            dbSslMode: config.databaseSslMode,
            dbUser: config.databaseUser,
            dbPassword: config.databasePassword,
            mongodbSrv: config.mongoDBSRV,
        };
        const meta = {
            // FIXME: Remove the condition when the agent v1 command is dropped
            agent: this.agent || (dbConfig.dbDialect === 'mongodb' ? 'express-mongoose' : 'express-sequelize'),
            dbDialect: dbConfig.dbDialect,
            architecture: 'microservice',
            isLocal: ['localhost', '127.0.0.1', '::1'].some(keyword => dbConfig.dbHostname
                ? dbConfig.dbHostname.includes(keyword)
                : dbConfig.dbConnectionUrl?.includes(keyword)),
        };
        // This `await` seems to be useless but removing it breaks the tests.
        // Leaving it here for now until we figure out why the mocks are not compatible with the implementation.
        const authenticationToken = (await this.authenticator.getAuthToken()) || '';
        this.eventSender.sessionToken = authenticationToken;
        this.eventSender.meta = meta;
        return {
            appConfig,
            dbConfig,
            language: config.language,
            meta,
            authenticationToken,
        };
    }
    async getCommandOptions() {
        const options = await this.optionParser.getCommandLineOptions(this);
        // Dialect must be set for the project creator to work even if the connection URL is provided
        options.databaseDialect = (0, options_1.getDialect)(options);
        // Support both `databaseSSL` and `databaseSslMode` options
        if (options.databaseSSL !== undefined && options.databaseSslMode === undefined) {
            options.databaseSslMode = options.databaseSSL ? 'preferred' : 'disabled';
        }
        else if (options.databaseSSL === undefined && options.databaseSslMode !== undefined) {
            options.databaseSSL = options.databaseSslMode !== 'disabled';
        }
        else {
            options.databaseSslMode = 'preferred'; // Default is preferred for agent-nodejs
            options.databaseSSL = false; // Default is false for servequery-express
        }
        return options;
    }
    async testDatabaseConnection(dbConfig) {
        this.spinner.start({ text: 'Testing connection to your database' });
        const connectionPromise = this.database
            .connect(dbConfig)
            .then(connection => this.database.disconnect(connection));
        await this.spinner.attachToPromise(connectionPromise);
    }
    async notifySuccess() {
        this.logger.info(`Hooray, ${this.chalk.green('installation success')}!`);
        await this.eventSender.notifySuccess();
    }
}
exports.default = AbstractProjectCreateCommand;
AbstractProjectCreateCommand.args = {
    applicationName: core_1.Args.string({
        name: 'applicationName',
        required: true,
        description: 'Name of the project to create.',
    }),
};
/** @see https://oclif.io/docs/commands */
AbstractProjectCreateCommand.description = 'Create a new Serve Query project.';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtcHJvamVjdC1jcmVhdGUtY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hYnN0cmFjdC1wcm9qZWN0LWNyZWF0ZS1jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBWUEsc0NBQW1DO0FBRW5DLHNHQUE0RTtBQUM1RSxnRUFBZ0U7QUFFaEUsTUFBOEIsNEJBQTZCLFNBQVEsd0NBQTRCO0lBMEI3RixZQUFZLElBQWMsRUFBRSxNQUFtQixFQUFFLElBQUk7UUFDbkQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFMUIsTUFBTSxFQUNKLGFBQWEsRUFDYixhQUFhLEVBQ2IsV0FBVyxFQUNYLFlBQVksRUFDWixjQUFjLEVBQ2QsUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEdBQ1IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRWpCLGFBQWEsQ0FBQztZQUNaLGFBQWE7WUFDYixXQUFXO1lBQ1gsWUFBWTtZQUNaLGNBQWM7WUFDZCxRQUFRO1lBQ1IsUUFBUTtZQUNSLE9BQU87U0FDUixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUN6QixDQUFDO0lBRVMsS0FBSyxDQUFDLGdCQUFnQjtRQUM5QixJQUFJO1lBQ0YsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lB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