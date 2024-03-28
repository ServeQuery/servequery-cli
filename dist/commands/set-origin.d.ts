export = SetOriginCommand;
declare class SetOriginCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
}
declare namespace SetOriginCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    }
    namespace args {
        const ENVIRONMENT_NAME: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=set-origin.d.ts.map