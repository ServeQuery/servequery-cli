import type { Config, DbConfig } from './interfaces/project-create-interface';
import type { ProjectCreateOptions } from './services/projects/create/options';
import type Database from './services/schema/update/database';
import type Spinner from './services/spinner';
import type Messages from './utils/messages';
import type { Config as OclifConfig } from '@oclif/core';
import AbstractAuthenticatedCommand from './abstract-authenticated-command';
export default abstract class AbstractProjectCreateCommand extends AbstractAuthenticatedCommand {
    private readonly eventSender;
    private readonly optionParser;
    private readonly projectCreator;
    protected readonly database: Database;
    protected readonly messages: typeof Messages;
    protected readonly spinner: Spinner;
    protected abstract readonly agent: string | null;
    static args: {
        applicationName: import("@oclif/core/lib/interfaces").Arg<string, Record<string, unknown>>;
    };
    /** @see https://oclif.io/docs/commands */
    static description: string;
    constructor(argv: string[], config: OclifConfig, plan: any);
    protected runAuthenticated(): Promise<void>;
    protected abstract generateProject(config: Config): Promise<void>;
    private getConfig;
    protected getCommandOptions(): Promise<ProjectCreateOptions>;
    protected testDatabaseConnection(dbConfig: DbConfig): Promise<void>;
    private notifySuccess;
}
//# sourceMappingURL=abstract-project-create-command.d.ts.map