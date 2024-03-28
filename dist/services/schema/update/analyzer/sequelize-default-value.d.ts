export = DefaultValueExpression;
/**
 * Convert SQL expression to Javascript value when possible.
 * Otherwise, default to using Sequelize.literal(...) which will always work.
 */
declare class DefaultValueExpression {
    constructor(dialect: any, type: any, expression: any);
    dialect: any;
    type: any;
    expression: any;
    parse(): any;
    parseGeneric(): any;
    parseMysql(): any;
    parsePostgres(): any;
    parseMsSql(): boolean;
    literalUnlessMatch(regexp: any): any;
}
//# sourceMappingURL=sequelize-default-value.d.ts.map