export = UpdateCommand;
declare class UpdateCommand extends AbstractCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    path: any;
    schemaService: any;
    run(): Promise<void>;
}
declare namespace UpdateCommand {
    const description: string;
    namespace flags {
        const config: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const outputDirectory: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
    const args: {};
}
import AbstractCommand_1 = require("../../abstract-command");
import AbstractCommand = AbstractCommand_1.default;
//# sourceMappingURL=update.d.ts.map