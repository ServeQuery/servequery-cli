"use strict";
// Note that we're using inject() in the functions because we can't create an injectable class...
// Doing so prevents us from using optionsToArgs() and optionsToFlags() at startup
Object.defineProperty(exports, "__esModule", { value: true });
exports.optionsToFlags = exports.getCommandLineOptions = exports.getInteractiveOptions = void 0;
const context_1 = require("@servequery/context");
const core_1 = require("@oclif/core");
function optionToInquirer(name, option) {
    const { os } = (0, context_1.inject)(); // eslint-disable-line @typescript-eslint/no-explicit-any
    // Use rawlist on windows because of https://github.com/SBoudrias/Inquirer.js/issues/303
    const listType = /^win/.test(os.platform()) ? 'rawlist' : 'list';
    const inputType = name.match(/(password|secret)/i) ? 'password' : 'input';
    let type = option.choices ? listType : inputType;
    if (option.type === 'boolean')
        type = 'confirm';
    const result = { name, type, message: option.prompter.question };
    if (option.prompter.description)
        result.description = option.prompter.description;
    if (option.choices)
        result.choices = option.choices;
    if (option.validate)
        result.validate = option.validate;
    if (option.default !== undefined)
        result.default = option.default;
    if (option.when)
        // Make sure that the first question when() is evaluated after one tick (see hack below)
        result.when = async (args) => {
            await new Promise(resolve => setTimeout(resolve, 0));
            return option.when(args);
        };
    return result;
}
/** Query options interactively */
async function getInteractiveOptions(options, values = {}) {
    const { inquirer } = (0, context_1.inject)(); // eslint-disable-line @typescript-eslint/no-explicit-any
    const questions = Object.entries(options)
        .filter(([name, option]) => option.prompter && // Has a prompter
        values[name] === undefined && // Not already set
        (option.exclusive ?? []).every(e => values[e] === undefined))
        .map(([name, option]) => optionToInquirer(name, option));
    const promise = inquirer.prompt(questions);
    // Passing answers we already have to inquirer is not supported in the legacy version we use
    // To work around this, we inject them in the inquirer ui object that is conveniently accessible
    // from the promise.
    // To fix this, we should upgrade to a newer version of inquirer.
    // Note that the if condition is always true, but not having it breaks the tests which are all
    // based on an inquirer.mock that returns a value (instead of a promise).
    if (promise?.ui?.answers)
        Object.assign(promise.ui.answers, values);
    return promise;
}
exports.getInteractiveOptions = getInteractiveOptions;
/** Get options that were passed in the command line */
async function getCommandLineOptions(instance) {
    const { options } = instance.constructor;
    // Parse the command line arguments and flags.
    // @ts-expect-error: calling the argument parser from oclif is protected.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { args, flags } = (await instance.parse(instance.constructor));
    const optionsFromCli = { ...args, ...flags };
    Object.entries(options).forEach(([k, v]) => {
        // Replace choices with their value
        const choice = v.choices?.find(c => c.name === optionsFromCli[k]);
        if (choice)
            optionsFromCli[k] = choice.value;
        // Validate
        const error = optionsFromCli[k] !== undefined && v.validate?.(optionsFromCli[k]);
        if (typeof error === 'string')
            throw new Error(`Invalid value for ${k}: ${error}`);
    });
    // Query missing options interactively
    const optionsFromPrompt = await getInteractiveOptions(options, optionsFromCli);
    return { ...optionsFromCli, ...optionsFromPrompt };
}
exports.getCommandLineOptions = getCommandLineOptions;
/** Convert generic options to oclif flags */
function optionsToFlags(options) {
    // Not using Object.fromEntries() for compatibility with node 10
    const result = {};
    Object.entries(options).forEach(([key, value]) => {
        const constructor = value.type === 'boolean' ? core_1.Flags.boolean : core_1.Flags.string;
        const flag = {
            char: value.oclif?.char,
            description: value.oclif.description,
            exclusive: value.exclusive,
            required: false,
            options: value.choices?.map(c => c.name),
        };
        result[key] = constructor(flag);
    });
    return result;
}
exports.optionsToFlags = optionsToFlags;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9uLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9vcHRpb24tcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxpR0FBaUc7QUFDakcsa0ZBQWtGOzs7QUFJbEYsa0RBQThDO0FBQzlDLHNDQUE4QztBQWdCOUMsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFZLEVBQUUsTUFBOEI7SUFDcEUsTUFBTSxFQUFFLEVBQUUsRUFBRSxHQUFHLElBQUEsZ0JBQU0sR0FBUyxDQUFDLENBQUMseURBQXlEO0lBRXpGLHdGQUF3RjtJQUN4RixNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUNqRSxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBQzFFLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ2pELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTO1FBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztJQUVoRCxNQUFNLE1BQU0sR0FBNEIsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzFGLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxXQUFXO1FBQUUsTUFBTSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztJQUNsRixJQUFJLE1BQU0sQ0FBQyxPQUFPO1FBQUUsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFD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