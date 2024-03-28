const { Flags } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const EnvironmentManager = require('../services/environment-manager');
const ProjectManager = require('../services/project-manager');
const { handleBranchError } = require('../services/branch-manager');
const withCurrentProject = require('../services/with-current-project');
/** Deploy layout changes of an environment to the reference one. */
class DeployCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
    }
    /**
     * Get command configuration (merge env configuration with command context).
     * @returns {Object} The command configuration, including its envSecret correctly set.
     */
    async getConfig() {
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const parsed = await this.parse(DeployCommand);
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        const config = await withCurrentProject({ ...this.env, ...commandOptions });
        if (!config.envSecret) {
            const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
            config.envSecret = environment.secretKey;
        }
        return config;
    }
    /**
     * Ask for confirmation before deploying layout changes.
     * @param {Object} environment - The environment containing the layout changes to deploy.
     * @returns {Boolean} Return true if user has confirmed.
     */
    async confirm() {
        const response = await this.inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirm',
                message: 'Deploy layout changes to reference?',
            },
        ]);
        return response.confirm;
    }
    /**
     * The "deploy" command procedure itself.
     * @returns {void}
     */
    async runAuthenticated() {
        try {
            const config = await this.getConfig();
            if (!config.force && !(await this.confirm()))
                return;
            await new EnvironmentManager(config).deploy();
            this.logger.success('Deployed layout changes to reference environment.');
        }
        catch (error) {
            this.logger.error(await handleBranchError(error));
            this.exit(2);
        }
    }
}
DeployCommand.aliases = ['environments:deploy'];
DeployCommand.description = 'Deploy layout changes of the current branch to the reference one.';
DeployCommand.flags = {
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
    force: Flags.boolean({
        char: 'f',
        description: 'Skip deploy confirmation.',
    }),
    projectId: Flags.integer({
        char: 'p',
        description: 'The id of the project you want to deploy.',
        default: null,
    }),
};
module.exports = DeployCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2RlcGxveS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sNEJBQTRCLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQzFGLE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDOUQsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDcEUsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxvRUFBb0U7QUFDcEUsTUFBTSxhQUFjLFNBQVEsNEJBQTRCO0lBQ3RELFlBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQzVCLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEQsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLFNBQVM7UUFDYixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBQzdDLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxh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