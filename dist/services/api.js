const HEADER_CONTENT_TYPE = 'Content-Type';
const HEADER_CONTENT_TYPE_JSON = 'application/json';
const HEADER_SERVEQUERY_ORIGIN = 'servequery-origin';
const HEADER_USER_AGENT = 'User-Agent';
/**
 * @class
 * @param {import('../context/plan').Context} context
 */
function Api({ pkg, env, superagent: agent, applicationTokenSerializer, applicationTokenDeserializer, environmentDeserializer, environmentSerializer, projectDeserializer, projectSerializer, }) {
    this.endpoint = () => env.SERVEQUERY_SERVER_URL;
    this.userAgent = `servequery-cli@${pkg.version}`;
    const headers = {
        [HEADER_SERVEQUERY_ORIGIN]: 'servequery-cli',
        [HEADER_CONTENT_TYPE]: HEADER_CONTENT_TYPE_JSON,
        [HEADER_USER_AGENT]: this.userAgent,
    };
    this.login = async (email, password) => agent
        .post(`${this.endpoint()}/api/sessions`)
        .set(headers)
        .send({ email, password })
        .then(response => response.body.token);
    /**
     * @param {import('../serializers/application-token').InputApplicationToken} applicationToken
     * @param {string} sessionToken
     * @returns {Promise<import('../deserializers/application-token').ApplicationToken>}
     */
    this.createApplicationToken = async (applicationToken, sessionToken) => agent
        .post(`${this.endpoint()}/api/application-tokens`)
        .set(headers)
        .set('Authorization', `Bearer ${sessionToken}`)
        .send(applicationTokenSerializer.serialize(applicationToken))
        .then(response => applicationTokenDeserializer.deserialize(response.body));
    /**
     * @param {string} sessionToken
     * @returns {Promise<import('../deserializers/application-token').ApplicationToken>}
     */
    this.deleteApplicationToken = async (sessionToken) => {
        try {
            await agent
                .delete(`${this.endpoint()}/api/application-tokens`)
                .set(HEADER_SERVEQUERY_ORIGIN, 'servequery-cli')
                .set(HEADER_CONTENT_TYPE, HEADER_CONTENT_TYPE_JSON)
                .set(HEADER_USER_AGENT, this.userAgent)
                .set('Authorization', `Bearer ${sessionToken}`)
                .send();
        }
        catch (error) {
            if (error.code === 'ERR_INVALID_CHAR' && error?.message.includes('"Authorization"')) {
                // token is wrong. silencing this error since it cannot be used for auth anyway.
            }
            else {
                throw error;
            }
        }
    };
    this.createProject = async (config, sessionToken, project) => {
        let newProject;
        try {
            newProject = await agent
                .post(`${this.endpoint()}/api/projects`)
                .set(HEADER_CONTENT_TYPE, HEADER_CONTENT_TYPE_JSON)
                .set(HEADER_USER_AGENT, this.userAgent)
                .set('Authorization', `Bearer ${sessionToken}`)
                .send(projectSerializer.serialize(project))
                .then(response => projectDeserializer.deserialize(response.body));
        }
        catch (error) {
            if (error.message === 'Conflict') {
                const { projectId } = error.response.body.errors[0].meta;
                if (!projectId) {
                    throw error;
                }
                newProject = await agent
                    .get(`${this.endpoint()}/api/projects/${projectId}`)
                    .set('Authorization', `Bearer ${sessionToken}`)
                    .set(HEADER_USER_AGENT, this.userAgent)
                    .send()
                    .then(response => projectDeserializer.deserialize(response.body));
                // NOTICE: Avoid to erase an existing project that has been already initialized.
                if (newProject.initializedAt) {
                    throw error;
                }
            }
            else {
                throw error;
            }
        }
        const hostname = config.appHostname || 'http://localhost';
        const port = config.appPort || 3310;
        const protocol = hostname.startsWith('http') ? '' : 'http://';
        newProject.defaultEnvironment.apiEndpoint = `${protocol}${hostname}:${port}`;
        const updatedEnvironment = await agent
            .put(`${this.endpoint()}/api/environments/${newProject.defaultEnvironment.id}`)
            .set(HEADER_CONTENT_TYPE, HEADER_CONTENT_TYPE_JSON)
            .set(HEADER_USER_AGENT, this.userAgent)
            .set('Authorization', `Bearer ${sessionToken}`)
            .send(environmentSerializer.serialize(newProject.defaultEnvironment))
            .then(response => environmentDeserializer.deserialize(response.body));
        newProject.defaultEnvironment.secretKey = updatedEnvironment.secretKey;
        return newProject;
    };
}
module.exports = Api;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2FwaS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLG1CQUFtQixHQUFHLGNBQWMsQ0FBQztBQUMzQyxNQUFNLHdCQUF3QixHQUFHLGtCQUFrQixDQUFDO0FBQ3BELE1BQU0sb0JBQW9CLEdBQUcsZUFBZSxDQUFDO0FBQzdDLE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDO0FBRXZDOzs7R0FHRztBQUNILFNBQVMsR0FBRyxDQUFDLEVBQ1gsR0FBRyxFQUNILEdBQUcsRUFDSCxVQUFVLEVBQUUsS0FBSyxFQUNqQiwwQkFBMEIsRUFDMUIsNEJBQTRCLEVBQzVCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsbUJBQW1CLEVBQ25CLGlCQUFpQixHQUNsQjtJQUNDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO0lBQzVDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDN0MsTUFBTSxPQUFPLEdBQUc7UUFDZCxDQUFDLG9CQUFvQixDQUFDLEVBQUUsWUFBWTtRQUNwQyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsd0JBQXdCO1FBQy9DLENBQUMsaUJBQWlCLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUztLQUNwQyxDQUFDO0lBRUYsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQ3JDLEtBQUs7U0FDRixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQztTQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDO1NBQ1osSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxDQUFDO1NBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJ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