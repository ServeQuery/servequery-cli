const UnableToCreateApplicationTokenError = require('../errors/application-token/unable-to-create-application-token-error');
class ApplicationTokenService {
    /**
     * @param {import("../context/plan").Context} context
     */
    constructor({ api, os }) {
        /** @private @readonly */
        this.api = api;
        /** @private @readonly */
        this.os = os;
        ['api', 'os'].forEach(name => {
            if (!this[name])
                throw new Error(`Missing dependency ${name}`);
        });
    }
    /**
     * @param {string} sessionToken
     * @returns {Promise<string>}
     */
    async generateApplicationToken(sessionToken) {
        const hostname = this.os.hostname();
        const inputToken = {
            name: `servequery-cli @${hostname}`,
        };
        try {
            const applicationToken = await this.api.createApplicationToken(inputToken, sessionToken);
            return applicationToken.token;
        }
        catch (e) {
            throw new UnableToCreateApplicationTokenError({ reason: e.message });
        }
    }
    /**
     * @param {string} sessionToken
     * @returns {Promise<void>}
     */
    async deleteApplicationToken(sessionToken) {
        try {
            await this.api.deleteApplicationToken(sessionToken);
        }
        catch (error) {
            if (error.status === 404) {
                return undefined;
            }
            throw error;
        }
        return undefined;
    }
}
module.exports = ApplicationTokenService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tdG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYXBwbGljYXRpb24tdG9rZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxtQ0FBbUMsR0FBRyxPQUFPLENBQUMsc0VBQXNFLENBQUMsQ0FBQztBQUU1SCxNQUFNLHVCQUF1QjtJQUMzQjs7T0FFRztJQUNILFlBQVksRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO1FBQ3JCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUViLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztnQkFBRSxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxZQUFZO1FBQ3pDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsTUFBTSxVQUFVLEdBQUc7WUFDakIsSUFBSSxFQUFFLGVBQWUsUUFBUSxFQUFFO1NBQ2hDLENBQUM7UUFFRixJQUFJO1lBQ0YsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBRXpGLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1NBQy9CO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixNQUFNLElBQUksbUNBQW1DLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDdEU7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFlBQVk7UUFDdkMsSUFBSTtZQUNGLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNyRDtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLEdBQUcsRUFBRTtnQkFDeEIsT0FBTyxTQUFTLENBQUM7YUFDbEI7WUFFRCxNQUFNLEtBQUssQ0FBQztTQUNiO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyx1QkFBdUIsQ0FBQyJ9