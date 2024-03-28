export = GetCommand;
declare class GetCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    chalk: any;
    env: any;
    environmentRenderer: any;
}
declare namespace GetCommand {
    const description: string;
    namespace flags {
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
    namespace args {
        const environmentId: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=get.d.ts.map