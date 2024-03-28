import type { Command } from '@oclif/core';
/** Option which can be used both as  flag or prompt */
export type CommandOptions<T = Record<string, unknown>> = {
    [name: string]: {
        type?: 'string' | 'boolean';
        exclusive?: string[];
        choices?: Array<{
            name: string;
            value: unknown;
        }>;
        when?: (v: T) => boolean;
        validate?: (v: string) => boolean | string;
        default?: unknown | ((v: T) => unknown);
        oclif: {
            char?: string;
            description: string;
        };
        prompter?: {
            question: string;
            description?: string;
        };
    };
};
/** Query options interactively */
export declare function getInteractiveOptions<T>(options: CommandOptions, values?: Record<string, unknown>): Promise<T>;
/** Get options that were passed in the command line */
export declare function getCommandLineOptions<T>(instance: Command): Promise<T>;
/** Convert generic options to oclif flags */
export declare function optionsToFlags(options: CommandOptions): {};
//# sourceMappingURL=option-parser.d.ts.map