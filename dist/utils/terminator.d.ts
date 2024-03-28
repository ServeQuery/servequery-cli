declare function _exports({ assertPresent, eventSender, exitProcess, logger }: {
    assertPresent: any;
    eventSender: any;
    exitProcess: any;
    logger: any;
}): {
    /**
     * @param {number} status
     * @param {DetailedLog | MultipleMessages | DetailedLog & MultipleMessages} log
     */
    terminate(status: number, { errorCode, errorMessage, logs, context }: DetailedLog | MultipleMessages | (DetailedLog & MultipleMessages)): Promise<any>;
};
export = _exports;
export type DetailedLog = {
    errorCode: string;
    errorMessage: string;
    context: any;
};
export type MultipleMessages = {
    logs: string[];
};
//# sourceMappingURL=terminator.d.ts.map