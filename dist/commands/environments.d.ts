export = EnvironmentCommand;
declare class EnvironmentCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    environmentsRenderer: any;
}
declare namespace EnvironmentCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        const format: import("@oclif/core/lib/interfaces/parser").FlagProps & {
            type: "option";
            helpValue?: string;
            options?: readonly string[];
            multiple?: boolean;
            multipleNonGreedy?: boolean;
            delimiter?: ",";
            allowStdin?: boolean | "only";
        } & {
            parse: import("@oclif/core/lib/interfaces/parser").FlagParser<string, string, import("@oclif/core/lib/interfaces").CustomOptions>;
            defaultHelp?: import("@oclif/core/lib/interfaces/parser").FlagDefaultHelp<string, import("@oclif/core/lib/interfaces").CustomOptions>;
            input: string[];
            default?: import("@oclif/core/lib/interfaces/parser").FlagDefault<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        } & {
            parse: import("@oclif/core/lib/interfaces/parser").FlagParser<string[], string, import("@oclif/core/lib/interfaces").CustomOptions>;
            defaultHelp?: import("@oclif/core/lib/interfaces/parser").FlagDefaultHelp<string[], import("@oclif/core/lib/interfaces").CustomOptions>;
            input: string[];
            default?: import("@oclif/core/lib/interfaces/parser").FlagDefault<string[], import("@oclif/core/lib/interfaces").CustomOptions>;
        };
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=environments.d.ts.map