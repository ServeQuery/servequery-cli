const Context = require('@servequery/context');
const EnvironmentManager = require('./environment-manager');
module.exports = async function askForEnvironment(config, message, availableEnvironmentTypes = []) {
    const { assertPresent, inquirer } = Context.inject();
    assertPresent({ inquirer });
    const environments = await new EnvironmentManager(config).listEnvironments();
    const availableEnvironments = environments.filter(environment => availableEnvironmentTypes.includes(environment.type));
    if (availableEnvironments.length) {
        const response = await inquirer.prompt([
            {
                name: 'environment',
                message,
                type: 'list',
                choices: availableEnvironments.map(({ name }) => name),
            },
        ]);
        return response.environment;
    }
    throw new Error(`No ${availableEnvironmentTypes.join('/')} environment.`);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNrLWZvci1lbnZpcm9ubWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hc2stZm9yLWVudmlyb25tZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLFVBQVUsaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsR0FBRyxFQUFFO0lBQy9GLE1BQU0sRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3JELGFBQWEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFNUIsTUFBTSxZQUFZLEdBQUcsTUFBTSxJQUFJLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDN0UsTUFBTSxxQkFBcUIsR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQzlELHlCQUF5QixDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQ3JELENBQUM7SUFFRixJQUFJLHFCQUFxQixDQUFDLE1BQU0sRUFBRTtRQUNoQyxNQUFNLFFBQVEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxNQUFNLENBQUM7WUFDckM7Z0JBQ0UsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLE9BQU87Z0JBQ1AsSUFBSSxFQUFFLE1BQU07Z0JBQ1osT0FBTyxFQUFFLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQzthQUN2RDtTQUNGLENBQUMsQ0FBQztRQUNILE9BQU8sUUFBUSxDQUFDLFdBQVcsQ0FBQztLQUM3QjtJQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzVFLENBQUMsQ0FBQyJ9