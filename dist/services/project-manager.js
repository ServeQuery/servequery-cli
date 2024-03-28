const querystring = require('querystring');
const agent = require('superagent');
const Context = require('@servequery/context');
const ProjectSerializer = require('../serializers/project');
const ProjectDeserializer = require('../deserializers/project');
const EnvironmentDeserializer = require('../deserializers/environment');
function ProjectManager(config) {
    const { assertPresent, authenticator, env, jwtDecode, lodash } = Context.inject();
    assertPresent({ authenticator, env, jwtDecode, lodash });
    function deserialize(response) {
        const attrs = Object.assign(ProjectSerializer.opts.attributes);
        attrs.push('id');
        return ProjectDeserializer.deserialize(response.body).then(deserialized => {
            if (Array.isArray(deserialized)) {
                return deserialized.map(d => lodash.pick(d, attrs));
            }
            return lodash.pick(deserialized, attrs);
        });
    }
    this.listProjects = async () => {
        const authToken = authenticator.getAuthToken();
        const authTokenDecode = jwtDecode(authToken);
        const queryParams = querystring.stringify({
            ...(authTokenDecode.organizationId ? { organizationId: authTokenDecode.organizationId } : {}),
        });
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects${queryParams ? `?${queryParams}` : ''}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send()
            .then(response => deserialize(response));
    };
    this.getByEnvSecret = async (envSecret, includeLegacy = false) => {
        const authToken = authenticator.getAuthToken();
        const includeLegacyParameter = includeLegacy ? '&includeLegacy' : '';
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects?envSecret${includeLegacyParameter}`)
            .set('Authorization', `Bearer ${authToken}`)
            .set('servequery-secret-key', envSecret)
            .send()
            .then(response => deserialize(response));
    };
    this.getProject = async () => {
        const authToken = authenticator.getAuthToken();
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects/${config.projectId}`)
            .set('Authorization', `Bearer ${authToken}`)
            .send()
            .then(response => deserialize(response));
    };
    this.getProjectForDevWorkflow = async () => {
        const authToken = authenticator.getAuthToken();
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects/${config.projectId}/dev-workflow`)
            .set('Authorization', `Bearer ${authToken}`)
            .send()
            .then(response => deserialize(response));
    };
    this.getDevelopmentEnvironmentForUser = async (projectId) => {
        const authToken = authenticator.getAuthToken();
        return agent
            .get(`${env.SERVEQUERY_SERVER_URL}/api/projects/${projectId}/development-environment-for-user`)
            .set('Authorization', `Bearer ${authToken}`)
            .send()
            .then(response => EnvironmentDeserializer.deserialize(response.body));
    };
}
module.exports = ProjectManager;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL3Byb2plY3QtbWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3BDLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDNUQsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUNoRSxNQUFNLHVCQUF1QixHQUFHLE9BQU8sQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0FBRXhFLFNBQVMsY0FBYyxDQUFDLE1BQU07SUFDNUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEYsYUFBYSxDQUFDLEVBQUUsYUFBYSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUV6RCxTQUFTLFdBQVcsQ0FBQyxRQUFRO1FBQzNCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQy9ELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFakIsT0FBTyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUN4RSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUU7Z0JBQy9CLE9BQU8s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