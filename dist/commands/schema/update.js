const { Flags } = require('@oclif/core');
const AbstractCommand = require('../../abstract-command').default;
const StaticContext = require('../../context/static');
class UpdateCommand extends AbstractCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, path, schemaService } = this.context;
        assertPresent({
            env,
            path,
            schemaService,
        });
        this.env = env;
        this.path = path;
        this.schemaService = schemaService;
    }
    async run() {
        const parsed = await this.parse(UpdateCommand);
        const commandOptions = { ...parsed.flags, ...parsed.args };
        const options = {
            isUpdate: true,
            outputDirectory: commandOptions.outputDirectory,
            dbSchema: this.env.DATABASE_SCHEMA,
            dbConfigPath: commandOptions.config,
        };
        await this.schemaService.update(options);
    }
}
UpdateCommand.description = 'Refresh your schema by generating files that do not currently exist.';
UpdateCommand.flags = (() => {
    const { assertPresent, path } = StaticContext.init();
    assertPresent({
        path,
    });
    return {
        config: Flags.string({
            char: 'c',
            default: () => path.join('config', 'databases.js'),
            dependsOn: [],
            description: 'Database configuration file to use.',
            exclusive: [],
            required: false,
        }),
        outputDirectory: Flags.string({
            char: 'o',
            dependsOn: [],
            description: 'Output directory where to generate new files.',
            exclusive: [],
            required: false,
        }),
    };
})();
UpdateCommand.args = {};
module.exports = UpdateCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbW1hbmRzL3NjaGVtYS91cGRhdGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN6QyxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDbEUsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFdEQsTUFBTSxhQUFjLFNBQVEsZUFBZTtJQUN6QyxZQUFZLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUM1QixLQUFLLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNqRSxhQUFhLENBQUM7WUFDWixHQUFHO1lBQ0gsSUFBSTtZQUNKLGFBQWE7U0FDZCxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsR0FBRztRQUNQLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMvQyxNQUFNLGNBQWMsR0FBRyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUUzRCxNQUFNLE9BQU8sR0FBRztZQUNkLFFBQVEsRUFBRSxJQUFJO1lBQ2QsZUFBZSxFQUFFLGNBQWMsQ0FBQyxlQUFlO1lBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWU7WUFDbEMsWUFBWSxFQUFFLGNBQWMsQ0FBQyxNQUFNO1NBQ3BDLENBQUM7UUFFRixNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQUVELGFBQWEsQ0FBQyxXQUFXLEdBQUcsc0VBQXNFLENBQUM7QUFFbkcsYUFBYSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsRUFBRTtJQUMxQixNQUFNLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxHQUFHLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyRCxhQUFhLENBQUM7UUFDWixJQUFJO0tBQ0wsQ0FBQyxDQUFDO0lBRUgsT0FBTztRQUNMLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ25CLElBQUksRUFBRSxHQUFHO1lBQ1QsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLGNBQWMsQ0FBQztZQUNsRCxTQUFTLEVBQUUsRUFBRTtZQUNiLFdBQVcsRUFBRSxxQ0FBcUM7WUFDbEQsU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO1FBQ0YsZUFBZSxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDNUIsSUFBSSxFQUFFLEdBQUc7WUFDVCxTQUFTLEVBQUUsRUFBRTtZQUNiLFdBQVcsRUFBRSwrQ0FBK0M7WUFDNUQsU0FBUyxFQUFFLEVBQUU7WUFDYixRQUFRLEVBQUUsS0FBSztTQUNoQixDQUFDO0tBQ0gsQ0FBQztBQUNKLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFFTCxhQUFhLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUV4QixNQUFNLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyJ9