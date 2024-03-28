/**
 * @typedef {{
 *  agent: string;
 *  dbDialect: string;
 *  architecture: string;
 *  isLocal: boolean;
 * }} ProjectMeta
 *
 * @typedef {{
 *  appName: string
 *  appHostname: string
 *  appPort: number
 * }} ProjectConfig
 */
class ProjectCreator {
    /**
     * @param {{
     *   api: import('../../api')
     *   chalk: import('chalk')
     *   keyGenerator: import('../../../utils/key-generator')
     *   messages: import('../../../utils/messages')
     *   terminator: import('../../../utils/terminator')
     * }} dependencies
     */
    constructor({ assertPresent, api, chalk, keyGenerator, messages, terminator }) {
        assertPresent({
            api,
            chalk,
            keyGenerator,
            messages,
            terminator,
        });
        this.api = api;
        this.chalk = chalk;
        this.keyGenerator = keyGenerator;
        this.messages = messages;
        this.terminator = terminator;
    }
    /**
     * @param {string} sessionToken
     * @param {{
     *
     * }} config
     * @param {ProjectMeta} meta
     * @returns {Promise<{id: number, envSecret: string, authSecret: string}>}
     */
    async create(sessionToken, config, meta) {
        try {
            const newProjectPayload = {
                name: config.appName,
                agent: meta.agent,
                architecture: meta.architecture,
                databaseType: meta.dbDialect,
            };
            const newProject = await this.api.createProject(config, sessionToken, newProjectPayload);
            return {
                id: newProject.id,
                envSecret: newProject.defaultEnvironment.secretKey,
                authSecret: this.keyGenerator.generate(),
            };
        }
        catch (error) {
            if (error.message === 'Conflict') {
                error.message = 'A project with this name already exists. Please choose another name.';
            }
            throw error;
        }
    }
}
module.exports = ProjectCreator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC1jcmVhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3Byb2plY3RzL2NyZWF0ZS9wcm9qZWN0LWNyZWF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUVILE1BQU0sY0FBYztJQUNsQjs7Ozs7Ozs7T0FRRztJQUNILFlBQVksRUFBRSxhQUFhLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRTtRQUMzRSxhQUFhLENBQUM7WUFDWixHQUFHO1lBQ0gsS0FBSztZQUNMLFlBQVk7WUFDWixRQUFRO1lBQ1IsVUFBVTtTQUNYLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7UUFDakMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUUsSUFBSTtRQUNyQyxJQUFJO1lBQ0YsTUFBTSxpQkFBaUIsR0FBRztnQkFDeEIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxPQUFPO2dCQUNwQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7Z0JBQ2pCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWTtnQkFDL0IsWUFBWSxFQUFFLElBQUksQ0FBQyxTQUFTO2FBQzdCLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztZQUV6RixPQUFPO2dCQUNMLEVBQUUsRUFBRSxVQUFVLENBQUMsRUFBRTtnQkFDakIsU0FBUyxFQUFFLFVBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTO2dCQUNsRCxVQUFVLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7YUFDekMsQ0FBQztTQUNIO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO2dCQUNoQyxLQUFLLENBQUMsT0FBTyxHQUFHLHNFQUFzRSxDQUFDO2FBQ3hGO1lBRUQsTUFBTSxLQUFLLENBQUM7U0FDYjtJQUNILENBQUM7Q0FDRjtBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsY0FBYyxDQUFDIn0=