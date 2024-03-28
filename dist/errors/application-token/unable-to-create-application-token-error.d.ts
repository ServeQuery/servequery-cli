export = UnableToCreateApplicationTokenError;
declare class UnableToCreateApplicationTokenError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(options?: {
        reason?: string;
        possibleSolution?: string;
    });
    name: string;
}
import ServequeryCLIError = require("../servequery-cli-error");
//# sourceMappingURL=unable-to-create-application-token-error.d.ts.map