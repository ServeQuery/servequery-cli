export = Authenticator;
/**
 * @class
 * @param {import('../context/plan').Context} context
 */
declare function Authenticator({ logger, api, chalk, inquirer, jwtDecode, fs, joi, env, oidcAuthenticator, applicationTokenService, mkdirp, }: any): void;
declare class Authenticator {
    /**
     * @class
     * @param {import('../context/plan').Context} context
     */
    constructor({ logger, api, chalk, inquirer, jwtDecode, fs, joi, env, oidcAuthenticator, applicationTokenService, mkdirp, }: any);
    /**
     * @param {string?} path
     * @returns {string|null}
     */
    getAuthToken: (path?: string | null) => string | null;
    getVerifiedToken: (path: any) => any;
    readAuthTokenFrom: (path: any) => any;
    saveToken: (token: any) => Promise<void>;
    verify: (token: any) => any;
    validateToken: (token: any) => true | "Invalid token. Please enter your authentication token.";
    logout: (opts?: {}) => Promise<void>;
    tryLogin: (config: any) => Promise<void>;
    /**
     * @param {{
     *  email: string;
     *  password: string;
     *  token: string;
     * }} params
     * @returns {Promise<string>}
     */
    login: ({ email, password, token }: {
        email: string;
        password: string;
        token: string;
    }) => Promise<string>;
    loginWithToken: (token: any) => any;
    validateEmail: (input: any) => true | "Invalid email" | "Please enter your email address.";
    promptEmail: () => Promise<any>;
    loginWithPassword: (email: any, password: any) => Promise<any>;
}
//# sourceMappingURL=authenticator.d.ts.map