const { v4: uuidv4 } = require('uuid');
const chalk = require('chalk');
const Spinnies = require('spinnies');
const spinniesConstructorParameters = {
    color: 'yellow',
    failPrefix: `${chalk.bold.red('×')}`,
    spinnerColor: 'yellow',
    spinner: {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    },
    succeedPrefix: `${chalk.bold.green('√')}`,
};
// NOTICE: Singleton used here to attach all generated spinner to the same spinnies instance.
let spinniesInstance;
function getSpinniesInstance() {
    if (!spinniesInstance)
        spinniesInstance = new Spinnies(spinniesConstructorParameters);
    return spinniesInstance;
}
/**
 * A single instance of spinner is intended to be used as follow:
 * @example
 * // synchronously:
 * spinner.start({ text: 'my super text' })
 * // do something
 * spinner.success()
 *
 * // on promise:
 * spinner.start({ text: 'my super text' })
 * spinner.attachToPromise(mySuperPromise())
 *
 * If ever multiple instances are need to be run together:
 * @example
 * const Spinner = require('./spinner');
 *
 * const spinner1 = new Spinner();
 * const spinner2 = new Spinner();
 */
class Spinner {
    constructor() {
        this.spinnies = getSpinniesInstance();
        this.currentSpinnerOptions = null;
    }
    start(options) {
        if (this.isRunning()) {
            throw Error('A spinner is already running.');
        }
        this.currentSpinnerOptions = options;
        this.currentSpinnerUniqueKey = uuidv4();
        this.spinnies.add(this.currentSpinnerUniqueKey, options);
    }
    // NOTICE: optional parameter options to have a custom success message
    success(options = this.currentSpinnerOptions) {
        if (!this.isRunning()) {
            throw Error('No spinner is running.');
        }
        this.spinnies.succeed(this.currentSpinnerUniqueKey, options);
        this.stop();
    }
    // NOTICE: optional parameter options to have a custom fail message
    fail(options = this.currentSpinnerOptions) {
        if (!this.isRunning()) {
            throw Error('No spinner is running.');
        }
        this.spinnies.fail(this.currentSpinnerUniqueKey, options);
        this.stop();
    }
    pause() {
        if (!this.isRunning()) {
            throw Error('No spinner is running.');
        }
        this.spinnies.remove(this.currentSpinnerUniqueKey);
        // NOTICE: spinnies lib function that checks for active spinners and if none, release cli usage
        this.spinnies.checkIfActiveSpinners();
        this.pausedSpinnerOptions = this.currentSpinnerOptions;
    }
    continue() {
        if (this.isRunning()) {
            throw Error('A spinner is already running.');
        }
        if (!this.pausedSpinnerOptions) {
            throw Error('No spinner has been paused.');
        }
        this.spinnies.add(this.currentSpinnerUniqueKey, this.pausedSpinnerOptions);
        this.pausedSpinnerOptions = null;
    }
    isRunning() {
        return !!this.spinnies.pick(this.currentSpinnerUniqueKey);
    }
    // NOTICE: spinner.start needs to be called first
    attachToPromise(promise) {
        return promise
            .then(result => {
            this.success(this.currentSpinnerOptions);
            return result;
        })
            .catch(error => {
            // NOTICE: Only trigger the fail if the spinner is running (ie. not paused)
            if (this.isRunning()) {
                this.fail({ text: error });
            }
            throw error;
        });
    }
    // NOTICE: this stop method should only be used internally to reset the current spinner
    //         on success or failure.
    stop() {
        this.currentSpinnerUniqueKey = null;
        this.currentSpinnerOptions = null;
    }
}
module.exports = Spinner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9zcGlubmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvQixNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFFckMsTUFBTSw2QkFBNkIsR0FBRztJQUNwQyxLQUFLLEVBQUUsUUFBUTtJQUNmLFVBQVUsRUFBRSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0lBQ3BDLFlBQVksRUFBRSxRQUFRO0lBQ3RCLE9BQU8sRUFBRTtRQUNQLFFBQVEsRUFBRSxFQUFFO1FBQ1osTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO0tBQzNEO0lBQ0QsYUFBYSxFQUFFLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7Q0FDMUMsQ0FBQztBQUVGLDZGQUE2RjtBQUM3RixJQUFJLGdCQUFnQixDQUFDO0FBQ3JCLFNBQVMsbUJBQW1CO0lBQzFCLElBQUksQ0FBQyxnQkFBZ0I7UUFBRSxnQkFBZ0IsR0FBRyxJQUFJLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ3RGLE9BQU8sZ0JBQWdCLENBQUM7QUFDMUIsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxNQUFNLE9BQU87SUFDWDtRQUNFLElBQUksQ0FBQyxRQUFRLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUN0QyxJQUFJ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