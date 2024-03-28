import type { Config } from '@oclif/core';
import AbstractAuthenticatedCommand from '../../abstract-authenticated-command';
export default class GetCommand extends AbstractAuthenticatedCommand {
    private env;
    private projectRenderer;
    static flags: {
        format: import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    static args: {
        projectId: import("@oclif/core/lib/interfaces").Arg<number, {
            max?: number;
            min?: number;
        }>;
    };
    static description: string;
    constructor(argv: string[], config: Config, plan?: any);
    runAuthenticated(): Promise<void>;
}
//# sourceMappingURL=get.d.ts.map