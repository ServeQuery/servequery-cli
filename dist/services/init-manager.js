const chalk = require('chalk');
const clipboardy = require('clipboardy');
const fs = require('fs');
const { EOL } = require('os');
const Context = require('@servequery/context');
const { handleError } = require('../utils/error');
const { getInteractiveOptions } = require('../utils/option-parser');
const projectCreateOptions = require('./projects/create/options');
const SUCCESS_MESSAGE_ENV_VARIABLES_COPIED_IN_ENV_FILE = 'Copying the environment variables in your `.env` file';
const SUCCESS_MESSAGE_ENV_FILE_CREATED_AND_FILLED = 'Creating a new `.env` file containing your environment variables';
const SUCCESS_MESSAGE_DISPLAY_ENV_VARIABLES = 'Here are the environment variables you need to copy in your configuration file:\n';
const SUCCESS_MESSAGE_ENV_VARIABLES_COPIED_TO_CLIPBOARD = 'Automatically copied to your clipboard!';
const ERROR_MESSAGE_PROJECT_IN_V1 = 'This project does not support branches yet. Please migrate your environments from your Project settings first.';
const ERROR_MESSAGE_NOT_RIGHT_PERMISSION_LEVEL = "You need the 'Admin' or 'Developer' permission level on this project to use branches.";
const ERROR_MESSAGE_PROJECT_BY_ENV_NOT_FOUND = 'Your project was not found. Please check your environment secret.';
const ERROR_MESSAGE_PROJECT_BY_OPTION_NOT_FOUND = 'The project you specified does not exist.';
const ERROR_MESSAGE_NO_PRODUCTION_OR_REMOTE_ENVIRONMENT = 'You cannot create your development environment until this project has either a remote or a production environment.';
const ERROR_MESSAGE_ENVIRONMENT_OWNER_UNICITY = 'You already have a development environment on this project.';
const VALIDATION_REGEX_URL = /^https?:\/\/.*/i;
const VALIDATION_REGEX_HTTPS = /^http((s:\/\/.*)|(s?:\/\/(localhost|127\.0\.0\.1).*))/i;
const SPLIT_URL_REGEX = new RegExp('(\\w+)://([\\w\\-\\.]+)(:(\\d+))?');
const ENV_VARIABLES_AUTO_FILLING_PREFIX = '\n\n# ℹ️ The content below was automatically added by the `servequery init` command ⤵️\n';
function handleInitError(rawError) {
    const error = handleError(rawError);
    switch (error) {
        case 'Dev Workflow disabled.':
            return ERROR_MESSAGE_PROJECT_IN_V1;
        case 'Forbidden':
            return ERROR_MESSAGE_NOT_RIGHT_PERMISSION_LEVEL;
        case 'Project by env secret not found':
            return ERROR_MESSAGE_PROJECT_BY_ENV_NOT_FOUND;
        case 'Project not found':
            return ERROR_MESSAGE_PROJECT_BY_OPTION_NOT_FOUND;
        case 'No production/remote environment.':
            return ERROR_MESSAGE_NO_PRODUCTION_OR_REMOTE_ENVIRONMENT;
        case 'A user can have only one development environment per project.':
            return ERROR_MESSAGE_ENVIRONMENT_OWNER_UNICITY;
        case 'An environment with this name already exists. Please choose another name.':
            return ERROR_MESSAGE_ENVIRONMENT_OWNER_UNICITY;
        default:
            return error;
    }
}
async function handleDatabaseConfiguration() {
    const { inquirer, env } = Context.inject();
    const response = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'confirm',
            message: "You don't have a DATABASE_URL yet. Do you need help setting it?",
        },
    ]);
    if (!response.confirm)
        return null;
    return getInteractiveOptions({
        databaseDialect: projectCreateOptions.databaseDialectV1,
        databaseName: projectCreateOptions.databaseName,
        databaseSchema: projectCreateOptions.databaseSchema,
        databaseHost: projectCreateOptions.databaseHost,
        databasePort: projectCreateOptions.databasePort,
        databaseUser: projectCreateOptions.databaseUser,
        databasePassword: projectCreateOptions.databasePassword,
        databaseSSL: projectCreateOptions.databaseSSL,
        mongoDBSRV: projectCreateOptions.mongoDBSRV,
    }, env);
}
function validateEndpoint(input) {
    if (!VALIDATION_REGEX_URL.test(input)) {
        return 'Application input must be a valid url.';
    }
    if (!VALIDATION_REGEX_HTTPS.test(input)) {
        return 'HTTPS protocol is mandatory, except for localhost and 127.0.0.1.';
    }
    return true;
}
function getApplicationPortFromCompleteEndpoint(endpoint) {
    return endpoint.match(SPLIT_URL_REGEX)[4];
}
function getContentToAddInDotenvFile(environmentVariables) {
    const { keyGenerator } = Context.inject();
    const authSecret = keyGenerator.generate();
    let contentToAddInDotenvFile = '';
    if (environmentVariables.applicationPort) {
        contentToAddInDotenvFile += `APPLICATION_PORT=${environmentVariables.applicationPort}\n`;
    }
    if (environmentVariables.databaseUrl) {
        contentToAddInDotenvFile += `DATABASE_URL=${environmentVariables.databaseUrl}\n`;
    }
    if (environmentVariables.databaseSchema) {
        contentToAddInDotenvFile += `DATABASE_SCHEMA=${environmentVariables.databaseSchema}\n`;
    }
    if (environmentVariables.databaseSSL !== undefined) {
        contentToAddInDotenvFile += `DATABASE_SSL=${environmentVariables.databaseSSL}\n`;
    }
    contentToAddInDotenvFile += `SERVEQUERY_AUTH_SECRET=${authSecret}\n`;
    contentToAddInDotenvFile += `SERVEQUERY_ENV_SECRET=${environmentVariables.servequeryEnvSecret}`;
    contentToAddInDotenvFile += EOL;
    return contentToAddInDotenvFile;
}
function commentExistingVariablesInAFile(fileData, environmentVariables) {
    const variablesToComment = {
        'SERVEQUERY_AUTH_SECRET=': '# SERVEQUERY_AUTH_SECRET=',
        'SERVEQUERY_ENV_SECRET=': '# SERVEQUERY_ENV_SECRET=',
    };
    if (environmentVariables.applicationPort) {
        variablesToComment['APPLICATION_PORT='] = '# APPLICATION_PORT=';
    }
    if (environmentVariables.databaseUrl) {
        variablesToComment['DATABASE_URL='] = '# DATABASE_URL=';
        variablesToComment['DATABASE_SCHEMA='] = '# DATABASE_SCHEMA=';
        variablesToComment['DATABASE_SSL='] = '# DATABASE_SSL=';
    }
    const variablesToCommentRegex = new RegExp(Object.keys(variablesToComment)
        .map(key => `((?<!# )${key})`)
        .join('|'), 'g');
    return fileData.replace(variablesToCommentRegex, match => variablesToComment[match]);
}
function amendDotenvFile(environmentVariables) {
    const { assertPresent, spinner } = Context.inject();
    assertPresent({ spinner });
    let newEnvFileData = getContentToAddInDotenvFile(environmentVariables);
    spinner.start({ text: SUCCESS_MESSAGE_ENV_VARIABLES_COPIED_IN_ENV_FILE });
    const existingEnvFileData = fs.readFileSync('.env', 'utf8');
    if (existingEnvFileData) {
        const amendedExistingFileData = commentExistingVariablesInAFile(existingEnvFileData, environmentVariables);
        // NOTICE: We add the prefix only if the existing file was not empty.
        newEnvFileData = amendedExistingFileData + ENV_VARIABLES_AUTO_FILLING_PREFIX + newEnvFileData;
    }
    fs.writeFileSync('.env', newEnvFileData);
    spinner.success();
}
function createDotenvFile(environmentVariables) {
    const { assertPresent, spinner } = Context.inject();
    assertPresent({ spinner });
    const contentToAdd = getContentToAddInDotenvFile(environmentVariables);
    spinner.start({ text: SUCCESS_MESSAGE_ENV_FILE_CREATED_AND_FILLED });
    fs.writeFileSync('.env', contentToAdd);
    spinner.success();
}
async function displayEnvironmentVariablesAndCopyToClipboard(environmentVariables) {
    const { logger } = Context.inject();
    const variablesToDisplay = getContentToAddInDotenvFile(environmentVariables);
    logger.info(SUCCESS_MESSAGE_DISPLAY_ENV_VARIABLES + chalk.black.bgCyan(variablesToDisplay));
    await clipboardy
        .write(variablesToDisplay)
        .then(() => logger.info(chalk.italic(SUCCESS_MESSAGE_ENV_VARIABLES_COPIED_TO_CLIPBOARD)))
        .catch(() => null);
}
module.exports = {
    handleInitError,
    handleDatabaseConfiguration,
    validateEndpoint,
    getApplicationPortFromCompleteEndpoint,
    amendDotenvFile,
    createDotenvFile,
    displayEnvironmentVariablesAndCopyToClipboard,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZpY2VzL2luaXQtbWFuYWdlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3pDLE1BQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzlCLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRWhELE1BQU0sRUFBRSxXQUFXLEVBQUUsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNsRCxNQUFNLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUNwRSxNQUFNLG9CQUFvQixHQUFHLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRWxFLE1BQU0sZ0RBQWdELEdBQ3BELHVEQUF1RCxDQUFDO0FBQzFELE1BQU0sMkNBQTJDLEdBQy9DLGtFQUFrRSxDQUFDO0FBQ3JFLE1BQU0scUNBQXFDLEdBQ3pDLG1GQUFtRixDQUFDO0FBQ3RGLE1BQU0saURBQWlELEdBQUcseUNBQXlDLENBQUM7QUFFcEcsTUFBTSwyQkFBMkIsR0FDL0IsZ0hBQWdILENBQUM7QUFDbkgsTUFBTSx3Q0FBd0MsR0FDNUMsdUZBQXVGLENBQUM7QUFDMUYsTUFBTSxzQ0FBc0MsR0FDMUMsbUVBQW1FLENBQUM7QUFDdEUsTUFBTSx5Q0FBeUMsR0FBRywyQ0FBMkMsQ0FBQztBQUM5RixNQUFNLGlEQUFpRCxHQUNyRCxvSEFBb0gsQ0FBQztBQUN2SCxNQUFNLHVDQUF1QyxHQUMzQyw2REFBNkQsQ0FBQztBQUVoRSxN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