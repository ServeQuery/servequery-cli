const { Flags, Args } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const BranchManager = require('../services/branch-manager');
const ProjectManager = require('../services/project-manager');
const askForEnvironment = require('../services/ask-for-environment');
const withCurrentProject = require('../services/with-current-project');
class SetOriginCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(SetOriginCommand);
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        let config;
        try {
            config = await withCurrentProject({ ...this.env, ...commandOptions });
            if (!config.envSecret) {
                const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
                config.envSecret = environment.secretKey;
            }
            if (!config.ENVIRONMENT_NAME) {
                config.ENVIRONMENT_NAME = await askForEnvironment(config, 'Select the environment you want to set as origin', ['remote', 'production']);
            }
            await BranchManager.setOrigin(config.ENVIRONMENT_NAME, config.envSecret);
            this.logger.success(`Origin "${config.ENVIRONMENT_NAME}" successfully set.`);
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
}
SetOriginCommand.aliases = ['branches:origin'];
SetOriginCommand.description =
    "Set an environment as your branch's origin. Your branch will build on top of that environment's layout.";
SetOriginCommand.flags = {
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
};
SetOriginCommand.args = {
    ENVIRONMENT_NAME: Args.string({
        name: 'ENVIRONMENT_NAME',
        required: false,
        description: 'The environment to set as origin.',
    }),
};
module.exports = SetOriginCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2V0LW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9zZXQtb3JpZ2luLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLE1BQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQzFGLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQzVELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0FBQzlELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDckUsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLGdCQUFpQixTQUFRLDRCQUE0QjtJQUN6RCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RELGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQztRQUM3QyxNQUFNLGNBQWMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7UUFDdEUsSUFBSSxNQUFNLENBQUM7UUFFWCxJQUFJO1lBQ0YsTUFBTSxHQUFHLE1BQU0sa0JBQWtCLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxjQUFjLEVBQUUsQ0FBQyxDQUFDO1lBRXRFLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO2dCQUNyQixNQUFNLFdBQVcsR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLGdDQUFnQyxDQUNuRixNQUFNLENBQUMsU0FBUyxDQUNqQixDQUFDO2dCQUNGLE1BQU0sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQzthQUMxQztZQUVELElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzVCLE1BQU0sQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLGlCQUFpQixDQUMvQyxNQUFNLEVBQ04sa0RBQWtELEVBQ2xELENBQUMsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUN6QixDQUFDO2FBQ0g7WUFFRCxNQUFNLGFBQWEsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN6RSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLE1BQU0sQ0FBQyxnQkFBZ0IscUJBQXFCLENBQUMsQ0FBQztTQUM5RTtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsTUFBTSxXQUFXLEdBQUcsTUFBTSxhQUFhLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkO0lBQ0gsQ0FBQztDQUNGO0FBRUQsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUUvQyxnQkFBZ0IsQ0FBQyxXQUFXO0lBQzFCLHlHQUF5RyxDQUFDO0FBRTVHLGdCQUFnQixDQUFDLEtBQUssR0FBRztJQUN2QixJQUFJLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUNsQixXQUFXLEVBQUUsNEJBQTRCO0tBQzFDLENBQUM7Q0FDSCxDQUFDO0FBRUYsZ0JBQWdCLENBQUMsSUFBSSxHQUFHO0lBQ3RCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDNUIsSUFBSSxFQUFFLGtCQUFrQjtRQUN4QixRQUFRLEVBQUUsS0FBSztRQUNmLFdBQVcsRUFBRSxtQ0FBbUM7S0FDakQsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDIn0=