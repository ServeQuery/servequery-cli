"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const abstract_authenticated_command_1 = __importDefault(require("../../abstract-authenticated-command"));
const project_manager_1 = __importDefault(require("../../services/project-manager"));
class GetCommand extends abstract_authenticated_command_1.default {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, projectRenderer } = this.context;
        assertPresent({
            env,
            projectRenderer,
        });
        this.env = env;
        this.projectRenderer = projectRenderer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(GetCommand);
        const config = { ...this.env, ...(await parsed).flags, ...(await parsed).args };
        const manager = new project_manager_1.default(config);
        try {
            const project = await manager.getProject();
            this.projectRenderer.render(project, config);
        }
        catch (err) {
            this.logger.error(`Cannot find the project ${this.chalk.bold(config.projectId)}.`);
        }
    }
}
exports.default = GetCommand;
GetCommand.flags = {
    format: core_1.Flags.string({
        char: 'f',
        description: 'Ouput format.',
        options: ['table', 'json'],
        default: 'table',
    }),
};
GetCommand.args = {
    projectId: core_1.Args.integer({
        name: 'projectId',
        required: true,
        description: 'ID of a project.',
    }),
};
GetCommand.description = 'Get the configuration of a project.';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3Byb2plY3RzL2dldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLHNDQUEwQztBQUUxQywwR0FBZ0Y7QUFDaEYscUZBQTREO0FBRTVELE1BQXFCLFVBQVcsU0FBUSx3Q0FBNEI7SUF3QmxFLFlBQVksSUFBYyxFQUFFLE1BQWMsRUFBRSxJQUFLO1FBQy9DLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0QsYUFBYSxDQUFDO1lBQ1osR0FBRztZQUNILGVBQWU7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFNUMsTUFBTSxNQUFNLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sTUFBTSxDQUFDLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBRWhGLE1BQU0sT0FBTyxHQUFHLElBQUkseUJBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzQyxJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDM0MsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlDO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQywyQkFBMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwRjtJQUNILENBQUM7O0FBakRILDZCQWtEQztBQTdDaUIsZ0JBQUssR0FBRztJQUN0QixNQUFNLEVBQUUsWUFBSyxDQUFDLE1BQU0sQ0FBQztRQUNuQixJQUFJLEVBQUUsR0FBRztRQUNULFdBQVcsRUFBRSxlQUFlO1FBQzVCLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7UUFDMUIsT0FBTyxFQUFFLE9BQU87S0FDakIsQ0FBQztDQUNILENBQUM7QUFFYyxlQUFJLEdBQUc7SUFDckIsU0FBUyxFQUFFLFdBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsSUFBSSxFQUFFLFdBQVc7UUFDakIsUUFBUSxFQUFFLElBQUk7UUFDZCxXQUFXLEVBQUUsa0JBQWtCO0tBQ2hDLENBQUM7Q0FDSCxDQUFDO0FBRWMsc0JBQVcsR0FBRyxxQ0FBcUMsQ0FBQyJ9