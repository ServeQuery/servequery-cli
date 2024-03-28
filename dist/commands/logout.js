const AbstractCommand = require('../abstract-command').default;
class LogoutCommand extends AbstractCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, authenticator } = this.context;
        assertPresent({ authenticator });
        this.authenticator = authenticator;
    }
    async run() {
        await this.authenticator.logout({ log: true });
    }
}
LogoutCommand.description = 'Sign out of your account.';
module.exports = LogoutCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nb3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbW1hbmRzL2xvZ291dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFFL0QsTUFBTSxhQUFjLFNBQVEsZUFBZTtJQUN6QyxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEQsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUNqQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDakQsQ0FBQztDQUNGO0FBRUQsYUFBYSxDQUFDLFdBQVcsR0FBRywyQkFBMkIsQ0FBQztBQUV4RCxNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyJ9