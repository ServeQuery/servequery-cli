"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_command_1 = __importDefault(require("./abstract-command"));
class AbstractAuthenticatedCommand extends abstract_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, authenticator } = this.context;
        assertPresent({ authenticator });
        this.authenticator = authenticator;
    }
    async run() {
        await this.checkAuthentication();
        try {
            await this.runAuthenticated();
        }
        catch (error) {
            await this.handleAuthenticationErrors(error);
        }
    }
    async checkAuthentication() {
        if (!this.authenticator.getAuthToken()) {
            this.logger.info('Login required.');
            await this.authenticator.tryLogin({});
            if (!this.authenticator.getAuthToken()) {
                this.exit(10);
            }
        }
    }
    // Authentication error handler.
    async handleAuthenticationErrors(error) {
        // NOTICE: Due to ip-whitelist, 404 will never be thrown for a project
        if (error.status === 403) {
            this.logger.error('You do not have the right to execute this action on this project');
            return this.exit(2);
        }
        if (error.status === 401) {
            await this.authenticator.logout();
            this.logger.error(`Please use '${this.chalk.bold('servequery login')}' to sign in to your Servequery account.`);
            return this.exit(10);
        }
        return super.catch(error);
    }
}
exports.default = AbstractAuthenticatedCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtYXV0aGVudGljYXRlZC1jb21tYW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Fic3RyYWN0LWF1dGhlbnRpY2F0ZWQtY29tbWFuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLDBFQUFpRDtBQUVqRCxNQUE4Qiw0QkFBNkIsU0FBUSwwQkFBZTtJQUdoRixZQUFZLElBQWMsRUFBRSxNQUFjLEVBQUUsSUFBSztRQUMvQyxLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUxQixNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEQsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztRQUVqQyxJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLEdBQUc7UUFDUCxNQUFNLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ2pDLElBQUk7WUFDRixNQUFNLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQy9CO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxNQUFNLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QztJQUNILENBQUM7SUFJTyxLQUFLLENBQUMsbUJBQW1CO1FBQy9CLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksRUFBRSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDcEMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNmO1NBQ0Y7SUFDSCxDQUFDO0lBRUQsZ0NBQWdDO0lBQ3hCLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxLQUFLO1FBQzVDLHNFQUFzRTtRQUN0RSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7WUFDdEYsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtZQUN4QixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ2YsZUFBZSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsc0NBQXNDLENBQ3JGLENBQUM7WUFDRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDdEI7UUFDRCxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGO0FBakRELCtDQWlEQyJ9