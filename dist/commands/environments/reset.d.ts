export = ResetCommand;
declare class ResetCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
}
declare namespace ResetCommand {
    const description: string;
    namespace flags {
        const environment: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=reset.d.ts.map