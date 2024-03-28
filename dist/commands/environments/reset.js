const { Flags } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const ProjectManager = require('../../services/project-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
const withCurrentProject = require('../../services/with-current-project');
const { handleError } = require('../../utils/error');
const askForEnvironment = require('../../services/ask-for-environment');
class ResetCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(ResetCommand);
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        let config;
        try {
            config = await withCurrentProject({ ...this.env, ...commandOptions });
            if (!config.envSecret) {
                const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
                config.envSecret = environment.secretKey;
            }
            if (!config.environment) {
                config.environment = await askForEnvironment(config, 'Select the remote environment you want to reset', ['remote']);
            }
            if (!config.force) {
                const response = await this.inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: `Reset changes on the environment ${config.environment}`,
                    },
                ]);
                if (!response.confirm)
                    return;
            }
            await new EnvironmentManager(config).reset(config.environment, config.envSecret);
            this.logger.success(`Environment ${config.environment} successfully reset. Please refresh your browser to see the new state.`);
        }
        catch (error) {
            if (error.response && error.status === 403) {
                this.logger.error(`You do not have the rights to reset the layout of the environment ${config.environment}`);
            }
            else {
                this.logger.error(handleError(error));
            }
            this.exit(2);
        }
    }
}
ResetCommand.description = 'Reset a remote environment by removing all layout changes';
ResetCommand.flags = {
    environment: Flags.string({
        char: 'e',
        description: 'The remote environment name to reset.',
    }),
    force: Flags.boolean({
        description: 'Skip reset changes confirmation.',
    }),
    projectId: Flags.integer({
        char: 'p',
        description: 'The id of the project to work on.',
        default: null,
    }),
};
module.exports = ResetCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvZW52aXJvbm1lbnRzL3Jlc2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN6RSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztBQUNqRSxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUM3RixNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBQzFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNyRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBRXhFLE1BQU0sWUFBYSxTQUFRLDRCQUE0QjtJQUNyRCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RELGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFD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