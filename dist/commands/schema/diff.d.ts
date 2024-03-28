export = DiffCommand;
declare class DiffCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    chalk: any;
    env: any;
    environmentRenderer: any;
    errorHandler: any;
}
declare namespace DiffCommand {
    const description: string;
    namespace flags {
        const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    }
    namespace args {
        const environmentIdFrom: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
        const environmentIdTo: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=diff.d.ts.map