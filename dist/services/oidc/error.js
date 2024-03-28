"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openid_client_1 = __importDefault(require("openid-client"));
const application_error_1 = __importDefault(require("../../errors/application-error"));
class OidcError extends application_error_1.default {
    constructor(message, origin, possibleSolution) {
        let reason;
        if (origin instanceof openid_client_1.default.errors.OPError) {
            /** @public @readonly @type {string} */
            reason = origin.error || origin.message;
        }
        else if (origin) {
            reason = origin.message;
        }
        const parts = [
            reason ? `${message}: ${reason}.` : `${message}.`,
            possibleSolution ? `${possibleSolution}.` : '',
        ].filter(Boolean);
        super(parts.join(' '));
        this.name = 'OidcError';
        Error.captureStackTrace(this, OidcError);
    }
}
exports.default = OidcError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvb2lkYy9lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGtFQUF5QztBQUV6Qyx1RkFBOEQ7QUFFOUQsTUFBcUIsU0FBVSxTQUFRLDJCQUFnQjtJQUNyRCxZQUFZLE9BQWUsRUFBRSxNQUFjLEVBQUUsZ0JBQXlCO1FBQ3BFLElBQUksTUFBTSxDQUFDO1FBRVgsSUFBSSxNQUFNLFlBQVksdUJBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2pELHVDQUF1QztZQUN2QyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxNQUFNLEVBQUU7WUFDakIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUM7U0FDekI7UUFFRCxNQUFNLEtBQUssR0FBRztZQUNaLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLEtBQUssTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxHQUFHO1lBQ2pELGdCQUFnQixDQUFDLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7U0FDL0MsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV2QixJQUFJLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUN4QixLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQXJCRCw0QkFxQkMifQ==