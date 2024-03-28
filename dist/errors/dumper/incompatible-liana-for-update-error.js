const ServequeryCLIError = require('../servequery-cli-error');
class IncompatibleLianaForUpdateError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(reason) {
        super('The liana is incompatible for update', undefined, { reason });
        this.name = 'IncompatibleLianaForUpdateError';
    }
}
module.exports = IncompatibleLianaForUpdateError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5jb21wYXRpYmxlLWxpYW5hLWZvci11cGRhdGUtZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXJyb3JzL2R1bXBlci9pbmNvbXBhdGlibGUtbGlhbmEtZm9yLXVwZGF0ZS1lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUV0RCxNQUFNLCtCQUFnQyxTQUFRLGNBQWM7SUFDMUQ7Ozs7O09BS0c7SUFDSCxZQUFZLE1BQU07UUFDaEIsS0FBSyxDQUFDLHNDQUFzQyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLElBQUksR0FBRyxpQ0FBaUMsQ0FBQztJQUNoRCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLCtCQUErQixDQUFDIn0=