const { Flags, Args } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const BranchManager = require('../services/branch-manager');
const ProjectManager = require('../services/project-manager');
const withCurrentProject = require('../services/with-current-project');
const askForEnvironment = require('../services/ask-for-environment');
class BranchCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer, branchesRenderer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
        this.branchesRenderer = branchesRenderer;
    }
    async listBranches(envSecret, format) {
        try {
            const branches = await BranchManager.getBranches(envSecret);
            if (!branches || branches.length === 0) {
                this.logger.warn("You don't have any branch yet. Use `servequery branch <branch_name>` to create one.");
            }
            else {
                this.branchesRenderer.render(branches, format);
            }
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
    async createBranch(branchName, environmentSecret, originName) {
        try {
            await BranchManager.createBranch(branchName, environmentSecret, originName);
            this.logger.success(`Switched to new branch: ${branchName}.`);
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
    async deleteBranch(branchName, forceDelete, envSecret) {
        if (!forceDelete) {
            const response = await this.inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: `Delete branch ${branchName}`,
                },
            ]);
            if (!response.confirm)
                return;
        }
        try {
            await BranchManager.deleteBranch(branchName, envSecret);
            this.logger.success(`Branch ${branchName} successfully deleted.`);
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
    async runAuthenticated() {
        const parsed = await this.parse(BranchCommand);
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        let config;
        try {
            config = await withCurrentProject({ ...this.env, ...commandOptions });
            if (!config.envSecret) {
                const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
                config.envSecret = environment.secretKey;
            }
            if (!config.origin && config.BRANCH_NAME && !config.delete) {
                config.origin = await askForEnvironment(config, 'Select the remote environment you want as origin', ['production', 'remote']);
            }
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
        if (config.BRANCH_NAME) {
            if (config.delete) {
                return this.deleteBranch(config.BRANCH_NAME, config.force, config.envSecret);
            }
            return this.createBranch(config.BRANCH_NAME, config.envSecret, config.origin);
        }
        return this.listBranches(config.envSecret, config.format);
    }
}
BranchCommand.aliases = ['branches'];
BranchCommand.description = 'Create a new branch or list your existing branches.';
BranchCommand.flags = {
    projectId: Flags.integer({
        description: 'The id of the project to create a branch in.',
    }),
    delete: Flags.boolean({
        char: 'd',
        description: 'Delete the branch.',
    }),
    force: Flags.boolean({
        description: 'When deleting a branch, skip confirmation.',
    }),
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
    format: Flags.string({
        char: 'format',
        description: 'Output format.',
        options: ['table', 'json'],
        default: 'table',
    }),
    origin: Flags.string({
        char: 'o',
        description: 'Set the origin of the created branch.',
    }),
};
BranchCommand.args = {
    BRANCH_NAME: Args.string({
        name: 'BRANCH_NAME',
        required: false,
        description: 'The name of the branch to create.',
    }),
};
module.exports = BranchCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2JyYW5jaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUMxRixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUM1RCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUM5RCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFFckUsTUFBTSxhQUFjLFNBQVEsNEJBQTRCO0lBQ3RELFlBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQzVCLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDeEUsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLE1BQU07UUFDbEMsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sYUFBYSxDQUFDLFdBQVcsQ0FB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