const AbstractCommand = require('../abstract-command').default;
class UserCommand extends AbstractCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, authenticator, chalk, jwtDecode, logger, terminator } = this.context;
        assertPresent({
            authenticator,
            chalk,
            jwtDecode,
            logger,
            terminator,
        });
        this.authenticator = authenticator;
        this.chalk = chalk;
        this.jwtDecode = jwtDecode;
        this.logger = logger;
        this.terminator = terminator;
    }
    async run() {
        const token = this.authenticator.getAuthToken();
        if (token) {
            const decoded = this.jwtDecode(token);
            const { email } = decoded.data.data.attributes;
            this.logger.info(`${this.chalk.bold('Email:')} ${this.chalk.cyan(email)} (connected with${decoded.organizationId ? '' : 'out'} SSO)`);
        }
        else {
            return this.terminator.terminate(1, { logs: ['You are not logged.'] });
        }
        return Promise.resolve();
    }
}
UserCommand.description = 'Display the current logged in user.';
module.exports = UserCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21tYW5kcy91c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sZUFBZSxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUUvRCxNQUFNLFdBQVksU0FBUSxlQUFlO0lBQ3ZDLFlBQVksSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJO1FBQzVCLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDNUYsYUFBYSxDQUFDO1lBQ1osYUFBYTtZQUNiLEtBQUs7WUFDTCxTQUFTO1lBQ1QsTUFBTTtZQUNOLFVBQVU7U0FDWCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ2hELElBQUksS0FBSyxFQUFFO1lBQ1QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9DLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLG1CQUNwRCxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQ2hDLE9BQU8sQ0FDUixDQUFDO1NBQ0g7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDeEU7UUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUMzQixDQUFDO0NBQ0Y7QUFFRCxXQUFXLENBQUMsV0FBVyxHQUFHLHFDQUFxQyxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDIn0=