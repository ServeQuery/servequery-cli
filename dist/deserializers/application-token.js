const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
/**
 * @typedef {{
 *  id: string;
 *  name: string;
 *  token: string;
 * }} ApplicationToken
 */
const applicationTokenDeserializer = new JSONAPIDeserializer({
    keyForAttribute: 'camelCase',
});
module.exports = applicationTokenDeserializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb24tdG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVzZXJpYWxpemVycy9hcHBsaWNhdGlvbi10b2tlbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLG1CQUFtQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUV2RTs7Ozs7O0dBTUc7QUFFSCxNQUFNLDRCQUE0QixHQUFHLElBQUksbUJBQW1CLENBQUM7SUFDM0QsZUFBZSxFQUFFLFdBQVc7Q0FDN0IsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQyJ9