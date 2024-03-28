import type Logger from './services/logger';
import type { Config } from '@oclif/core';
import type { Chalk } from 'chalk';
import { Command } from '@oclif/core';
export default abstract class AbstractCommand extends Command {
    protected readonly context: any;
    protected readonly logger: Logger;
    protected readonly chalk: Chalk;
    constructor(argv: string[], config: Config, plan?: any);
}
//# sourceMappingURL=abstract-command.d.ts.map