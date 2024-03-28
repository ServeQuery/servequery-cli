export = DeployCommand;
/** Deploy layout changes of an environment to the reference one. */
declare class DeployCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
    /**
     * Get command configuration (merge env configuration with command context).
     * @returns {Object} The command configuration, including its envSecret correctly set.
     */
    getConfig(): any;
    /**
     * Ask for confirmation before deploying layout changes.
     * @param {Object} environment - The environment containing the layout changes to deploy.
     * @returns {Boolean} Return true if user has confirmed.
     */
    confirm(): boolean;
    /**
     * The "deploy" command procedure itself.
     * @returns {void}
     */
    runAuthenticated(): void;
}
declare namespace DeployCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        const force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=deploy.d.ts.map