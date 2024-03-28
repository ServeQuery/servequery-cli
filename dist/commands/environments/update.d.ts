export = UpdateCommand;
declare class UpdateCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
}
declare namespace UpdateCommand {
    const description: string;
    namespace flags {
        const environmentId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        const name: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const url: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=update.d.ts.map