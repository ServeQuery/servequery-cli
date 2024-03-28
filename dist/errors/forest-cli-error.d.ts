export = ServequeryCLIError;
declare class ServequeryCLIError extends Error {
    /**
     * @param {string} message
     * @param {any} [details]
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string;
     * }} [options]
     */
    constructor(message: string, details?: any, options?: {
        reason?: string;
        possibleSolution?: string;
    });
    /** @public @readonly */
    public readonly name: string;
    /** @public @readonly */
    public readonly userMessage: string;
    /** @public @readonly */
    public readonly details: any;
    /** @public @readonly */
    public readonly reason: string;
    /** @public @readonly */
    public readonly possibleSolution: string;
}
//# sourceMappingURL=servequery-cli-error.d.ts.map