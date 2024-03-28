const { Flags } = require('@oclif/core');
const EnvironmentManager = require('../services/environment-manager');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const withCurrentProject = require('../services/with-current-project');
class EnvironmentCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, environmentsRenderer } = this.context;
        assertPresent({ env, environmentsRenderer });
        this.env = env;
        this.environmentsRenderer = environmentsRenderer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(EnvironmentCommand);
        const config = await withCurrentProject({ ...this.env, ...parsed.flags });
        const manager = new EnvironmentManager(config);
        const environments = await manager.listEnvironments();
        this.environmentsRenderer.render(environments, config);
    }
}
EnvironmentCommand.aliases = ['environments:list'];
EnvironmentCommand.description = 'Manage environments.';
EnvironmentCommand.flags = {
    projectId: Flags.integer({
        char: 'p',
        description: 'Servequery project ID.',
        default: null,
    }),
    format: Flags.string({
        char: 'format',
        description: 'Ouput format.',
        options: ['table', 'json'],
        default: 'table',
    }),
};
module.exports = EnvironmentCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2Vudmlyb25tZW50cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXpDLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsTUFBTSw0QkFBNEIsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUYsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLGtCQUFtQixTQUFRLDRCQUE0QjtJQUMzRCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDbEUsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztJQUNuRCxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNwRCxNQUFNLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQyxNQUFNLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3RELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3pELENBQUM7Q0FDRjtBQUVELGtCQUFrQixDQUFDLE9BQU8sR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFbkQsa0JBQWtCLENBQUMsV0FBVyxHQUFHLHNCQUFzQixDQUFDO0FBRXhELGtCQUFrQixDQUFDLEtBQUssR0FBRztJQUN6QixTQUFTLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN2QixJQUFJLEVBQUUsR0FBRztRQUNULFdBQVcsRUFBRSxvQkFBb0I7UUFDakMsT0FBTyxFQUFFLElBQUk7S0FDZCxDQUFDO0lBQ0YsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkIsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsZUFBZTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyJ9