export = IncompatibleLianaForUpdateError;
declare class IncompatibleLianaForUpdateError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(reason: any);
    name: string;
}
import ServequeryCLIError = require("../servequery-cli-error");
//# sourceMappingURL=incompatible-liana-for-update-error.d.ts.map