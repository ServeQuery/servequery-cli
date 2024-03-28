const { Flags } = require('@oclif/core');
const ProjectManager = require('../services/project-manager');
const AbstractAuthenticatedCommand = require('../abstract-authenticated-command').default;
class ProjectCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, projectsRenderer } = this.context;
        assertPresent({ env, projectsRenderer });
        this.env = env;
        this.projectsRenderer = projectsRenderer;
    }
    async runAuthenticated() {
        const parsed = await this.parse(ProjectCommand);
        const config = { ...this.env, ...parsed.flags };
        const manager = new ProjectManager(config);
        const projects = await manager.listProjects();
        this.projectsRenderer.render(projects, config);
    }
}
ProjectCommand.aliases = ['projects:list'];
ProjectCommand.description = 'Manage projects.';
ProjectCommand.flags = {
    format: Flags.string({
        char: 'format',
        description: 'Ouput format.',
        options: ['table', 'json'],
        default: 'table',
    }),
};
module.exports = ProjectCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29tbWFuZHMvcHJvamVjdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUM5RCxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUUxRixNQUFNLGNBQWUsU0FBUSw0QkFBNEI7SUFDdkQsWUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQzlELGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxnQkFBZ0IsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7SUFDM0MsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0I7UUFDcEIsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ2hELE1BQU0sTUFBTSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2hELE1BQU0sT0FBTyxHQUFHLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLE1BQU0sUUFBUSxHQUFHLE1BQU0sT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRjtBQUVELGNBQWMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUUzQyxjQUFjLENBQUMsV0FBVyxHQUFHLGtCQUFrQixDQUFDO0FBRWhELGNBQWMsQ0FBQyxLQUFLLEdBQUc7SUFDckIsTUFBTSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkIsSUFBSSxFQUFFLFFBQVE7UUFDZCxXQUFXLEVBQUUsZUFBZTtRQUM1QixPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO1FBQzFCLE9BQU8sRUFBRSxPQUFPO0tBQ2pCLENBQUM7Q0FDSCxDQUFDO0FBRUYsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMifQ==