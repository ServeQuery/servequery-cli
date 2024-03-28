const { chars } = require('./defaults');
class ProjectRenderer {
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
    render(project, config) {
        const table = new this.Table({
            chars,
        });
        switch (config.format) {
            case 'json':
                this.logger.log(JSON.stringify(project, null, 2));
                break;
            case 'table':
                table.push({ id: project.id || '' }, { name: project.name || '' }, { 'default environment': project.defaultEnvironment.type || '' });
                this.logger.log(`${this.chalk.bold('PROJECT')}`, ...table.toString().split('\n'));
                break;
            default:
        }
    }
}
module.exports = ProjectRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZW5kZXJlcnMvcHJvamVjdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBRXhDLE1BQU0sZUFBZTtJQUNuQixZQUFZLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1FBQ2pELGFBQWEsQ0FBQztZQUNaLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztTQUNOLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDcEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLEtBQUs7U0FDTixDQUFDLENBQUM7UUFFSCxRQUFRLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQ1IsRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFDeEIsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsRUFDNUIsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsSUFBSSxJQUFJLEVBQUUsRUFBRSxDQUNqRSxDQUFDO2dCQUNGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbEYsTUFBTTtZQUNSLFFBQVE7U0FDVDtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDIn0=