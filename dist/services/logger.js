const chalk = require('chalk');
const ALLOWED_OPTION_KEYS = ['color', 'prefix', 'std', 'lineColor'];
const DEFAULT_OPTION_VALUES = ALLOWED_OPTION_KEYS.reduce((options, key) => {
    options[key] = undefined;
    return options;
}, {});
class Logger {
    constructor({ assertPresent, env, stderr, stdout }) {
        assertPresent({ env, stderr, stdout });
        this.env = env;
        this.stderr = stderr;
        this.stdout = stdout;
        // FIXME: Silent was not used before as no "silent" value was in context.
        this.silent = !!this.env.SILENT && this.env.SILENT !== '0';
    }
    _logLine(message, options) {
        if (this.silent)
            return;
        options = {
            ...DEFAULT_OPTION_VALUES,
            ...options,
        };
        let actualPrefix = '';
        if ([undefined, null, ''].indexOf(options.prefix) === -1)
            actualPrefix = `${options.prefix} `;
        if (actualPrefix && options.color) {
            actualPrefix = Logger._setBoldColor(options.color, actualPrefix);
        }
        let actualMessage = Logger._stringifyIfObject(message);
        if (options.lineColor) {
            actualMessage = `${Logger._setColor(options.lineColor, actualMessage)}`;
        }
        actualMessage = `${actualPrefix}${actualMessage}\n`;
        if (options.std === 'err') {
            this.stderr.write(actualMessage);
        }
        else {
            this.stdout.write(actualMessage);
        }
    }
    _logLines(messagesWithPotentialGivenOptions, baseOptions) {
        const { options, messages } = Logger._extractGivenOptionsFromMessages(messagesWithPotentialGivenOptions);
        messages.forEach(message => this._logLine(message, { ...baseOptions, ...options }));
    }
    static _stringifyIfObject(message) {
        if (typeof message === 'object') {
            return JSON.stringify(message);
        }
        return message;
    }
    static _setColor(color, message) {
        return chalk[color](message);
    }
    static _setBoldColor(color, message) {
        return chalk.bold[color](message);
    }
    static _isObjectKeysMatchAlwaysTheGivenKeys(object) {
        if (typeof object !== 'object') {
            return false;
        }
        return Object.keys(object).every(key => ALLOWED_OPTION_KEYS.includes(key));
    }
    // This is a hack to keep the current signature of Logger methods.
    // Last `message` is considered an option object if its keys are in `ALLOWED_OPTION_KEYS`.
    static _extractGivenOptionsFromMessages(messages) {
        let options = {};
        const potentialGivenOptions = messages[messages.length - 1];
        const hasOptions = Logger._isObjectKeysMatchAlwaysTheGivenKeys(potentialGivenOptions);
        if (hasOptions) {
            messages = messages.slice(0, -1);
            options = { ...options, ...potentialGivenOptions };
        }
        return { messages, options };
    }
    /**
     *  Allows to log one ore more messages, with option object as last optional parameter.
     *  @example logger.log('message')
     *  @example logger.log('message', { color: 'blue', colorLine: 'green' })
     *  @example logger.log('message 1', 'message 2')
     *  @example logger.log('message 1', 'message 2',  { color: 'blue', colorLine: 'green' })
     */
    log(...messagesAndOptions) {
        this._logLines(messagesAndOptions);
    }
    error(...messagesAndOptions) {
        this._logLines(messagesAndOptions, { color: 'red', prefix: '×', std: 'err' });
    }
    info(...messagesAndOptions) {
        this._logLines(messagesAndOptions, { color: 'blue', prefix: '>' });
    }
    success(...messagesAndOptions) {
        this._logLines(messagesAndOptions, { color: 'green', prefix: '√' });
    }
    warn(...messagesAndOptions) {
        this._logLines(messagesAndOptions, { color: 'yellow', prefix: 'Δ' });
    }
}
if (process.env.NODE_ENV === 'test') {
    Logger.DEFAULT_OPTION_VALUES = DEFAULT_OPTION_VALUES;
}
module.exports = Logger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2xvZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFFL0IsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3BFLE1BQU0scUJBQXFCLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFO0lBQ3hFLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDekIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBRVAsTUFBTSxNQUFNO0lBQ1YsWUFBWSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRTtRQUNoRCxhQUFhLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUVyQix5RUFBeUU7UUFDekUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDO0lBQzdELENBQUM7SUFFRCxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU87UUFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTTtZQUFFLE9BQU87UUFFeEIsT0FBTyxHQUFHO1lBQ1IsR0FBRyxxQkFBcUI7WUFDeEIsR0FBRyxPQUFPO1NBQ1gsQ0FBQztRQUVGLElB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