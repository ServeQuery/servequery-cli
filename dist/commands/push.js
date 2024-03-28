const { Flags } = require('@oclif/core');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
const BranchManager = require('../services/branch-manager');
const ProjectManager = require('../services/project-manager');
const withCurrentProject = require('../services/with-current-project');
class PushCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, inquirer } = this.context;
        assertPresent({ env, inquirer });
        this.env = env;
        this.inquirer = inquirer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(PushCommand);
        const envSecret = this.env.SERVEQUERY_ENV_SECRET;
        const commandOptions = { ...parsed.flags, ...parsed.args, envSecret };
        let config;
        try {
            config = await withCurrentProject({ ...this.env, ...commandOptions });
            if (!config.envSecret) {
                const environment = await new ProjectManager(config).getDevelopmentEnvironmentForUser(config.projectId);
                config.envSecret = environment.secretKey;
            }
            const branches = await BranchManager.getBranches(config.envSecret);
            const currentBranch = branches.find(branch => branch.isCurrent);
            if (!currentBranch) {
                throw new Error('No current branch.');
            }
            if (!config.force) {
                const response = await this.inquirer.prompt([
                    {
                        type: 'confirm',
                        name: 'confirm',
                        message: `Push branch ${currentBranch.name} onto ${currentBranch.originEnvironment ? currentBranch.originEnvironment.name : 'its origin'}`,
                    },
                ]);
                if (!response.confirm)
                    return;
            }
            await BranchManager.pushBranch(config.envSecret);
            this.logger.success(`Branch ${currentBranch.name} successfully pushed onto ${currentBranch.originEnvironment.name}.`);
        }
        catch (error) {
            const customError = await BranchManager.handleBranchError(error);
            this.logger.error(customError);
            this.exit(2);
        }
    }
}
PushCommand.aliases = ['branches:push'];
PushCommand.description = 'Push layout changes of your current branch to the branch origin.';
PushCommand.flags = {
    force: Flags.boolean({
        description: 'Skip push changes confirmation.',
    }),
    help: Flags.boolean({
        description: 'Display usage information.',
    }),
    projectId: Flags.integer({
        char: 'p',
        description: 'The id of the project to work on.',
        default: null,
    }),
};
module.exports = PushCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy9wdXNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsTUFBTSw0QkFBNEIsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDMUYsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7QUFDNUQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDOUQsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLFdBQVksU0FBUSw0QkFBNEI7SUFDcEQsWUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0RCxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCO1FBQ3BCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM3QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO1FBQzdDLE1BQU0sY0FBYyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksRUFB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