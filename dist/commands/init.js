const { Flags } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const withCurrentProject = require('../services/with-current-project');
const ProjectManager = require('../services/project-manager');
const EnvironmentManager = require('../services/environment-manager');
const { handleInitError, handleDatabaseConfiguration, validateEndpoint, getApplicationPortFromCompleteEndpoint, amendDotenvFile, createDotenvFile, displayEnvironmentVariablesAndCopyToClipboard, } = require('../services/init-manager');
const SUCCESS_MESSAGE_ALL_SET_AND_READY = "You're now set up and ready to develop on Serve Query";
const SUCCESS_MESSAGE_LEARN_MORE_ON_CLI_USAGE = 'To learn more about the recommended usage of this CLI, please visit https://docs.servequery.com/documentation/reference-guide/how-it-works/developing-on-servequery/servequery-cli-commands.';
const PROMPT_MESSAGE_AUTO_FILLING_ENV_FILE = 'Do you want your current folder `.env` file to be completed automatically with your environment variables?';
const PROMPT_MESSAGE_AUTO_CREATING_ENV_FILE = 'Do you want a new `.env` file (containing your environment variables) to be automatically created in your current folder?';
class InitCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, fs, inquirer, spinner, buildDatabaseUrl } = this.context;
        assertPresent({
            env,
            fs,
            inquirer,
            spinner,
            buildDatabaseUrl,
        });
        this.env = env;
        this.fs = fs;
        this.inquirer = inquirer;
        this.spinner = spinner;
        this.buildDatabaseUrl = buildDatabaseUrl;
        this.environmentVariables = {};
    }
    async runAuthenticated() {
        try {
            this.spinner.start({ text: 'Selecting your project' });
            await this.spinner.attachToPromise(this.projectSelection());
            this.spinner.start({ text: 'Analyzing your setup' });
            await this.spinner.attachToPromise(this.projectValidation());
            this.spinner.start({ text: 'Checking your database setup' });
            await this.spinner.attachToPromise(this.handleDatabaseUrlConfiguration());
            this.spinner.start({ text: 'Setting up your development environment' });
            await this.spinner.attachToPromise(this.developmentEnvironmentCreation());
            await this.environmentVariablesAutoFilling();
            this.spinner.start({ text: SUCCESS_MESSAGE_ALL_SET_AND_READY });
            this.spinner.success();
            this.logger.info(SUCCESS_MESSAGE_LEARN_MORE_ON_CLI_USAGE);
        }
        catch (error) {
            const exitMessage = handleInitError(error);
            this.logger.error(exitMessage);
            this.exit(1);
        }
    }
    async projectSelection() {
        const parsed = await this.parse(InitCommand);
        this.config = await withCurrentProject({
            ...this.env,
            ...parsed.flags,
            includeLegacy: true,
        });
    }
    async projectValidation() {
        const project = await new ProjectManager(this.config).getProjectForDevWorkflow();
        this.environmentVariables.projectOrigin = project.origin;
    }
    async handleDatabaseUrlConfiguration() {
        if (this.environmentVariables.projectOrigin !== 'In-app') {
            const isDatabaseAlreadyConfigured = !!this.env.DATABASE_URL;
            if (!isDatabaseAlreadyConfigured) {
                this.spinner.pause();
                const databaseConfiguration = await handleDatabaseConfiguration();
                this.spinner.continue();
                if (databaseConfiguration) {
                    const dbConfig = {
                        dbConnectionUrl: databaseConfiguration.dbConnectionUrl,
                        dbDialect: databaseConfiguration.databaseDialect,
                        dbHostname: databaseConfiguration.databaseHost,
                        dbName: databaseConfiguration.databaseName,
                        dbPassword: databaseConfiguration.databasePassword,
                        dbPort: databaseConfiguration.databasePort,
                        dbSchema: databaseConfiguration.databaseSchema,
                        dbUser: databaseConfiguration.databaseUser,
                        mongodbSrv: databaseConfiguration.mongodbSrv,
                        ssl: databaseConfiguration.databaseSSL,
                    };
                    this.environmentVariables.databaseUrl = this.buildDatabaseUrl(dbConfig);
                    this.environmentVariables.databaseSchema = databaseConfiguration.databaseSchema;
                    this.environmentVariables.databaseSSL = databaseConfiguration.ssl;
                }
            }
        }
    }
    async developmentEnvironmentCreation() {
        let developmentEnvironment;
        try {
            developmentEnvironment = await new ProjectManager(this.config).getDevelopmentEnvironmentForUser(this.config.projectId);
        }
        catch (error) {
            developmentEnvironment = null;
        }
        if (!developmentEnvironment) {
            this.spinner.pause();
            const prompter = await this.inquirer.prompt([
                {
                    name: 'endpoint',
                    message: 'Enter your local admin backend endpoint:',
                    type: 'input',
                    default: 'http://localhost:3310',
                    validate: validateEndpoint,
                },
            ]);
            this.spinner.continue();
            developmentEnvironment = await new EnvironmentManager(this.config).createDevelopmentEnvironment(this.config.projectId, prompter.endpoint);
        }
        this.environmentVariables.servequeryEnvSecret = developmentEnvironment.secretKey;
        this.environmentVariables.applicationPort = getApplicationPortFromCompleteEndpoint(developmentEnvironment.apiEndpoint);
    }
    async environmentVariablesAutoFilling() {
        if (this.environmentVariables.projectOrigin !== 'In-app') {
            const existingEnvFile = this.fs.existsSync('.env');
            const response = await this.inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'autoFillOrCreationConfirmation',
                    message: existingEnvFile
                        ? PROMPT_MESSAGE_AUTO_FILLING_ENV_FILE
                        : PROMPT_MESSAGE_AUTO_CREATING_ENV_FILE,
                },
            ]);
            if (response.autoFillOrCreationConfirmation) {
                try {
                    return existingEnvFile
                        ? amendDotenvFile(this.environmentVariables)
                        : createDotenvFile(this.environmentVariables);
                }
                catch (error) {
                    return displayEnvironmentVariablesAndCopyToClipboard(this.environmentVariables);
                }
            }
        }
        return displayEnvironmentVariablesAndCopyToClipboard(this.environmentVariables);
    }
}
InitCommand.aliases = ['environments:init'];
InitCommand.description = 'Set up your development environment in your current folder.';
InitCommand.flags = {
    projectId: Flags.integer({
        char: 'p',
        description: 'The id of the project you want to init.',
    }),
};
module.exports = InitCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9pbml0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsTUFBTSw0QkFBNEIsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUYsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUN2RSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUM5RCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3RFLE1BQU0sRUFDSixlQUFlLEVBQ2YsMkJBQTJCLEVBQzNCLGdCQUFnQixFQUNoQixzQ0FBc0MsRUFDdEMsZUFBZSxFQUNmLGdCQUFnQixFQUNoQiw2Q0FBNkMsR0FDOUMsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUV4QyxNQUFNLGlDQUFpQyxHQUFHLHdEQUF3RCxDQUFDO0FBQ25HLE1BQU0sdUNBQXVDLEdBQzNDLDZMQUE2TCxDQUFDO0FBRWhNLE1BQU0sb0NBQW9DLEdBQ3hDLDRHQUE0RyxDQUFDO0FBQy9HLE1BQU0scUNBQXFDLEdBQ3pDLDJIQUEySCxDQUFDO0FBRTlILE1BQU0sV0FBWSxTQUFRLDRCQUE0QjtJQUNwRCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckYsYUFBYSxDQUFDO1lBQ1osR0FBRztZQUNILEVB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