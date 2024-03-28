const ServequeryCLIError = require('../servequery-cli-error');
class UnableToCreateApplicationTokenError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(options) {
        super('Unable to create an application token on Serve Query', undefined, options);
        this.name = 'UnableToCreateApplicationTokenError';
    }
}
module.exports = UnableToCreateApplicationTokenError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5hYmxlLXRvLWNyZWF0ZS1hcHBsaWNhdGlvbi10b2tlbi1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lcnJvcnMvYXBwbGljYXRpb24tdG9rZW4vdW5hYmxlLXRvLWNyZWF0ZS1hcHBsaWNhdGlvbi10b2tlbi1lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUV0RCxNQUFNLG1DQUFvQyxTQUFRLGNBQWM7SUFDOUQ7Ozs7O09BS0c7SUFDSCxZQUFZLE9BQU87UUFDakIsS0FBSyxDQUFDLHVEQUF1RCxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUNuRixJQUFJLENBQUMsSUFBSSxHQUFHLHFDQUFxQyxDQUFDO0lBQ3BELENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsbUNBQW1DLENBQUMifQ==