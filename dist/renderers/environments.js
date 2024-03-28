const { chars } = require('./defaults');
class EnvironmentsRenderer {
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
    render(environments, config) {
        const table = new this.Table({
            head: ['ID', 'NAME', 'URL', 'TYPE'],
            colWidths: [10, 20, 35, 15],
            chars,
        });
        switch (config.format) {
            case 'json':
                this.logger.log(JSON.stringify(environments, null, 2));
                break;
            case 'table':
                environments.forEach(environment => {
                    table.push([
                        environment.id,
                        environment.name,
                        // The table-cli library does not handle null values.
                        environment.apiEndpoint || '',
                        environment.type === 'remote' && environment.areRolesDisabled
                            ? 'test'
                            : environment.type,
                    ]);
                });
                this.logger.log(`${this.chalk.bold('ENVIRONMENTS')}`, ...table.toString().split('\n'));
                break;
            default:
        }
    }
}
module.exports = EnvironmentsRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JlbmRlcmVycy9lbnZpcm9ubWVudHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUV4QyxNQUFNLG9CQUFvQjtJQUN4QixZQUFZLEVBQUUsYUFBYSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1FBQ2pELGFBQWEsQ0FBQztZQUNaLEtBQUs7WUFDTCxNQUFNO1lBQ04sS0FBSztTQUNOLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxFQUFFLE1BQU07UUFDekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLElBQUksRUFBRSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQztZQUNuQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7WUFDM0IsS0FBSztTQUNOLENBQUMsQ0FBQztRQUVILFFBQVEsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNyQixLQUFLLE1BQU07Z0JBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELE1BQU07WUFDUixLQUFLLE9BQU87Z0JBQ1YsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDakMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDVCxXQUFXLENBQUMsRUFBRTt3QkFDZCxXQUFXLENBQUMsSUFBSTt3QkFDaEIscURBQXFEO3dCQUNyRCxXQUFXLENBQUMsV0FBVyxJQUFJLEVBQUU7d0JBQzdCLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0I7NEJBQzNELENBQUMsQ0FBQyxNQUFNOzRCQUNSLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSTtxQkFDckIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDdkYsTUFBTTtZQUNSLFFBQVE7U0FDVDtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUMifQ==