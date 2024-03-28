const ServequeryCLIError = require('../errors/servequery-cli-error');
class ErrorHandler {
    /**
     * @param {import('../context/plan').Context} context
     */
    constructor({ assertPresent, chalk, messages, terminator }) {
        assertPresent({
            chalk,
            messages,
            terminator,
        });
        /** @private @readonly */
        this.terminator = terminator;
        /** @private @readonly */
        this.chalk = chalk;
        /** @private @readonly */
        this.messages = messages;
    }
    /**
     * @private
     * @param {ServequeryCLIError} error
     * @returns {string[]}
     */
    getMessages(error) {
        const messages = [];
        if (error.reason) {
            messages.push(`${this.chalk.red(error.message)}: ${error.reason}`);
        }
        else {
            messages.push(this.chalk.red(error.message));
        }
        if (error.possibleSolution) {
            messages.push(error.possibleSolution);
        }
        return messages;
    }
    /**
     * @param {Error} error
     */
    async handle(error) {
        if (error instanceof ServequeryCLIError) {
            await this.terminator.terminate(1, {
                logs: this.getMessages(error),
            });
        }
        else {
            const message = `${this.messages.ERROR_UNEXPECTED} ${this.chalk.red(error.message)}`;
            await this.terminator.terminate(1, {
                logs: [message],
            });
        }
    }
}
module.exports = ErrorHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItaGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9lcnJvci1oYW5kbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRTdELE1BQU0sWUFBWTtJQUNoQjs7T0FFRztJQUNILFlBQVksRUFBRSxhQUFhLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUU7UUFDeEQsYUFBYSxDQUFDO1lBQ1osS0FBSztZQUNMLFFBQVE7WUFDUixVQUFVO1NBQ1gsQ0FBQyxDQUFDO1FBQ0gseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLHlCQUF5QjtRQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxXQUFXLENBQUMsS0FBSztRQUNmLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEIsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztTQUNwRTthQUFNO1lBQ0wsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztTQUM5QztRQUVELElBQUksS0FBSyxDQUFDLGdCQUFnQixFQUFFO1lBQzFCLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDdkM7UUFFRCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFDaEIsSUFBSSxLQUFLLFlBQVksY0FBYyxFQUFFO1lBQ25DLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7YUFDOUIsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLE1BQU0sT0FBTyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNyRixNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRTtnQkFDakMsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ2hCLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMifQ==