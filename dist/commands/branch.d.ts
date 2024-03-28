export = BranchCommand;
declare class BranchCommand extends AbstractAuthenticatedCommand {
    constructor(argv: any, config: any, plan: any);
    env: any;
    inquirer: any;
    branchesRenderer: any;
    listBranches(envSecret: any, format: any): Promise<void>;
    createBranch(branchName: any, environmentSecret: any, originName: any): Promise<void>;
    deleteBranch(branchName: any, forceDelete: any, envSecret: any): Promise<void>;
}
declare namespace BranchCommand {
    const aliases: string[];
    const description: string;
    namespace flags {
        export const projectId: import("@oclif/core/lib/interfaces").OptionFlag<number, import("@oclif/core/lib/interfaces").CustomOptions>;
        const _delete: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        export { _delete as delete };
        export const force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        export const help: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        export const format: import("@oclif/core/lib/interfaces/parser").FlagProps & {
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
        export const origin: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    }
    namespace args {
        const BRANCH_NAME: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    }
}
import AbstractAuthenticatedCommand_1 = require("../abstract-authenticated-command");
import AbstractAuthenticatedCommand = AbstractAuthenticatedCommand_1.default;
//# sourceMappingURL=branch.d.ts.map