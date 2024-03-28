/* eslint-disable global-require */
module.exports = plan => plan
    .addUsingClass('environmentRenderer', () => require('../renderers/environment'))
    .addUsingClass('environmentsRenderer', () => require('../renderers/environments'))
    .addUsingClass('projectRenderer', () => require('../renderers/project'))
    .addUsingClass('projectsRenderer', () => require('../renderers/projects'))
    .addUsingClass('branchesRenderer', () => require('../renderers/branches'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXJzLXBsYW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udGV4dC9yZW5kZXJlcnMtcGxhbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUN0QixJQUFJO0tBQ0QsYUFBYSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQy9FLGFBQWEsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztLQUNqRixhQUFhLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDdkUsYUFBYSxDQUFDLGtCQUFrQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3pFLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDIn0=