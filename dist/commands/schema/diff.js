const { Flags, Args } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
class DiffCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, chalk, env, environmentRenderer, errorHandler } = this.context;
        assertPresent({ chalk, env });
        this.chalk = chalk;
        this.env = env;
        this.environmentRenderer = environmentRenderer;
        this.errorHandler = errorHandler;
    }
    async runAuthenticated() {
        const parsed = await this.parse(DiffCommand);
        const config = { ...this.env, ...parsed.flags, ...parsed.args };
        const manager = new EnvironmentManager(config);
        const { environmentIdFrom, environmentIdTo } = config;
        try {
            const [apimapFrom, apimapTo] = await Promise.all([
                manager.getEnvironmentApimap(environmentIdFrom),
                manager.getEnvironmentApimap(environmentIdTo),
            ]);
            this.environmentRenderer.renderApimapDiff(apimapFrom, apimapTo);
        }
        catch (error) {
            this.logger.error(`Cannot fetch the environments ${this.chalk.bold(environmentIdFrom)} and ${this.chalk.bold(environmentIdTo)}.`);
            this.logger.error(manager.handleEnvironmentError(error));
        }
    }
}
DiffCommand.description = 'Allow to compare two environment schemas';
DiffCommand.flags = {
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
};
DiffCommand.args = {
    environmentIdFrom: Args.string({
        name: 'environmentIdFrom',
        required: true,
        description: 'ID of an environment to compare.',
    }),
    environmentIdTo: Args.string({
        name: 'environmentIdFrom',
        required: true,
        description: 'ID of an environment to compare.',
    }),
};
module.exports = DiffCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlmZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21tYW5kcy9zY2hlbWEvZGlmZi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRTdGLE1BQU0sV0FBWSxTQUFRLDRCQUE0QjtJQUNwRCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0RixhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztRQUMvQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztJQUNuQyxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFL0MsTUFBTSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sQ0FBQztRQUN0RCxJQUFJO1lBQ0YsTUFBTSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQy9DLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDL0MsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGVBQWUsQ0FBQzthQUM5QyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ2pFO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FDZixpQ0FBaUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDeEYsZUFBZSxDQUNoQixHQUFHLENBQ0wsQ0FBQztZQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzFEO0lBQ0gsQ0FBQztDQUNGO0FBRUQsV0FBVyxDQUFDLFdBQVcsR0FBRywwQ0FBMEMsQ0FBQztBQUVyRSxXQUFXLENBQUMsS0FBSyxHQUFHO0lBQ2xCLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQ2xCLFdBQVcsRUFBRSw0QkFBNEI7S0FDMUMsQ0FBQztDQUNILENBQUM7QUFFRixXQUFXLENBQUMsSUFBSSxHQUFHO0lBQ2pCLGlCQUFpQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixRQUFRLEVBQUUsSUFBSTtRQUNkLFdBQVcsRUFBRSxrQ0FBa0M7S0FDaEQsQ0FBQztJQUNGLGVBQWUsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQzNCLElBQUksRUFBRSxtQkFBbUI7UUFDekIsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQUUsa0NBQWtDO0tBQ2hELENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMifQ==