/* eslint-disable global-require */
module.exports = plan => plan
    .addUsingClass('keyGenerator', () => require('../utils/key-generator'))
    .addUsingClass('logger', () => require('../services/logger'))
    .addUsingClass('eventSender', () => require('../utils/event-sender'))
    .addUsingFunction('terminator', require('../utils/terminator'))
    .addValue('messages', require('../utils/messages'))
    .addFunction('toValidPackageName', require('../utils/to-valid-package-name'))
    .addFunction('buildDatabaseUrl', require('../utils/database-url').default)
    .addFunction('isDatabaseLocal', require('../utils/database-url').isDatabaseLocal)
    .addUsingClass('strings', () => require('../utils/strings').default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMtcGxhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L3V0aWxzLXBsYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DO0FBQ25DLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FDdEIsSUFBSTtLQUNELGFBQWEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDdEUsYUFBYSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUM1RCxhQUFhLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0tBQ3BFLGdCQUFnQixDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUM5RCxRQUFRLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0tBQ2xELFdBQVcsQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUM1RSxXQUFXLENBQUMsa0JBQWtCLEVBQUUsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ3pFLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxlQUFlLENBQUM7S0FDaEYsYUFBYSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyJ9