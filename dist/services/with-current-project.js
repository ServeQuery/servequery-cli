const Context = require('@servequery/context');
const ProjectManager = require('./project-manager');
module.exports = async function withCurrentProject(config) {
    const { assertPresent, inquirer, spinner } = Context.inject();
    assertPresent({ inquirer, spinner });
    if (config.projectId) {
        return config;
    }
    const projectManager = await new ProjectManager(config);
    const envSecret = config.SERVEQUERY_ENV_SECRET;
    if (envSecret) {
        const { includeLegacy } = config;
        const projectFromEnv = await projectManager.getByEnvSecret(envSecret, includeLegacy);
        if (projectFromEnv) {
            return { ...config, projectId: projectFromEnv.id };
        }
    }
    const projects = await projectManager.listProjects();
    if (projects.length) {
        if (projects.length === 1) {
            return { ...config, projectId: projects[0].id };
        }
        // NOTICE: If a spinner is running, it has to be paused during the prompt and resumed after.
        const existingSpinner = spinner.isRunning();
        if (existingSpinner)
            spinner.pause();
        const response = await inquirer.prompt([
            {
                name: 'project',
                message: 'Select your project',
                type: 'list',
                choices: projects.map(project => ({ name: project.name, value: project.id })),
            },
        ]);
        if (existingSpinner)
            spinner.continue();
        return { ...config, projectId: response.project };
    }
    throw new Error("You don't have any project yet.");
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aC1jdXJyZW50LXByb2plY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvd2l0aC1jdXJyZW50LXByb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFaEQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFcEQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLFVBQVUsa0JBQWtCLENBQUMsTUFBTTtJQUN2RCxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUQsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFckMsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3BCLE9BQU8sTUFBTSxDQUFDO0tBQ2Y7SUFFRCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXhELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztJQUMzQyxJQUFJLFNBQVMsRUFBRTtRQUNiLE1BQU0sRUFBRSxhQUFhLEVBQUUsR0FBRyxNQUFNLENBQUM7UUFDakMsTUFBTSxjQUFjLEdBQUcsTUFBTSxjQUFjLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNyRixJQUFJLGNBQWMsRUFBRTtZQUNsQixPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNwRDtLQUNGO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckQsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ25CLElBQUksUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekIsT0FBTyxFQUFFLEdBQUcsTUFBTSxFQUFFLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7U0FDakQ7UUFFRCw0RkFBNEY7UUFDNUYsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQzVDLElBQUksZUFBZTtZQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNyQyxNQUFNLFFBQVEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDckM7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLHFCQUFxQjtnQkFDOUIsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzlFO1NBQ0YsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxlQUFlO1lBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxHQUFHLE1BQU0sRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ25EO0lBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBQ3JELENBQUMsQ0FBQyJ9