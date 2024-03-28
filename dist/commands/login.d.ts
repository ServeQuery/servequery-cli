export = LoginCommand;
declare class LoginCommand extends AbstractCommand {
    constructor(argv: any, config: any, plan: any);
    authenticator: any;
    run(): Promise<void>;
}
declare namespace LoginCommand {
    const description: string;
    namespace flags {
        const email: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const password: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const token: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractCommand_1 = require("../abstract-command");
import AbstractCommand = AbstractCommand_1.default;
//# sourceMappingURL=login.d.ts.map