const { Flags, Args } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
class GetCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, chalk, env, environmentRenderer } = this.context;
        assertPresent({ chalk, env });
        this.chalk = chalk;
        this.env = env;
        this.environmentRenderer = environmentRenderer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(GetCommand);
        const config = { ...this.env, ...parsed.flags, ...parsed.args };
        const manager = new EnvironmentManager(config);
        try {
            const environment = await manager.getEnvironment(config.environmentId);
            this.environmentRenderer.render(environment, config);
        }
        catch (err) {
            this.logger.error(`Cannot find the environment ${this.chalk.bold(config.environmentId)}.`);
        }
    }
}
GetCommand.description = 'Get the configuration of an environment.';
GetCommand.flags = {
    format: Flags.string({
        char: 'format',
        description: 'Output format.',
        options: ['table', 'json'],
        default: 'table',
    }),
};
GetCommand.args = {
    environmentId: Args.string({
        name: 'environmentId',
        required: true,
        description: 'ID of an environment.',
    }),
};
module.exports = GetCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Vudmlyb25tZW50cy9nZXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0MsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN6RSxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU3RixNQUFNLFVBQVcsU0FBUSw0QkFBNEI7SUFDbkQsWUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN4RSxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztJQUNqRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0MsSUFBSTtZQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDdkUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDdEQ7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLCtCQUErQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzVGO0lBQ0gsQ0FBQztDQUNGO0FBRUQsVUFBVSxDQUFDLFdBQVcsR0FBRywwQ0FBMEMsQ0FBQztBQUVwRSxVQUFVLENBQUMsS0FBSyxHQUFHO0lBQ2pCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ25CLElBQUksRUFBRSxRQUFRO1FBQ2QsV0FBVyxFQUFFLGdCQUFnQjtRQUM3QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7Q0FDSCxDQUFDO0FBRUYsVUFBVSxDQUFDLElBQUksR0FBRztJQUNoQixhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN6QixJQUFJLEVBQUUsZUFBZTtRQUNyQixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFBRSx1QkFBdUI7S0FDckMsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyJ9