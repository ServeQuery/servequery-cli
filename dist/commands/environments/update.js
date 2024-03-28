const { Flags } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
class UpdateCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env } = this.context;
        assertPresent({ env });
        this.env = env;
    }
    async runAuthenticated() {
        const parsed = await this.parse(UpdateCommand);
        const config = { ...this.env, ...parsed.flags };
        if (config.name || config.url) {
            const manager = new EnvironmentManager(config);
            await manager.updateEnvironment();
            this.logger.info('Environment updated.');
        }
        else {
            this.logger.error('Please provide environment name and/or url');
        }
    }
}
UpdateCommand.description = 'Update an environment.';
UpdateCommand.flags = {
    environmentId: Flags.integer({
        char: 'e',
        description: 'The servequery environment ID to update.',
        required: true,
    }),
    name: Flags.string({
        char: 'n',
        description: 'To update the environment name.',
        required: false,
    }),
    url: Flags.string({
        char: 'u',
        description: 'To update the application URL.',
        required: false,
    }),
};
module.exports = UpdateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Vudmlyb25tZW50cy91cGRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBRTdGLE1BQU0sYUFBYyxTQUFRLDRCQUE0QjtJQUN0RCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUMsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFaEQsSUFBSSxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDN0IsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMvQyxNQUFNLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDMUM7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7U0FDakU7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxhQUFhLENBQUMsV0FBVyxHQUFHLHdCQUF3QixDQUFDO0FBRXJELGFBQWEsQ0FBQyxLQUFLLEdBQUc7SUFDcEIsYUFBYSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDM0IsSUFBSSxFQUFFLEdBQUc7UUFDVCxXQUFXLEVBQUUsc0NBQXNDO1FBQ25ELFFBQVEsRUFBRSxJQUFJO0tBQ2YsQ0FBQztJQUNGLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2pCLElBQUksRUFBRSxHQUFHO1FBQ1QsV0FBVyxFQUFFLGlDQUFpQztRQUM5QyxRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDO0lBQ0YsR0FBRyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDaEIsSUFBSSxFQUFFLEdBQUc7UUFDVCxXQUFXLEVBQUUsZ0NBQWdDO1FBQzdDLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMifQ==