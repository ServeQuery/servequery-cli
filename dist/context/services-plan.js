/* eslint-disable global-require */
module.exports = plan => plan
    .addPackage('dependencies', planDependencies => planDependencies
    .addUsingClass('api', () => require('../services/api'))
    .addUsingClass('oidcAuthenticator', () => require('../services/oidc/authenticator').default)
    .addUsingClass('applicationTokenService', () => require('../services/application-token')))
    .addPackage('authenticator', planAuthenticator => planAuthenticator.addUsingClass('authenticator', () => require('../services/authenticator')));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZXMtcGxhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L3NlcnZpY2VzLXBsYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDdEIsSUFBSTtLQUNELFVBQVUsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLENBQUMsRUFBRSxDQUM3QyxnQkFBZ0I7S0FDYixhQUFhLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0tBQ3RELGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDM0YsYUFBYSxDQUFDLHlCQUF5QixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQzVGO0tBQ0EsVUFBVSxDQUFDLGVBQWUsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLENBQy9DLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxlQUFlLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDJCQUEyQixDQUFDLENBQUMsQ0FDN0YsQ0FBQyJ9