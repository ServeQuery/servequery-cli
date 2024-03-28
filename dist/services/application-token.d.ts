export = ApplicationTokenService;
declare class ApplicationTokenService {
    /**
     * @param {import("../context/plan").Context} context
     */
    constructor({ api, os }: any);
    /** @private @readonly */
    private readonly api;
    /** @private @readonly */
    private readonly os;
    /**
     * @param {string} sessionToken
     * @returns {Promise<string>}
     */
    generateApplicationToken(sessionToken: string): Promise<string>;
    /**
     * @param {string} sessionToken
     * @returns {Promise<void>}
     */
    deleteApplicationToken(sessionToken: string): Promise<void>;
}
//# sourceMappingURL=application-token.d.ts.map