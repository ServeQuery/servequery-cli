/* eslint-disable global-require */
module.exports = plan => plan
    .addPackage('dependencies', require('./dependencies-plan'))
    .addPackage('env', require('./env-plan'))
    .addUsingClass('logger', () => require('../services/logger'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLXBsYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udGV4dC9sb2dnZXItcGxhbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUN0QixJQUFJO0tBQ0QsVUFBVSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUMxRCxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUN4QyxhQUFhLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMifQ==