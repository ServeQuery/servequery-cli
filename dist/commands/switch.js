const { Flags, Args } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const BranchManager = require('../services/branch-manager');
const ProjectManager = require('../services/project-manager');
const withCurrentProject = require('../services/with-current-project');
class SwitchCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
    }
    async selectBranch(branches) {
        try {
            const { branch } = await this.inquirer.prompt([
                {
                    name: 'branch',
                    message: 'Select the branch you want to set current',
                    type: 'list',
                    choices: [
                        // NOTICE: Current branch should be last displayed branch.
                        ...branches.filter(currentBranch => !currentBranch.isCurrent),
                        ...branches.filter(currentBranch => currentBranch.isCurrent),
                    ].map(currentBranch => currentBranch.name),
                },
            ]);
            return branch;
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            return null;
        }
    }
    async switchTo(selectedBranch, environmentSecret) {
        try {
            await BranchManager.switchBranch(selectedBranch, environmentSecret);
            this.logger.success(`Switched to branch: ${selectedBranch.name}.`);
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
    async getConfig() {
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const parsed = await this.parse(SwitchCommand);
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        const config = await withCurrentProject({ ...this.env, ...commandOptions });
        if (!config.envSecret) {
            const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
            config.envSecret = environment.secretKey;
        }
        return config;
    }
    async runAuthenticated() {
        try {
            const config = await this.getConfig();
            const branches = (await BranchManager.getBranches(config.envSecret)) || [];
            if (branches.length === 0) {
                this.logger.warn("You don't have any branch to set as current. Use `servequery branch <branch_name>` to create one.");
                return;
            }
            const selectedBranchName = config.BRANCH_NAME || (await this.selectBranch(branches));
            if (!selectedBranchName) {
                this.exit(2);
            }
            const selectedBranch = branches.find(branch => branch.name === selectedBranchName);
            const currentBranch = branches.find(branch => branch.isCurrent);
            if (selectedBranch === undefined) {
                throw new Error('Branch does not exist.');
            }
            if (currentBranch && currentBranch.name === selectedBranchName) {
                this.logger.info(`${selectedBranchName} is already your current branch.`);
            }
            else {
                await this.switchTo(selectedBranch, config.envSecret);
            }
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
}
SwitchCommand.aliases = ['branches:switch'];
SwitchCommand.description = 'Switch to another branch in your local development environment.';
SwitchCommand.flags = {
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
};
SwitchCommand.args = {
    BRANCH_NAME: Args.string({
        name: 'BRANCH_NAME',
        required: false,
        description: 'The name of the local branch to set as current.',
    }),
};
SwitchCommand.aliases = ['branch:switch'];
module.exports = SwitchCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL3N3aXRjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUMxRixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUM1RCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUM5RCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sYUFBYyxTQUFRLDRCQUE0QjtJQUN0RCxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RELGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUTtRQUN6QixJQUFJO1lBQ0YsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzVDO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLE9BQU8sRUFBRSwyQ0FBMkM7b0JBQ3BELElBQUksRUFBRSxNQUFNO29CQUNaLE9BQU8sRUFBRTt3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