/* eslint-disable global-require */
module.exports = plan => plan
    .addPackage('dependencies', require('./dependencies-plan'))
    .addPackage('env', require('./env-plan'))
    .addPackage('process', require('./process-plan'))
    .addPackage('utils', require('./utils-plan'))
    .addPackage('serializers', require('./serializers-plan'))
    .addPackage('services', require('./services-plan'))
    .addPackage('renderers', require('./renderers-plan'))
    .addPackage('commandProjectCommon', require('./command-projects-common-plan'))
    .addPackage('commandProjectCreate', require('./command-project-create-plan'))
    .addPackage('commandProjectUpdate', require('./command-schema-update-command-plan'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L3BsYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDdEIsSUFBSTtLQUNELFVBQVUsQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDMUQsVUFBVSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7S0FDeEMsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNoRCxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztLQUM1QyxVQUFVLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0tBQ3hELFVBQVUsQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7S0FDbEQsVUFBVSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztLQUNwRCxVQUFVLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7S0FDN0UsVUFBVSxDQUFDLHNCQUFzQixFQUFFLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0tBQzVFLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsc0NBQXNDLENBQUMsQ0FBQyxDQUFDIn0=