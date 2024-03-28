/* eslint-disable global-require */
module.exports = plan => plan
    .addModule('Sequelize', () => require('sequelize'))
    .addModule('mongodb', () => require('mongodb'))
    .addModule('Handlebars', () => require('handlebars'))
    .addUsingClass('database', () => require('../services/schema/update/database'))
    .addUsingClass('agentNodejsDumper', () => require('../services/dumpers/agent-nodejs').default)
    .addUsingClass('servequeryExpressDumper', () => require('../services/dumpers/servequery-express'))
    .addModule('optionParser', () => require('../utils/option-parser'))
    .addUsingClass('projectCreator', () => require('../services/projects/create/project-creator'))
    .addUsingClass('spinner', () => require('../services/spinner'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1wcm9qZWN0LWNyZWF0ZS1wbGFuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRleHQvY29tbWFuZC1wcm9qZWN0LWNyZWF0ZS1wbGFuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQztBQUNuQyxNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQ3RCLElBQUk7S0FDRCxTQUFTLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNsRCxTQUFTLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUM5QyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUNwRCxhQUFhLENBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQzlFLGFBQWEsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxPQUFPLENBQUM7S0FDN0YsYUFBYSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0tBQ3pGLFNBQVMsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7S0FDbEUsYUFBYSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0tBQzdGLGFBQWEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyJ9