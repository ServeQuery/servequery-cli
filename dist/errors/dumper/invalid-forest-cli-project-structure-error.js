const ServequeryCLIError = require('../servequery-cli-error');
class InvalidServequeryCLIProjectStructureError extends ServequeryCLIError {
    /**
     * @param {{
     *  reason?: string;
     *  possibleSolution?: string
     * }} [options]
     */
    constructor(path, reason) {
        super(`We are not able to detect a Servequery CLI project file architecture at this path: ${path}.`, undefined, { reason });
        this.name = 'InvalidServequeryCLIProjectStructureError';
    }
}
module.exports = InvalidServequeryCLIProjectStructureError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZC1mb3Jlc3QtY2xpLXByb2plY3Qtc3RydWN0dXJlLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Vycm9ycy9kdW1wZXIvaW52YWxpZC1mb3Jlc3QtY2xpLXByb2plY3Qtc3RydWN0dXJlLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRXRELE1BQU0scUNBQXNDLFNBQVEsY0FBYztJQUNoRTs7Ozs7T0FLRztJQUNILFlBQVksSUFBSSxFQUFFLE1BQU07UUFDdEIsS0FBSyxDQUNILGtGQUFrRixJQUFJLEdBQUcsRUFDekYsU0FBUyxFQUNULEVBQUUsTUFBTSxFQUFFLENBQ1gsQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLEdBQUcsdUNBQXVDLENBQUM7SUFDdEQsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxxQ0FBcUMsQ0FBQyJ9