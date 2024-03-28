export = EventSender;
declare class EventSender {
    constructor({ assertPresent, env, superagent }: {
        assertPresent: any;
        env: any;
        superagent: any;
    });
    env: any;
    superagent: any;
    applicationName: any;
    command: any;
    meta: any;
    sessionToken: any;
    notifyError(code?: string, message?: any, context?: any): Promise<void>;
    notifySuccess(): Promise<void>;
}
//# sourceMappingURL=event-sender.d.ts.map