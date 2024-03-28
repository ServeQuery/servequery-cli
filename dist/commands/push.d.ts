export = PushCommand;
declare class PushCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
}
declare namespace PushCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=push.d.ts.map