class ServequeryCLIError extends Error {
    /**
     * @param {string} message
     * @param {any} [details]
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string;
     * }} [options]
     */
    constructor(message, details, options) {
        super(message);
        /** @public @readonly */
        this.name = 'ServequeryCLIError';
        /** @public @readonly */
        this.userMessage = message;
        /** @public @readonly */
        this.details = details;
        /** @public @readonly */
        this.reason = options && options.reason;
        /** @public @readonly */
        this.possibleSolution = options && options.possibleSolution;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = ServequeryCLIError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yZXN0LWNsaS1lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcnJvcnMvZm9yZXN0LWNsaS1lcnJvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGNBQWUsU0FBUSxLQUFLO0lBQ2hDOzs7Ozs7O09BT0c7SUFDSCxZQUFZLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTztRQUNuQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFZix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQztRQUU3Qix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFFM0Isd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBRXZCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDO1FBRXhDLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQztRQUU1RCxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGNBQWMsQ0FBQyJ9