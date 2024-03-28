import type { Config } from '../../interfaces/project-create-interface';
import type { Language } from '../../utils/languages';
import AbstractDumper from './abstract-dumper';
export default class AgentNodeJs extends AbstractDumper {
    private env;
    private readonly DEFAULT_PORT;
    private readonly isLinuxOs;
    private readonly isDatabaseLocal;
    private readonly buildDatabaseUrl;
    private readonly lodash;
    private readonly strings;
    private readonly toValidPackageName;
    protected readonly templateFolder = "agent-nodejs";
    constructor(context: any);
    writePackageJson(language: Language, dbDialect: string, appName: string): void;
    writeTsConfigJson(): void;
    writeIndex(language: Language, dbDialect: string, dbSchema: string): void;
    private writeDotEnv;
    private writeGitignore;
    private writeTypings;
    private writeDockerignore;
    private writeDockerfile;
    private writeDockerCompose;
    private removeNonCompliantNestedFields;
    private removeNonCompliantFields;
    private computeModelsConfiguration;
    private writeMongooseModels;
    protected createFiles(dumpConfig: Config, mongoSchema?: any): Promise<void>;
}
//# sourceMappingURL=agent-nodejs.d.ts.map