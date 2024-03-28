const JSONAPISerializer = require('jsonapi-serializer').Serializer;
/**
 * @typedef {{ name: string }} InputApplicationToken
 */
const applicationTokenSerializer = new JSONAPISerializer('application-tokens', {
    attributes: ['name'],
});
module.exports = applicationTokenSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tdG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplcnMvYXBwbGljYXRpb24tdG9rZW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFFbkU7O0dBRUc7QUFFSCxNQUFNLDBCQUEwQixHQUFHLElBQUksaUJBQWlCLENBQUMsb0JBQW9CLEVBQUU7SUFDN0UsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO0NBQ3JCLENBQUMsQ0FBQztBQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcsMEJBQTBCLENBQUMifQ==