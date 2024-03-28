export = ErrorHandler;
declare class ErrorHandler {
    /**
     * @param {import('../context/plan').Context} context
     */
    constructor({ assertPresent, chalk, messages, terminator }: any);
    /** @private @readonly */
    private readonly terminator;
    /** @private @readonly */
    private readonly chalk;
    /** @private @readonly */
    private readonly messages;
    /**
     * @private
     * @param {ServequeryCLIError} error
     * @returns {string[]}
     */
    private getMessages;
    /**
     * @param {Error} error
     */
    handle(error: Error): Promise<void>;
}
//# sourceMappingURL=error-handler.d.ts.map