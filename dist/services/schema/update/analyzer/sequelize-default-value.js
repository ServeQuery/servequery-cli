const Sequelize = require('sequelize');
/**
 * Convert SQL expression to Javascript value when possible.
 * Otherwise, default to using Sequelize.literal(...) which will always work.
 */
class DefaultValueExpression {
    constructor(dialect, type, expression) {
        this.dialect = dialect;
        this.type = type;
        this.expression = expression;
    }
    parse() {
        if (this.expression === null || this.expression === undefined) {
            return null;
        }
        try {
            let result;
            if (this.dialect === 'postgres') {
                result = this.parsePostgres();
            }
            else if (this.dialect === 'mysql') {
                result = this.parseMysql();
            }
            else if (this.dialect === 'mssql') {
                result = this.parseMsSql();
            }
            if (result === undefined) {
                result = this.parseGeneric();
            }
            return result !== undefined ? result : Sequelize.literal(this.expression);
        }
        catch (e) {
            return Sequelize.literal(this.expression);
        }
    }
    parseGeneric() {
        const nulls = ['NULL'];
        const falses = ['false', 'FALSE', "b'0'", '((0))'];
        const trues = ['true', 'TRUE', "b'1'", '((1))'];
        const isDate = ['TIMESTAMP', 'DATETIME', 'DATE', 'TIME'];
        let result;
        if (nulls.includes(this.expression) || this.expression.startsWith('NULL::')) {
            result = null;
        }
        else if (falses.includes(this.expression)) {
            result = false;
        }
        else if (trues.includes(this.expression)) {
            result = true;
        }
        else if (/^-?\d+(\.\d+)?$/.test(this.expression)) {
            result = Number.parseFloat(this.expression);
            if (result.toString() !== this.expression) {
                result = Sequelize.literal(this.expression);
            }
        }
        else if (/^'.*'$/.test(this.expression)) {
            result = this.expression.substr(1, this.expression.length - 2).replace(/''/g, "'");
        }
        else if (isDate) {
            result = this.literalUnlessMatch(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})|(\d{4}-\d{2}-\d{2})|(\d{2}:\d{2}:\d{2})$/);
        }
        return result;
    }
    parseMysql() {
        // We have no way of differenciating expressions from constants
        // => Just make some guesses and default to Sequelize.literal to pass the tests.
        const isString = this.type.startsWith('VARCHAR') || this.type === 'TEXT' || this.type === 'CHAR';
        let result;
        if (this.type.startsWith('ENUM')) {
            result = this.expression;
        }
        else if (isString) {
            result = this.literalUnlessMatch(/^[^()]+$/);
        }
        else if (this.type === 'JSON') {
            const match = this.expression.match(/^[_a-z0-9]+\\'(.+)\\'$/);
            if (match) {
                result = JSON.parse(match[1]);
            }
        }
        return result;
    }
    parsePostgres() {
        let result;
        if (/^'.*'::jsonb?$/i.test(this.expression)) {
            // Special case for json/jsonb
            const [, content] = this.expression.match(/^'(.*)'::jsonb?$/i);
            result = JSON.parse(content.replace(/''/g, "'"));
        }
        else if (/^'.*'::[a-z_ ]+$/i.test(this.expression)) {
            // Catches types containing only alpha and spaces (int, varchar, timestamp with timezone, ...)
            // This excludes arrays or other compound types (int[], ...).
            const [, content] = this.expression.match(/^'(.*)'::[a-z_ ]+$/i);
            result = content.replace(/''/g, "'");
        }
        return result;
    }
    parseMsSql() {
        // Remove wrapping parentheses
        while (/^\(.*\)$/.test(this.expression)) {
            this.expression = this.expression.substr(1, this.expression.length - 2);
        }
        if (this.type === 'BIT') {
            if (this.expression === '1')
                return true;
            if (this.expression === '0')
                return false;
        }
        return undefined;
    }
    literalUnlessMatch(regexp) {
        return regexp.test(this.expression) ? this.expression : Sequelize.literal(this.expression);
    }
}
module.exports = DefaultValueExpression;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VxdWVsaXplLWRlZmF1bHQtdmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3VwZGF0ZS9hbmFseXplci9zZXF1ZWxpemUtZGVmYXVsdC12YWx1ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFNBQVMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFdkM7OztHQUdHO0FBQ0gsTUFBTSxzQkFBc0I7SUFDMUIsWUFBWSxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssU0FBUyxFQUFFO1lBQzdELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxJQUFJO1lBQ0YsSUFBSSxNQUFNLENBQUM7WUFDWCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUMvQixNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2FBQy9CO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxPQUFPLEVBQUU7Z0JBQ25DLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDNUI7aUJBQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBRTtnQkFDbkMsTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzthQUM1QjtZQUVELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM5QjtZQUVELE9BQU8s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