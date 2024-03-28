export = Spinner;
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
declare class Spinner {
    spinnies: any;
    currentSpinnerOptions: any;
    start(options: any): void;
    currentSpinnerUniqueKey: any;
    success(options?: any): void;
    fail(options?: any): void;
    pause(): void;
    pausedSpinnerOptions: any;
    continue(): void;
    isRunning(): boolean;
    attachToPromise(promise: any): any;
    stop(): void;
}
//# sourceMappingURL=spinner.d.ts.map