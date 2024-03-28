export = Api;
/**
 * @class
 * @param {import('../context/plan').Context} context
 */
declare function Api({ pkg, env, superagent: agent, applicationTokenSerializer, applicationTokenDeserializer, environmentDeserializer, environmentSerializer, projectDeserializer, projectSerializer, }: any): void;
declare class Api {
    /**
     * @class
     * @param {import('../context/plan').Context} context
     */
    constructor({ pkg, env, superagent: agent, applicationTokenSerializer, applicationTokenDeserializer, environmentDeserializer, environmentSerializer, projectDeserializer, projectSerializer, }: any);
    endpoint: () => any;
    userAgent: string;
    login: (email: any, password: any) => Promise<any>;
    /**
     * @param {import('../serializers/application-token').InputApplicationToken} applicationToken
     * @param {string} sessionToken
     * @returns {Promise<import('../deserializers/application-token').ApplicationToken>}
     */
    createApplicationToken: (applicationToken: import('../serializers/application-token').InputApplicationToken, sessionToken: string) => Promise<import('../deserializers/application-token').ApplicationToken>;
    /**
     * @param {string} sessionToken
     * @returns {Promise<import('../deserializers/application-token').ApplicationToken>}
     */
    deleteApplicationToken: (sessionToken: string) => Promise<import('../deserializers/application-token').ApplicationToken>;
    createProject: (config: any, sessionToken: any, project: any) => Promise<any>;
}
//# sourceMappingURL=api.d.ts.map