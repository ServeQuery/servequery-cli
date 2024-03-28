import type { Config } from '../../interfaces/project-create-interface';
import type Logger from '../logger';
import '../../utils/handlebars/loader';
export default abstract class AbstractDumper {
    protected projectPath: string;
    protected readonly mkdirp: any;
    private readonly fs;
    protected readonly logger: Logger;
    private readonly chalk;
    private readonly constants;
    private readonly Handlebars;
    protected abstract readonly templateFolder: string;
    protected constructor({ assertPresent, fs, logger, chalk, constants, mkdirp, Handlebars }: {
        assertPresent: any;
        fs: any;
        logger: any;
        chalk: any;
        constants: any;
        mkdirp: any;
        Handlebars: any;
    });
    protected abstract createFiles(dumperConfig: Config, schema?: any): any;
    protected writeFile(relativeFilePath: any, content: any): void;
    protected copyHandleBarsTemplate(source: string, target: string, context?: Record<string, unknown>): void;
    dump(dumperConfig: Config, schema?: any): Promise<void>;
}
//# sourceMappingURL=abstract-dumper.d.ts.map