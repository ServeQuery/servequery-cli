"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = __importDefault(require("./error"));
class OidcAuthenticator {
    constructor({ assertPresent, openIdClient, env, process, open, logger, }) {
        assertPresent({
            openIdClient,
            env,
            process,
            open,
            logger,
        });
        this.openIdClient = openIdClient;
        this.env = env;
        this.process = process;
        this.open = open;
        this.logger = logger;
    }
    async register() {
        try {
            const issuer = await this.openIdClient.Issuer.discover(`${this.env.SERVEQUERY_SERVER_URL}/oidc/.well-known/openid-configuration`);
            return await issuer.Client.register({
                name: 'servequery-cli',
                application_type: 'native',
                redirect_uris: ['com.servequery.cli://authenticate'],
                token_endpoint_auth_method: 'none',
                grant_types: ['urn:ietf:params:oauth:grant-type:device_code'],
                response_types: ['none'],
            });
        }
        catch (e) {
            throw new error_1.default('Unable to register against the Serve Query server', e);
        }
    }
    static async launchDeviceAuthorization(client) {
        try {
            return await client.deviceAuthorization({
                scopes: ['openid', 'email', 'profile'],
            });
        }
        catch (e) {
            throw new error_1.default('Error while starting the authentication flow', e);
        }
    }
    async waitForAuthentication(flow) {
        const expiresIn = flow.expires_in;
        try {
            this.process.stdout.write(`Click on "Log in" on the browser tab which opened automatically or open this link: ${flow.verification_uri_complete}\n`);
            this.process.stdout.write(`Your confirmation code: ${flow.user_code}\n`);
            await this.tryOpen(flow.verification_uri_complete);
            return await flow.poll();
        }
        catch (e) {
            if (flow.expired()) {
                throw new error_1.default('The authentication request expired', undefined, `Please try to login a second time, and complete the authentication within ${expiresIn} seconds`);
            }
            throw new error_1.default('Error during the authentication', e);
        }
    }
    async tryOpen(url) {
        try {
            await this.open(url);
        }
        catch (e) {
            this.logger.log(this.logger.WARN, `Unable to open the browser: ${e.message}. Please open the link manually.`);
        }
    }
    async authenticate() {
        const client = await this.register();
        const flow = await OidcAuthenticator.launchDeviceAuthorization(client);
        const tokenSet = await this.waitForAuthentication(flow);
        return tokenSet.access_token;
    }
}
exports.default = OidcAuthenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9vaWRjL2F1dGhlbnRpY2F0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxvREFBZ0M7QUFFaEMsTUFBcUIsaUJBQWlCO0lBV3BDLFlBQVksRUFDVixhQUFhLEVBQ2IsWUFBWSxFQUNaLEdBQUcsRUFDSCxPQUFPLEVBQ1AsSUFBSSxFQUNKLE1BQU0sR0FRUDtRQUNDLGFBQWEsQ0FBQztZQUNaLFlBQVk7WUFDWixHQUFHO1lBQ0gsT0FBTztZQUNQLElBQUk7WUFDSixNQUFNO1NBQ1AsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU8sS0FBSyxDQUFDLFFBQVE7UUFDcEIsSUFBSTtZQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFnQyxDQUFDLFFBQVEsQ0FDL0UsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGlCQUFpQix3Q0FBd0MsQ0FDdEUsQ0FBQztZQUVGLE9BQU8sTUFBTyxNQUFNLENBQUMsTUFBbUMsQ0FBQyxRQUFRLENBQUM7Z0JBQ2hFLElBQUksRUFBRSxZQUFZO2dCQUNsQixnQkFBZ0IsRUFBRSxRQUFRO2dCQUMxQixhQUFhLEVBQUUsQ0FBQyxvQ0FBb0MsQ0FBQztnQkFDckQsMEJBQTBCLEVBQUUsTUFBTTtnQkFDbEMsV0FBVyxFQUFFLENBQUMsOENBQThDLENBQUM7Z0JBQzdELGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUN6QixDQUFDLENBQUM7U0FDSjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsTUFBTSxJQUFJLGVBQVMsQ0FBQyxvREFBb0QsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUM5RTtJQUNILENBQUM7SUFFTyxNQUFNLENBQUMsS0FBSyxDQUFDLHlCQUF5QixDQUFDLE1BQWM7UUFDM0QsSUFBSTtZQUNGLE9BQU8sTUFBTSxNQUFNLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3RDLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDO2FBQ3ZDLENBQUMsQ0FBQztTQUNKO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUksZUFBUyxDQUFDLDhDQUE4QyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxJQUE4QjtRQUNoRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBQ2xDLElBQUk7WUFDRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQ3ZCLHNGQUFzRixJQUFJLENBQUMseUJBQXlCLElBQUksQ0FDekgsQ0FBQztZQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7WUFFekUsTUFBTSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBRW5ELE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDMUI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNsQixNQUFNLElBQUksZUFBUyxDQUNqQixvQ0FBb0MsRUFDcEMsU0FBUyxFQUNULDZFQUE2RSxTQUFTLFVBQVUsQ0FDakcsQ0FBQzthQUNIO1lBRUQsTUFBTSxJQUFJLGVBQVMsQ0FBQyxpQ0FBaUMsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzRDtJQUNILENBQUM7SUFFTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQVc7UUFDL0IsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0QjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQ2IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQ2hCLCtCQUErQixDQUFDLENBQUMsT0FBTyxrQ0FBa0MsQ0FDM0UsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVNLEtBQUssQ0FBQyxZQUFZO1FBQ3ZCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRXJDLE1BQU0sSUFBSSxHQUFHLE1BQU0saUJBQWlCLENBQUMseUJBQXlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFeEQsT0FBTyxRQUFRLENBQUMsWUFBWSxDQUFDO0lBQy9CLENBQUM7Q0FDRjtBQWxIRCxvQ0FrSEMifQ==