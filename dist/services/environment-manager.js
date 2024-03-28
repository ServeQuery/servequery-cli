const agent = require('superagent');
const Context = require('@servequery/context');
const EnvironmentSerializer = require('../serializers/environment');
const environmentDeserializer = require('../deserializers/environment');
const { handleError } = require('../utils/error');
function EnvironmentManager(config) {
    const { assertPresent, authenticator, env, keyGenerator } = Context.inject();
    assertPresent({ authenticator, env, keyGenerator });
    this.listEnvironments = async () => {
        const authToken = authenticator.getAuthToken();
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects/${config.projectId}/environments`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-project-id', config.projectId)
            .send()
            .then(response => environmentDeserializer.deserialize(response.body));
    };
    this.getEnvironment = async (environmentId) => {
        const authToken = authenticator.getAuthToken();
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/environments/${environmentId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-environment-id', environmentId)
            .send()
            .then(response => environmentDeserializer.deserialize(response.body));
    };
    this.getEnvironmentApimap = async (environmentId) => {
        const authToken = authenticator.getAuthToken();
        const response = await agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/apimaps/${environmentId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-environment-id', environmentId)
            .send();
        return response.body.data.apimap;
    };
    this.createEnvironment = async () => {
        const authToken = authenticator.getAuthToken();
        const response = await agent
            .post(`${env.SERVEQUERY_SERVER_URL}/api/environments`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-project-id', config.projectId)
            .send(EnvironmentSerializer.serialize({
            name: config.name,
            apiEndpoint: config.url,
            project: { id: config.projectId },
            areRolesDisabled: config.disableRoles,
        }));
        const environment = await environmentDeserializer.deserialize(response.body);
        environment.authSecret = keyGenerator.generate();
        return environment;
    };
    this.createDevelopmentEnvironment = async (projectId, endpoint) => {
        const authToken = authenticator.getAuthToken();
        return agent
            .post(`${env.SERVEQUERY_SERVER_URL}/api/projects/${projectId}/development-environment-for-user`)
            .set('Authorization', `Bearer ${authToken}`)
            .send({ endpoint })
            .then(response => environmentDeserializer.deserialize(response.body));
    };
    this.updateEnvironment = async () => {
        const authToken = authenticator.getAuthToken();
        return agent
            .put(`${env.SERVEQUERY_SERVER_URL}/api/environments/${config.environmentId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send(EnvironmentSerializer.serialize({
            name: config.name,
            apiEndpoint: config.url,
        }));
    };
    this.deleteEnvironment = async (environmentId) => {
        const authToken = authenticator.getAuthToken();
        return agent
            .del(`${env.SERVEQUERY_SERVER_URL}/api/environments/${environmentId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-environment-id', environmentId);
    };
    this.reset = async (environmentName, environmentSecret) => {
        const authToken = authenticator.getAuthToken();
        return agent
            .post(`${env.SERVEQUERY_SERVER_URL}/api/environments/reset`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-secret-key', `${environmentSecret}`)
            .send({ environmentName });
    };
    /**
     * Deploy layout changes of an environment to production.
     * @param {Number} environment.id - The environment id that contains the layout changes to deploy.
     */
    this.deploy = () => {
        const authToken = authenticator.getAuthToken();
        return agent
            .post(`${env.SERVEQUERY_SERVER_URL}/api/environments/deploy`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-secret-key', `${config.envSecret}`);
    };
    this.handleEnvironmentError = rawError => {
        const error = handleError(rawError);
        if (error === 'Forbidden') {
            return 'You do not have the permission to perform this action on the given environments.';
        }
        return error;
    };
}
module.exports = EnvironmentManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9lbnZpcm9ubWVudC1tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVoRCxNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ3BFLE1BQU0sdUJBQXVCLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDeEUsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBRWxELFNBQVMsa0JBQWtCLENBQUMsTUFBTTtJQUNoQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzdFLGFBQWEsQ0FBQyxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsWUFBWSxFQUFFLENBQUMsQ0FBQztJQUVwRCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxJQUFJLEVBQUU7UUFDakMsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRS9DLE9BQU8sS0FBSzthQUNULEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxpQkFBaUIsaUJBQWlCLE1BQU0sQ0FBQyxTQUFTLGVBQWUsQ0FBQzthQUM3RSxHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsU0FBUyxFQUFFLENBQUM7YUFDM0MsR0FBRyxDQUFDLG1CQUFtQixFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDMUMsSUFBSSxFQUFFO2FBQ04sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsV0FB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