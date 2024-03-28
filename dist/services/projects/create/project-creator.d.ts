export = ProjectCreator;
/**
 * @typedef {{
 *  agent: string;
 *  dbDialect: string;
 *  architecture: string;
 *  isLocal: boolean;
 * }} ProjectMeta
 *
 * @typedef {{
 *  appName: string
 *  appHostname: string
 *  appPort: number
 * }} ProjectConfig
 */
declare class ProjectCreator {
    /**
     * @param {{
     *   api: import('../../api')
     *   chalk: import('chalk')
     *   keyGenerator: import('../../../utils/key-generator')
     *   messages: import('../../../utils/messages')
     *   terminator: import('../../../utils/terminator')
     * }} dependencies
     */
    constructor({ assertPresent, api, chalk, keyGenerator, messages, terminator }: {
        api: import('../../api');
        chalk: import("chalk").Chalk & import("chalk").ChalkFunction & {
            supportsColor: false | import("chalk").ColorSupport;
            Level: import("chalk").Level;
            Color: ("red" | "blue" | "green" | "yellow" | "black" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright") | ("bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright");
            ForegroundColor: "red" | "blue" | "green" | "yellow" | "black" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
            BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
            Modifiers: "hidden" | "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "strikethrough" | "visible";
            stderr: import("chalk").Chalk & {
                supportsColor: false | import("chalk").ColorSupport;
            };
        };
        keyGenerator: import('../../../utils/key-generator');
        messages: {
            ERROR_UNEXPECTED: string;
            ERROR_MISSING_PROJECT_NAME: string;
            HINT_MISSING_PROJECT_NAME: string;
            ERROR_NOT_PARSABLE_CONNECTION_URL: string;
            HINT_DIRECTORY_ALREADY_EXISTS: string;
        };
        terminator: ({ assertPresent, eventSender, exitProcess, logger }: {
            assertPresent: any;
            eventSender: any;
            exitProcess: any;
            logger: any;
        }) => {
            terminate(status: number, { errorCode, errorMessage, logs, context }: import("../../../utils/terminator").DetailedLog | import("../../../utils/terminator").MultipleMessages | (import("../../../utils/terminator").DetailedLog & import("../../../utils/terminator").MultipleMessages)): Promise<any>;
        };
    });
    api: import("../../api");
    chalk: import("chalk").Chalk & import("chalk").ChalkFunction & {
        supportsColor: false | import("chalk").ColorSupport;
        Level: import("chalk").Level;
        Color: ("red" | "blue" | "green" | "yellow" | "black" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright") | ("bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright");
        ForegroundColor: "red" | "blue" | "green" | "yellow" | "black" | "magenta" | "cyan" | "white" | "gray" | "grey" | "blackBright" | "redBright" | "greenBright" | "yellowBright" | "blueBright" | "magentaBright" | "cyanBright" | "whiteBright";
        BackgroundColor: "bgBlack" | "bgRed" | "bgGreen" | "bgYellow" | "bgBlue" | "bgMagenta" | "bgCyan" | "bgWhite" | "bgGray" | "bgGrey" | "bgBlackBright" | "bgRedBright" | "bgGreenBright" | "bgYellowBright" | "bgBlueBright" | "bgMagentaBright" | "bgCyanBright" | "bgWhiteBright";
        Modifiers: "hidden" | "reset" | "bold" | "dim" | "italic" | "underline" | "inverse" | "strikethrough" | "visible";
        stderr: import("chalk").Chalk & {
            supportsColor: false | import("chalk").ColorSupport;
        };
    };
    keyGenerator: import("../../../utils/key-generator");
    messages: {
        ERROR_UNEXPECTED: string;
        ERROR_MISSING_PROJECT_NAME: string;
        HINT_MISSING_PROJECT_NAME: string;
        ERROR_NOT_PARSABLE_CONNECTION_URL: string;
        HINT_DIRECTORY_ALREADY_EXISTS: string;
    };
    terminator: ({ assertPresent, eventSender, exitProcess, logger }: {
        assertPresent: any;
        eventSender: any;
        exitProcess: any;
        logger: any;
    }) => {
        terminate(status: number, { errorCode, errorMessage, logs, context }: import("../../../utils/terminator").DetailedLog | import("../../../utils/terminator").MultipleMessages | (import("../../../utils/terminator").DetailedLog & import("../../../utils/terminator").MultipleMessages)): Promise<any>;
    };
    /**
     * @param {string} sessionToken
     * @param {{
     *
     * }} config
     * @param {ProjectMeta} meta
     * @returns {Promise<{id: number, envSecret: string, authSecret: string}>}
     */
    create(sessionToken: string, config: any, meta: ProjectMeta): Promise<{
        id: number;
        envSecret: string;
        authSecret: string;
    }>;
}
declare namespace ProjectCreator {
    export { ProjectMeta, ProjectConfig };
}
type ProjectMeta = {
    agent: string;
    dbDialect: string;
    architecture: string;
    isLocal: boolean;
};
type ProjectConfig = {
    appName: string;
    appHostname: string;
    appPort: number;
};
//# sourceMappingURL=project-creator.d.ts.map