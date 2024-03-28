export = UserCommand;
declare class UserCommand extends AbstractCommand {
    constructor(argv: any, config: any, plan: any);
    authenticator: any;
    chalk: any;
    jwtDecode: any;
    logger: any;
    terminator: any;
}
declare namespace UserCommand {
    const description: string;
}
import AbstractCommand_1 = require("../abstract-command");
import AbstractCommand = AbstractCommand_1.default;
//# sourceMappingURL=user.d.ts.map