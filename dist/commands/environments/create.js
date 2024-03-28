const { Flags } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
const withCurrentProject = require('../../services/with-current-project');
class CreateCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, environmentRenderer } = this.context;
        assertPresent({ env, environmentRenderer });
        this.env = env;
        this.environmentRenderer = environmentRenderer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(CreateCommand);
        const config = await withCurrentProject({ ...this.env, ...parsed.flags });
        const manager = new EnvironmentManager(config);
        try {
            const environment = await manager.createEnvironment();
            this.environmentRenderer.render(environment, config);
        }
        catch (error) {
            if (error.response && error.status !== 403) {
                const errorData = JSON.parse(error.response.text);
                if (errorData &&
                    errorData.errors &&
                    errorData.errors.length &&
                    errorData.errors[0] &&
                    errorData.errors[0].detail) {
                    this.logger.error(errorData.errors[0].detail);
                    this.exit(1);
                }
            }
            throw error;
        }
    }
}
CreateCommand.description = 'Create a new environment.';
CreateCommand.flags = {
    projectId: Flags.integer({
        char: 'p',
        description: 'Servequery project ID.',
        default: null,
    }),
    name: Flags.string({
        char: 'n',
        description: 'Environment name.',
        required: true,
    }),
    url: Flags.string({
        char: 'u',
        description: 'Application URL.',
        required: true,
    }),
    format: Flags.string({
        char: 'format',
        description: 'Ouput format.',
        options: ['table', 'json'],
        default: 'table',
    }),
    disableRoles: Flags.boolean({
        description: 'Disable roles on new environment.',
        default: false,
    }),
};
module.exports = CreateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Vudmlyb25tZW50cy9jcmVhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3pFLE1BQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQzdGLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7QUFFMUUsTUFBTSxhQUFjLFNBQVEsNEJBQTRCO0lBQ3RELFlBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQzVCLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLG1CQUFtQixFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqRSxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBQ2pELENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxNQUFNLE1BQU0sR0FBRyxNQUFNLGtCQUFrQixDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDMUUsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUUvQyxJQUFJO1lBQ0YsTUFBTSxXQUFXLEdBQUcsTUFBTSxPQUFPLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztZQUN0RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztTQUN0RDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO2dCQUMxQyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2xELElBQ0UsU0FBUztvQkFDVCxTQUFTLENBQUMsTUFBTTtvQkFDaEIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNO29CQUN2QixTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFDbkIsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQzFCO29CQUNBLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQzlDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2Q7YUFDRjtZQUNELE1BQU0sS0FBSyxDQUFDO1NBQ2I7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxhQUFhLENBQUMsV0FBVyxHQUFHLDJCQUEyQixDQUFDO0FBRXhELGFBQWEsQ0FBQyxLQUFLLEdBQUc7SUFDcEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUM7UUFDdkIsSUFBSSxFQUFFLEdBQUc7UUFDVCxXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQztJQUNGLElBQUksRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ2pCLElBQUksRUFBRSxHQUFHO1FBQ1QsV0FBVyxFQUFFLG1CQUFtQjtRQUNoQyxRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7SUFDRixHQUFHLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNoQixJQUFJLEVBQUUsR0FBRztRQUNULFdBQVcsRUFBRSxrQkFBa0I7UUFDL0IsUUFBUSxFQUFFLElBQUk7S0FDZixDQUFDO0lBQ0YsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkIsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsZUFBZTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7SUFDRixZQUFZLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUMxQixXQUFXLEVBQUUsbUNBQW1DO1FBQ2hELE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQztDQUNILENBQUM7QUFFRixNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyJ9