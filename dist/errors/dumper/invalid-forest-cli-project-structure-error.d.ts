export = InvalidServequeryCLIProjectStructureError;
declare class InvalidServequeryCLIProjectStructureError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(path: any, reason: any);
    name: string;
}
import ServequeryCLIError = require("../servequery-cli-error");
//# sourceMappingURL=invalid-servequery-cli-project-structure-error.d.ts.map