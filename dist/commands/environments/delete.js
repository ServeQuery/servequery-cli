const { Flags, Args } = require('@oclif/core');
const EnvironmentManager = require('../../services/environment-manager');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
class DeleteCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, chalk, env, inquirer } = this.context;
        assertPresent({
            chalk,
            env,
            inquirer,
        });
        this.chalk = chalk;
        this.env = env;
        this.inquirer = inquirer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(DeleteCommand);
        const config = { ...this.env, ...parsed.flags, ...parsed.args };
        const manager = new EnvironmentManager(config);
        try {
            const environment = await manager.getEnvironment(config.environmentId);
            let answers;
            if (!config.force) {
                answers = await this.inquirer.prompt([
                    {
                        type: 'input',
                        prefix: 'Δ WARNING \t',
                        name: 'confirm',
                        message: `This will delete the environment ${this.chalk.red(environment.name)}.\nTo proceed, type ${this.chalk.red(environment.name)} or re-run this command with --force : `,
                    },
                ]);
            }
            if (!answers || answers.confirm === environment.name) {
                try {
                    await manager.deleteEnvironment(config.environmentId);
                    this.logger.log(`Environment ${this.chalk.red(environment.name)} successfully deleted.`);
                }
                catch (error) {
                    this.logger.error('Oops, something went wrong.');
                    this.exit(1);
                }
            }
            else {
                this.logger.error(`Confirmation did not match ${this.chalk.red(environment.name)}. Aborted.`);
                this.exit(1);
            }
        }
        catch (err) {
            if (err.status === 404) {
                this.logger.error(`Cannot find the environment ${this.chalk.bold(config.environmentId)}.`);
                this.exit(1);
            }
            else if (err.status === 403) {
                this.logger.error(`You do not have the rights to delete environment ${this.chalk.bold(config.environmentId)}.`);
                this.exit(1);
            }
            else {
                throw err;
            }
        }
    }
}
DeleteCommand.description = 'Delete an environment.';
DeleteCommand.flags = {
    force: Flags.boolean({
        char: 'force',
        description: 'Force delete.',
    }),
};
DeleteCommand.args = {
    environmentId: Args.string({
        name: 'environmentId',
        required: true,
        description: 'ID of an environment.',
    }),
};
module.exports = DeleteCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL2Vudmlyb25tZW50cy9kZWxldGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDL0MsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUN6RSxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU3RixNQUFNLGFBQWMsU0FBUSw0QkFBNEI7SUFDdEQsWUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0QsYUFBYSxDQUFDO1lBQ1osS0FBSztZQUNMLEdBQUc7WUFDSCxRQUFRO1NBQ1QsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDL0MsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2hFLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQWtC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