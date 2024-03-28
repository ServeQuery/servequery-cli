const { chars } = require('./defaults');
class EnvironmentRenderer {
    constructor({ assertPresent, chalk, logger, Table, diffString }) {
        assertPresent({
            chalk,
            logger,
            Table,
            diffString,
        });
        this.chalk = chalk;
        this.logger = logger;
        this.Table = Table;
        this.diffString = diffString;
    }
    render(environment, config) {
        const table = new this.Table({
            chars,
        });
        switch (config.format) {
            case 'json':
                this.logger.log(JSON.stringify(environment, null, 2));
                break;
            case 'table':
                table.push({ id: environment.id || '' }, { name: environment.name || '' }, { url: environment.apiEndpoint || '' }, { active: environment.isActive || '' }, {
                    type: environment.type === 'remote' && environment.areRolesDisabled
                        ? 'test'
                        : environment.type || '',
                }, { liana: environment.lianaName || '' }, { version: environment.lianaVersion || '' }, { SERVEQUERY_ENV_SECRET: environment.secretKey || '' });
                if (environment.authSecret)
                    table.push({ SERVEQUERY_AUTH_SECRET: environment.authSecret });
                this.logger.log(`${this.chalk.bold('ENVIRONMENT')}`, ...table.toString().split('\n'));
                break;
            default:
        }
    }
    renderApimapDiff(apimapFrom, apimapTo) {
        const diff = this.diffString(apimapFrom, apimapTo);
        if (diff) {
            this.logger.log(this.chalk.bold.yellow('⚠ The schemas have differences.'));
            this.logger.log(diff);
        }
        else {
            this.logger.log(this.chalk.bold.green('√ The schemas are identical.'));
        }
    }
}
module.exports = EnvironmentRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcmVuZGVyZXJzL2Vudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7QUFFeEMsTUFBTSxtQkFBbUI7SUFDdkIsWUFBWSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUU7UUFDN0QsYUFBYSxDQUFDO1lBQ1osS0FBSztZQUNMLE1BQU07WUFDTixLQUFLO1lBQ0wsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQy9CLENBQUM7SUFFRCxNQUFNLENBQUMsV0FBVyxFQUFFLE1BQU07UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLEtBQUs7U0FDTixDQUFDLENBQUM7UUFFSCxRQUFRLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDckIsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxNQUFNO1lBQ1IsS0FBSyxPQUFPO2dCQUNWLEtBQUssQ0FBQyxJQUFJLENBQ1IsRUFBRSxFQUFFLEVBQUUsV0FBVyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFDNUIsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsRUFDaEMsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLFdBQVcsSUFBSSxFQUFFLEVBQUUsRUFDdEMsRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFBSSxFQUFFLEVBQUUsRUFDdEM7b0JBQ0UsSUFBSSxFQUNGLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0I7d0JBQzNELENBQUMsQ0FBQyxNQUFNO3dCQUNSLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUU7aUJBQzdCLEVBQ0QsRUFBRSxLQUFLLEVBQUUsV0FBVyxDQUFDLFNBQVMsSUFBSSxFQUFFLEVBQUUsRUFDdEMsRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLFlBQVksSUFBSSxFQUFFLEVBQUUsRUFDM0MsRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxDQUNuRCxDQUFDO2dCQUNGLElBQUksV0FBVyxDQUFDLFVBQVU7b0JBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUN2RixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLE1BQU07WUFDUixRQUFRO1NBQ1Q7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFFBQVE7UUFDbkMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDbkQsSUFBSSxJQUFJLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsaUNBQWlDLENBQUMsQ0FBQyxDQUFDO1lBQzNFLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3ZCO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQztDQUNGO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQyJ9