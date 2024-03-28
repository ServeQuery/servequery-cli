"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoDBSRV = exports.databaseSchema = exports.databaseDialectSqlV2 = exports.databaseDialectV1 = exports.language = exports.databaseSslMode = exports.databaseSSL = exports.databasePassword = exports.databaseUser = exports.databasePort = exports.databaseHost = exports.databaseName = exports.databaseConnectionURL = exports.applicationPort = exports.applicationHost = exports.getDialect = void 0;
const languages_1 = __importDefault(require("../../../utils/languages"));
const validators_1 = require("../../../utils/validators");
function getDialect(options) {
    const { databaseDialect: dialect, databaseConnectionURL: url } = options;
    if (dialect)
        return dialect;
    if (url?.startsWith('postgres://'))
        return 'postgres';
    if (url?.startsWith('mssql://'))
        return 'mssql';
    if (url?.startsWith('mongodb'))
        return 'mongodb';
    if (url?.startsWith('mysql://') || url?.startsWith('mariadb://'))
        return 'mysql';
    return null;
}
exports.getDialect = getDialect;
exports.applicationHost = {
    default: 'http://localhost',
    validate: validators_1.validateAppHostname,
    oclif: { char: 'H', description: 'Hostname of your admin backend application.' },
    prompter: { question: "What's the IP/hostname on which your application will be running?" },
};
exports.applicationPort = {
    default: '3310',
    validate: validators_1.validatePort,
    oclif: { char: 'P', description: 'Port of your admin backend application.' },
    prompter: { question: `What's the port on which your application will be running?` },
};
exports.databaseConnectionURL = {
    oclif: { char: 'c', description: 'Enter the database credentials with a connection URL.' },
    prompter: null,
};
exports.databaseName = {
    exclusive: ['databaseConnectionURL'],
    validate: validators_1.validateDbName,
    oclif: { char: 'n', description: 'Enter your database name.' },
    prompter: { question: "What's the database name?" },
};
exports.databaseHost = {
    exclusive: ['databaseConnectionURL'],
    default: 'localhost',
    oclif: { char: 'h', description: 'Enter your database host.' },
    prompter: { question: "What's the database hostname?" },
};
exports.databasePort = {
    exclusive: ['databaseConnectionURL'],
    default: args => {
        const dialect = getDialect(args);
        if (dialect === 'postgres')
            return '5432';
        if (dialect === 'mysql' || dialect === 'mariadb')
            return '3306';
        if (dialect === 'mssql')
            return '1433';
        if (dialect === 'mongodb')
            return '27017';
        return undefined;
    },
    validate: validators_1.validatePort,
    oclif: { char: 'p', description: 'Enter your database port.' },
    prompter: { question: "What's the database port?" },
};
exports.databaseUser = {
    exclusive: ['databaseConnectionURL'],
    default: args => (getDialect(args) === 'mongodb' ? undefined : 'root'),
    oclif: { char: 'u', description: 'Enter your database user.' },
    prompter: { question: "What's the database user?" },
};
exports.databasePassword = {
    exclusive: ['databaseConnectionURL'],
    oclif: { description: 'Enter your database password.' },
    prompter: { question: "What's the database password? [optional]" },
};
exports.databaseSSL = {
    exclusive: ['databaseSslMode'],
    when: args => args.databaseSslMode === undefined,
    type: 'boolean',
    default: false,
    oclif: { description: 'Use SSL for database connection.' },
    prompter: { question: 'Does your database require a SSL connection?' },
};
exports.databaseSslMode = {
    exclusive: ['databaseSSL'],
    when: args => args.databaseSSL === undefined,
    choices: ['preferred', 'verify', 'required', 'disabled'].map(value => ({ name: value, value })),
    default: 'preferred',
    oclif: { description: 'SSL mode.' },
    prompter: { question: 'Which SSL mode do you want to use?' },
};
exports.language = {
    choices: Object.values(languages_1.default).map(l => ({ name: l.name, value: l })),
    default: Object.values(languages_1.default)[0],
    oclif: { char: 'l', description: 'Choose the language you want to use for your project.' },
    prompter: { question: 'In which language would you like to generate your sources?' },
};
exports.databaseDialectV1 = {
    choices: [
        { name: 'mongodb', value: 'mongodb' },
        { name: 'mssql', value: 'mssql' },
        { name: 'mysql / mariadb', value: 'mysql' },
        { name: 'postgres', value: 'postgres' },
    ],
    exclusive: ['databaseConnectionURL'],
    oclif: { char: 'd', description: 'Enter your database dialect.' },
    prompter: { question: "What's the database type?" },
};
exports.databaseDialectSqlV2 = {
    choices: [
        { name: 'mssql', value: 'mssql' },
        { name: 'mysql / mariadb', value: 'mysql' },
        { name: 'postgres', value: 'postgres' },
    ],
    exclusive: ['databaseConnectionURL'],
    oclif: { char: 'd', description: 'Enter your database dialect.' },
    prompter: { question: "What's the database type?" },
};
exports.databaseSchema = {
    when: args => ['postgres', 'mssql'].includes(getDialect(args)),
    default: args => (getDialect(args) === 'postgres' ? 'public' : ''),
    oclif: { char: 's', description: 'Enter your database schema.' },
    prompter: {
        question: "What's the database schema? [optional]",
        description: 'Leave blank by default',
    },
};
exports.mongoDBSRV = {
    type: 'boolean',
    exclusive: ['databaseConnectionURL'],
    when: args => getDialect(args) === 'mongodb',
    default: false,
    oclif: { description: 'Use SRV DNS record for mongoDB connection.' },
    prompter: { question: 'Use a SRV connection string?' },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wcm9qZWN0cy9jcmVhdGUvb3B0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFHQSx5RUFBaUQ7QUFDakQsMERBQThGO0FBd0I5RixTQUFnQixVQUFVLENBQUMsT0FBNkI7SUFDdEQsTUFBTSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsR0FBRyxFQUFFLEdBQUcsT0FBTyxDQUFDO0lBRXpFLElBQUksT0FBTztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBQzVCLElBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFBRSxPQUFPLFVBQVUsQ0FBQztJQUN0RCxJQUFJLEdBQUcsRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDO1FBQUUsT0FBTyxPQUFPLENBQUM7SUFDaEQsSUFBSSxHQUFHLEVBQUUsVUFBVSxDQUFDLFNBQVMsQ0FBQztRQUFFLE9BQU8sU0FBUyxDQUFDO0lBQ2pELElBQUksR0FBRyxFQUFFLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxHQUFHLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRWpGLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQVZELGdDQVVDO0FBRVksUUFBQSxlQUFlLEdBQVc7SUFDckMsT0FBTyxFQUFFLGtCQUFrQjtJQUMzQixRQUFRLEVBQUUsZ0NBQW1CO0lBQzdCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLDZDQUE2QyxFQUFFO0lBQ2hGLFFBQVEsRUFBRSxFQUFFLFFBQVEsRUFBRSxtRUFBbUUsRUFBRTtDQUM1RixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQVc7SUFDckMsT0FBTyxFQUFFLE1BQU07SUFDZixRQUFRLEVBQUUseUJBQVk7SUFDdEIsS0FBSyxFQUFFLEVBQUUsSUFBSSxF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