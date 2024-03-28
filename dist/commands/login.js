const { Flags } = require('@oclif/core');
const AbstractCommand = require('../abstract-command').default;
class LoginCommand extends AbstractCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, authenticator } = this.context;
        assertPresent({ authenticator });
        this.authenticator = authenticator;
    }
    async run() {
        const { flags: config } = await this.parse(LoginCommand);
        await this.authenticator.tryLogin(config);
    }
}
LoginCommand.description = 'Sign in with an existing account.';
LoginCommand.flags = {
    email: Flags.string({
        char: 'e',
        description: 'Your Serve Query account email.',
    }),
    password: Flags.string({
        char: 'P',
        description: 'Your Serve Query account password (ignored if token is set).',
    }),
    token: Flags.string({
        char: 't',
        description: 'Your Serve Query account token (replaces password).',
    }),
};
module.exports = LoginCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvbG9naW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFL0QsTUFBTSxZQUFhLFNBQVEsZUFBZTtJQUN4QyxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEQsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN6RCxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FDRjtBQUVELFlBQVksQ0FBQyxXQUFXLEdBQUcsbUNBQW1DLENBQUM7QUFFL0QsWUFBWSxDQUFDLEtBQUssR0FBRztJQUNuQixLQUFLLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNsQixJQUFJLEVBQUUsR0FBRztRQUNULFdBQVcsRUFBRSxrQ0FBa0M7S0FDaEQsQ0FBQztJQUNGLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1FBQ3JCLElBQUksRUFBRSxHQUFHO1FBQ1QsV0FBVyxFQUFFLCtEQUErRDtLQUM3RSxDQUFDO0lBQ0YsS0FBSyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbEIsSUFBSSxFQUFFLEdBQUc7UUFDVCxXQUFXLEVBQUUsc0RBQXNEO0tBQ3BFLENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMifQ==