import type { Config } from '../../interfaces/project-create-interface';
import type { CommandOptions } from '../../utils/option-parser';
import type { Config as OclifConfig } from '@oclif/core';
import AbstractProjectCreateCommand from '../../abstract-project-create-command';
export default class CreateCommand extends AbstractProjectCreateCommand {
    protected static readonly options: CommandOptions;
    /** @see https://oclif.io/docs/args */
    static readonly args: {
        applicationName: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    /** @see https://oclif.io/docs/flags */
    static readonly flags: {};
    private readonly databaseAnalyzer;
    private readonly dumper;
    protected readonly agent: any;
    constructor(argv: string[], config: OclifConfig, plan?: any);
    protected generateProject(config: Config): Promise<void>;
    private analyzeDatabase;
    private createFiles;
}
//# sourceMappingURL=create.d.ts.map