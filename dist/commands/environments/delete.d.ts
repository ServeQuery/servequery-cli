export = DeleteCommand;
declare class DeleteCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    chalk: any;
    env: any;
    inquirer: any;
}
declare namespace DeleteCommand {
    const description: string;
    namespace flags {
        const force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    }
    namespace args {
        const environmentId: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=delete.d.ts.map