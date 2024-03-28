export = Logger;
declare class Logger {
    static _stringifyIfObject(message: any): any;
    static _setColor(color: any, message: any): any;
    static _setBoldColor(color: any, message: any): any;
    static _isObjectKeysMatchAlwaysTheGivenKeys(object: any): boolean;
    static _extractGivenOptionsFromMessages(messages: any): {
        messages: any;
        options: {};
    };
    constructor({ assertPresent, env, stderr, stdout }: {
        assertPresent: any;
        env: any;
        stderr: any;
        stdout: any;
    });
    env: any;
    stderr: any;
    stdout: any;
    silent: boolean;
    _logLine(message: any, options: any): void;
    _logLines(messagesWithPotentialGivenOptions: any, baseOptions: any): void;
    /**
     *  Allows to log one ore more messages, with option object as last optional parameter.
     *  @example logger.log('message')
     *  @example logger.log('message', { color: 'blue', colorLine: 'green' })
     *  @example logger.log('message 1', 'message 2')
     *  @example logger.log('message 1', 'message 2',  { color: 'blue', colorLine: 'green' })
     */
    log(...messagesAndOptions: any[]): void;
    error(...messagesAndOptions: any[]): void;
    info(...messagesAndOptions: any[]): void;
    success(...messagesAndOptions: any[]): void;
    warn(...messagesAndOptions: any[]): void;
}
//# sourceMappingURL=logger.d.ts.map