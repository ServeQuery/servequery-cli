"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = __importDefault(require("@servequery/context"));
const core_1 = require("@oclif/core");
const plan_1 = __importDefault(require("./context/plan"));
class AbstractCommand extends core_1.Command {
    constructor(argv, config, plan) {
        super(argv, config);
        context_1.default.init(plan || plan_1.default, true);
        this.context = context_1.default.inject();
        // FIXME: Restore when no more Context.inject present in services.
        // this.context = Context.execute(plan || defaultPlan);
        const { assertPresent, logger, chalk } = this.context;
        assertPresent({ logger, chalk });
        this.logger = logger;
        this.chalk = chalk;
    }
}
exports.default = AbstractCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtY29tbWFuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hYnN0cmFjdC1jb21tYW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBSUEsbUVBQTJDO0FBQzNDLHNDQUFzQztBQUV0QywwREFBeUM7QUFFekMsTUFBOEIsZUFBZ0IsU0FBUSxjQUFPO0lBTzNELFlBQVksSUFBYyxFQUFFLE1BQWMsRUFBRSxJQUFLO1FBQy9DLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFcEIsaUJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLGNBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUV4QyxJQUFJLENBQUMsT0FBTyxHQUFHLGlCQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEMsa0VBQWtFO1FBQ2xFLHVEQUF1RDtRQUN2RCxNQUFNLEVBQUUsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RELGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQXJCRCxrQ0FxQkMifQ==