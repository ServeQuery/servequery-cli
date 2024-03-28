const Context = require('@servequery/context');
const branchDeserializer = require('../deserializers/branch');
const EnvironmentSerializer = require('../serializers/environment');
const { handleErrorWithMeta } = require('../utils/error');
const DiffCommand = require('../commands/schema/diff');
const ERROR_MESSAGE_PROJECT_IN_V1 = 'This project does not support branches yet. Please migrate your environments from your Project settings first.';
const ERROR_MESSAGE_ENV_SECRET_ISSUE = 'Your development environment is not properly set up. Please run `servequery init` first and retry.';
const ERROR_MESSAGE_BRANCH_ALREADY_EXISTS = 'This branch already exists.';
const ERROR_MESSAGE_ADDITIONAL_REMOTE_BRANCHES = "The remote environments can't have additional branches.";
const ERROR_MESSAGE_NO_PRODUCTION_OR_REMOTE_ENVIRONMENT = 'You cannot run branch commands until this project has either a remote or a production environment.';
const ERROR_MESSAGE_NO_REMOTE_ENVIRONMENT = 'You cannot run this command until this project has a remote non-production environment.';
const ERROR_MESSAGE_BRANCH_DOES_NOT_EXIST = "This branch doesn't exist.";
const ERROR_MESSAGE_REMOVE_BRANCH_FAILED = 'Failed to delete branch.';
const ERROR_MESSAGE_NOT_RIGHT_PERMISSION_LEVEL = "You need the 'Admin' or 'Developer' permission level on this project to use branches.";
const ERROR_MESSAGE_ENVIRONMENT_NOT_FOUND = "The environment provided doesn't exist.";
const ERROR_MESSAGE_NO_CURRENT_BRANCH = "You don't have any branch to push. Use `servequery branch` to create one or use `servequery switch` to set your current branch.";
const ERROR_MESSAGE_WRONG_ENVIRONMENT_TYPE = 'The environment on which you are trying to push your modifications is not a remote environment.';
const ERROR_MESSAGE_NO_DESTINATION_BRANCH = "The environment on which you are trying to push your modifications doesn't have current branch.";
function getBranches(envSecret) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .get(`${env.SERVEQUERY_SERVER_URL}/api/branches`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', envSecret)
        .send()
        .then(response => branchDeserializer.deserialize(response.body));
}
function deleteBranch(branchName, environmentSecret) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .del(`${env.SERVEQUERY_SERVER_URL}/api/branches/${encodeURIComponent(branchName)}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', `${environmentSecret}`)
        .send();
}
function createBranch(branchName, environmentSecret, originName) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .post(`${env.SERVEQUERY_SERVER_URL}/api/branches`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', `${environmentSecret}`)
        .send({
        branchName: encodeURIComponent(branchName),
        originName: encodeURIComponent(originName),
    });
}
function pushBranch(environmentSecret) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .post(`${env.SERVEQUERY_SERVER_URL}/api/branches/push`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', `${environmentSecret}`)
        .send();
}
function switchBranch({ id }, environmentSecret) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .put(`${env.SERVEQUERY_SERVER_URL}/api/environments`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', `${environmentSecret}`)
        .send(EnvironmentSerializer.serialize({ currentBranchId: id }));
}
function setOrigin(originEnvironmentName, environmentSecret) {
    const { assertPresent, authenticator, env, superagent: agent } = Context.inject();
    assertPresent({ authenticator, env, superagent: agent });
    const authToken = authenticator.getAuthToken();
    return agent
        .post(`${env.SERVEQUERY_SERVER_URL}/api/branches/set-origin`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('servequery-secret-key', `${environmentSecret}`)
        .send({ originEnvironmentName: encodeURIComponent(originEnvironmentName) });
}
async function handleBranchError(rawError) {
    const { message, meta } = handleErrorWithMeta(rawError);
    switch (message) {
        // NOTICE: When no env/project can be found through envSecret
        case 'Not Found':
            return ERROR_MESSAGE_ENV_SECRET_ISSUE;
        case 'Forbidden':
            return ERROR_MESSAGE_NOT_RIGHT_PERMISSION_LEVEL;
        case 'Environment is not in development.':
            return ERROR_MESSAGE_ADDITIONAL_REMOTE_BRANCHES;
        case 'Dev Workflow disabled.':
            return ERROR_MESSAGE_PROJECT_IN_V1;
        case 'Branch name already exists.':
            return ERROR_MESSAGE_BRANCH_ALREADY_EXISTS;
        case 'No production/remote environment.':
            return ERROR_MESSAGE_NO_PRODUCTION_OR_REMOTE_ENVIRONMENT;
        case 'No remote environment.':
            return ERROR_MESSAGE_NO_REMOTE_ENVIRONMENT;
        case 'Branch does not exist.':
            return ERROR_MESSAGE_BRANCH_DOES_NOT_EXIST;
        case 'Failed to remove branch.':
            return ERROR_MESSAGE_REMOVE_BRANCH_FAILED;
        case 'Environment not found.':
            return ERROR_MESSAGE_ENVIRONMENT_NOT_FOUND;
        case 'No current branch.':
            return ERROR_MESSAGE_NO_CURRENT_BRANCH;
        case 'Environment type should be remote.':
            return ERROR_MESSAGE_WRONG_ENVIRONMENT_TYPE;
        case 'No destination branch.':
            return ERROR_MESSAGE_NO_DESTINATION_BRANCH;
        case 'Source and destination environments must have the same schema. Please check your environments code is synchronized.':
            await new DiffCommand([
                `${meta.environmentIdSource}`,
                `${meta.environmentIdDestination}`,
            ]).runAuthenticated();
            return `Source and destination environments must have the same schema. Please check your environments code is synchronized.\n You can run "schema:diff ${meta.environmentIdSource} ${meta.environmentIdDestination}" to see the schemas differences.`;
        default:
            return message;
    }
}
module.exports = {
    getBranches,
    deleteBranch,
    createBranch,
    pushBranch,
    switchBranch,
    setOrigin,
    handleBranchError,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLW1hbmFnZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VydmljZXMvYnJhbmNoLW1hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFaEQsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztBQUM5RCxNQUFNLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBQ3BFLE1BQU0sRUFBRSxtQkFBbUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzFELE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXZELE1BQU0sMkJBQTJCLEdBQy9CLGdIQUFnSCxDQUFDO0FBQ25ILE1BQU0sOEJBQThCLEdBQ2xDLGdHQUFnRyxDQUFDO0FBQ25HLE1BQU0sbUNBQW1DLEdBQUcsNkJBQTZCLENBQUM7QUFDMUUsTUFBTSx3Q0FBd0MsR0FDNUMseURBQXlELENBQUM7QUFDNUQsTUFBTSxpREFBaUQsR0FDckQsb0dBQW9HLENBQUM7QUFDdkcsTUFBTSxtQ0FBbUMsR0FDdkMseUZBQXlGLENBQUM7QUFDNUYsTUFBTSxtQ0FBbUMsR0FBRyw0QkFBNEIsQ0FBQztBQUN6RSxNQUFNLGtDQUFrQyxHQUFHLDBCQUEwQixDQUFDO0FBQ3RFLE1BQU0sd0NBQXdDLEdBQzVDLHVGQUF1RixDQUFDO0FBQzFGLE1BQU0sbUNBQW1DLEdBQUcseUNBQXlDLENBQUM7QUFDdEYsTUFBTSwrQkFBK0IsR0FDbkMseUhBQXlILENBQUM7QUFDNUgsTUFBTSxvQ0FBb0MsR0FDeEMsaUdBQWlHLENBQUM7QUFDcEcsTUFBTSxtQ0FBbUMsR0FDdkMsaUdBQWlHLENBQUM7QUFFcEcsU0FBUyxXQUFXLENBQUMsU0FBUztJQUM1QixNQUFNLEVBQUUsYUFBYSxFQUFF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