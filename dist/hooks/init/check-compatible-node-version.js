"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("@servequery/context"));
const logger_plan_1 = __importDefault(require("../../context/logger-plan"));
const hook = async function (options) {
    const context = context_1.default.execute(logger_plan_1.default);
    const { assertPresent, logger, chalk } = context;
    assertPresent({ logger, chalk });
    const NODE_VERSION_MINIMUM = 18;
    try {
        const nodeVersion = Number(process.version.split('.')[0].split('v')[1]);
        if (nodeVersion < NODE_VERSION_MINIMUM) {
            logger.log(chalk.red(`Serve Query is not compatible with your current Node.js version (v${nodeVersion} detected). Please use Node.js v${NODE_VERSION_MINIMUM}+.`));
            process.exit(1);
        }
    }
    catch (error) {
        // NOTICE: Fails silently and considers that Node.js version is greater than 18.
    }
};
exports.default = hook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stY29tcGF0aWJsZS1ub2RlLXZlcnNpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaG9va3MvaW5pdC9jaGVjay1jb21wYXRpYmxlLW5vZGUtdmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG1FQUEyQztBQUUzQyw0RUFBb0Q7QUFFcEQsTUFBTSxJQUFJLEdBQWlCLEtBQUssV0FBVyxPQUFPO0lBQ2hELE1BQU0sT0FBTyxHQUFRLGlCQUFPLENBQUMsT0FBTyxDQUFDLHFCQUFXLENBQUMsQ0FBQztJQUNsRCxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDakQsYUFBYSxDQUFDLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFakMsTUFBTSxvQkFBb0IsR0FBRyxFQUFFLENBQUM7SUFFaEMsSUFBSTtRQUNGLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4RSxJQUFJLFdBQVcsR0FBRyxvQkFBb0IsRUFBRTtZQUN0QyxNQUFNLENBQUMsR0FBRyxDQUNSLEtBQUssQ0FBQyxHQUFHLENBQ1AsbUZBQW1GLFdBQVcsbUNBQW1DLG9CQUFvQixJQUFJLENBQzFKLENBQ0YsQ0FBQztZQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakI7S0FDRjtJQUFDLE9BQU8sS0FBSyxFQUFFO1FBQ2QsZ0ZBQWdGO0tBQ2pGO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsa0JBQWUsSUFBSSxDQUFDIn0=