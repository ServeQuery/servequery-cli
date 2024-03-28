import type Authenticator from './services/authenticator';
import type { Config } from '@oclif/core';
import AbstractCommand from './abstract-command';
export default abstract class AbstractAuthenticatedCommand extends AbstractCommand {
    protected readonly authenticator: Authenticator;
    constructor(argv: string[], config: Config, plan?: any);
    run(): Promise<void>;
    protected abstract runAuthenticated(): Promise<void>;
    private checkAuthentication;
    private handleAuthenticationErrors;
}
//# sourceMappingURL=abstract-authenticated-command.d.ts.map