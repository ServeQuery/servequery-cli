export = CreateCommand;
declare class CreateCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    environmentRenderer: any;
}
declare namespace CreateCommand {
    const description: string;
    namespace flags {
        const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        const name: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
        const url: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
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
        const disableRoles: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=create.d.ts.map