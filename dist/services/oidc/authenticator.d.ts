/// <reference types="node" />
import type Open from 'open';
import type { Client } from 'openid-client';
export default class OidcAuthenticator {
    private readonly openIdClient;
    private readonly env;
    private readonly process;
    private readonly open;
    private readonly logger;
    constructor({ assertPresent, openIdClient, env, process, open, logger, }: {
        assertPresent: (args: unknown) => void;
        openIdClient: Client;
        env: Record<string, string>;
        process: NodeJS.Process;
        open: typeof Open;
        logger: Logger;
    });
    private register;
    private static launchDeviceAuthorization;
    private waitForAuthentication;
    private tryOpen;
    authenticate(): Promise<string>;
}
//# sourceMappingURL=authenticator.d.ts.map