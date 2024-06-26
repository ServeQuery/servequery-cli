const { chars } = require('./defaults');
class ProjectsRenderer {
    constructor({ assertPresent, chalk, logger, Table }) {
        assertPresent({
            chalk,
            logger,
            Table,
        });
        this.chalk = chalk;
        this.logger = logger;
        this.Table = Table;
    }
    render(projects, config) {
        const table = new this.Table({
            head: ['ID', 'NAME'],
            colWidths: [10, 20],
            chars,
        });
        switch (config.format) {
            case 'json':
                this.logger.log(JSON.stringify(projects, null, 2));
                break;
            case 'table':
                projects.forEach(project => {
                    table.push([project.id, project.name]);
                });
                this.logger.log(`${this.chalk.bold('PROJECTS')}`, ...table.toString().split('\n'));
                break;
            default:
        }
    }
}
module.exports = ProjectsRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyZXJzL3Byb2plY3RzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEMsTUFBTSxnQkFBZ0I7SUFDcEIsWUFBWSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUNqRCxhQUFhLENBQUM7WUFDWixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1lBQ3BCLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDbkIsS0FBSztTQUNOLENBQUMsQ0FBQztRQUVILFFBQVEsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDekIsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkYsTUFBTTtZQUNSLFFBQVE7U0FDVDtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsZ0JBQWdCLENBQUMifQ==