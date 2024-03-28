const { chars } = require('./defaults');
class BranchesRenderer {
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
    render(branches, format) {
        const table = new this.Table({
            head: ['NAME', 'ORIGIN', 'IS CURRENT', 'CLOSED AT'],
            colWidths: [20, 20, 20, 30],
            chars,
        });
        switch (format) {
            case 'json':
                this.logger.log(JSON.stringify(branches, null, 2));
                break;
            case 'table':
                branches.forEach(branch => {
                    table.push([
                        branch.name,
                        branch.originEnvironment ? branch.originEnvironment.name : '⚠️  No origin set',
                        branch.isCurrent ? '✅' : '',
                        branch.closedAt ? branch.closedAt : '',
                    ]);
                });
                this.logger.log(`${this.chalk.bold('BRANCHES')}`, ...table.toString().split('\n'));
                break;
            default:
        }
    }
}
module.exports = BranchesRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyZXJzL2JyYW5jaGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEMsTUFBTSxnQkFBZ0I7SUFDcEIsWUFBWSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtRQUNqRCxhQUFhLENBQUM7WUFDWixLQUFLO1lBQ0wsTUFBTTtZQUNOLEtBQUs7U0FDTixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMzQixJQUFJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUM7WUFDbkQsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO1lBQzNCLEtBQUs7U0FDTixDQUFDLENBQUM7UUFFSCxRQUFRLE1BQU0sRUFBRTtZQUNkLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkQsTUFBTTtZQUNSLEtBQUssT0FBTztnQkFDVixRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUN4QixLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUNULE1BQU0sQ0FBQyxJQUFJO3dCQUNYLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsbUJBQW1CO3dCQUM5RSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQzNCLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7cUJBQ3ZDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ25GLE1BQU07WUFDUixRQUFRO1NBQ1Q7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDIn0=