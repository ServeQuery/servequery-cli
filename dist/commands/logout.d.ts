export = LogoutCommand;
declare class LogoutCommand extends AbstractCommand {
    constructor(argv: any, config: any, plan: any);
    authenticator: any;
    run(): Promise<void>;
}
declare namespace LogoutCommand {
    const description: string;
}
import AbstractCommand_1 = require("../abstract-command");
import AbstractCommand = AbstractCommand_1.default;
//# sourceMappingURL=logout.d.ts.map