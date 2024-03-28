export = InitCommand;
declare class InitCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    fs: any;
    inquirer: any;
    spinner: any;
    buildDatabaseUrl: any;
    environmentVariables: {};
    projectSelection(): Promise<void>;
    projectValidation(): Promise<void>;
    handleDatabaseUrlConfiguration(): Promise<void>;
    developmentEnvironmentCreation(): Promise<void>;
    environmentVariablesAutoFilling(): Promise<void>;
}
declare namespace InitCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=init.d.ts.map