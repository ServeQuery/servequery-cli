import type { Config } from '../../../interfaces/project-create-interface';
import type { ProjectCreateOptions } from '../../../services/projects/create/options';
import type { CommandOptions } from '../../../utils/option-parser';
import type { Config as OclifConfig } from '@oclif/core';
import AbstractProjectCreateCommand from '../../../abstract-project-create-command';
import Agents from '../../../utils/agents';
export default class NosqlCommand extends AbstractProjectCreateCommand {
    protected static readonly options: CommandOptions;
    /** @see https://oclif.io/docs/args */
    static readonly args: {
        applicationName: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    /** @see https://oclif.io/docs/flags */
    static readonly flags: {};
    private readonly dumper;
    private readonly databaseAnalyzer;
    protected readonly agent = Agents.NodeJS;
    constructor(argv: string[], config: OclifConfig, plan?: any);
    protected generateProject(config: Config): Promise<void>;
    protected getCommandOptions(): Promise<ProjectCreateOptions>;
    private analyzeDatabase;
    private createFiles;
}
//# sourceMappingURL=nosql.d.ts.map