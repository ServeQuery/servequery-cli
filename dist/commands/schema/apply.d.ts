export = ApplyCommand;
declare class ApplyCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    fs: any;
    joi: any;
    runAuthenticated(): Promise<any>;
    readSchema(): any;
    getEnvironmentSecret(parsedFlags: any): any;
}
declare namespace ApplyCommand {
    const description: string;
    namespace flags {
        const secret: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=apply.d.ts.map