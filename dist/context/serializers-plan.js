/* eslint-disable global-require */
module.exports = plan => plan
    .addInstance('applicationTokenSerializer', () => require('../serializers/application-token'))
    .addInstance('applicationTokenDeserializer', () => require('../deserializers/application-token'))
    .addInstance('environmentDeserializer', () => require('../deserializers/environment'))
    .addInstance('environmentSerializer', () => require('../serializers/environment'))
    .addInstance('projectDeserializer', () => require('../deserializers/project'))
    .addInstance('projectSerializer', () => require('../serializers/project'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplcnMtcGxhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L3NlcmlhbGl6ZXJzLXBsYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDdEIsSUFBSTtLQUNELFdBQVcsQ0FBQyw0QkFBNEIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztLQUM1RixXQUFXLENBQUMsOEJBQThCLEVBQUUsR0FBRyxFQUFFLENBQ2hELE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUM5QztLQUNBLFdBQVcsQ0FBQyx5QkFBeUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztLQUNyRixXQUFXLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLDRCQUE0QixDQUFDLENBQUM7S0FDakYsV0FBVyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQzdFLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDIn0=