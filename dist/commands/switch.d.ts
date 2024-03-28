export = SwitchCommand;
declare class SwitchCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
    selectBranch(branches: any): Promise<any>;
    switchTo(selectedBranch: any, environmentSecret: any): Promise<void>;
    getConfig(): Promise<any>;
}
declare namespace SwitchCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    }
    namespace args {
        const BRANCH_NAME: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=switch.d.ts.map