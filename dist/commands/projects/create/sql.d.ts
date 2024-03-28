import type { Config, DbConfig } from '../../../interfaces/project-create-interface';
import type { CommandOptions } from '../../../utils/option-parser';
import type { Config as OclifConfig } from '@oclif/core';
import AbstractProjectCreateCommand from '../../../abstract-project-create-command';
import Agents from '../../../utils/agents';
export default class SqlCommand extends AbstractProjectCreateCommand {
    protected static options: CommandOptions;
    /** @see https://oclif.io/docs/args */
    static readonly args: {
        applicationName: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    /** @see https://oclif.io/docs/flags */
    static readonly flags: {};
    private readonly dumper;
    protected readonly agent = Agents.NodeJS;
    constructor(argv: string[], config: OclifConfig, plan?: any);
    protected generateProject(config: Config): Promise<void>;
    protected testDatabaseConnection(dbConfig: DbConfig): Promise<void>;
}
//# sourceMappingURL=sql.d.ts.map