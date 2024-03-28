export = SchemaSender;
/**
 * @class
 * @param {string} serializedSchema
 * @param {string} secret
 * @param {string} authenticationToken
 * @param {(code: number) => void} oclifExit
 */
declare function SchemaSender(serializedSchema: string, secret: string, authenticationToken: string, oclifExit: (code: number) => void): void;
declare class SchemaSender {
    /**
     * @class
     * @param {string} serializedSchema
     * @param {string} secret
     * @param {string} authenticationToken
     * @param {(code: number) => void} oclifExit
     */
    constructor(serializedSchema: string, secret: string, authenticationToken: string, oclifExit: (code: number) => void);
    /**
     * @function
     * @returns {Promise<number | undefined>}
     */
    perform: () => Promise<number | undefined>;
}
//# sourceMappingURL=schema-sender.d.ts.map