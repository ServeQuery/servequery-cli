"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const languages_1 = __importDefault(require("../../utils/languages"));
const abstract_dumper_1 = __importDefault(require("./abstract-dumper"));
class AgentNodeJs extends abstract_dumper_1.default {
    constructor(context) {
        const { assertPresent, env, isLinuxOs, buildDatabaseUrl, isDatabaseLocal, lodash, strings, toValidPackageName, logger, } = context;
        assertPresent({
            env,
            isLinuxOs,
            buildDatabaseUrl,
            isDatabaseLocal,
            lodash,
            strings,
            toValidPackageName,
            logger,
        });
        super(context);
        this.DEFAULT_PORT = 3310;
        this.templateFolder = 'agent-nodejs';
        this.env = env;
        this.isLinuxOs = isLinuxOs;
        this.buildDatabaseUrl = buildDatabaseUrl;
        this.isDatabaseLocal = isDatabaseLocal;
        this.lodash = lodash;
        this.strings = strings;
        this.toValidPackageName = toValidPackageName;
    }
    writePackageJson(language, dbDialect, appName) {
        const dependencies = {
            dotenv: '^16.0.1',
            '@servequery/agent': '^1.0.0',
        };
        if (dbDialect === 'mongodb') {
            dependencies['@servequery/datasource-mongoose'] = '^1.0.0';
            dependencies.mongoose = '^6.10.3';
        }
        else {
            dependencies['@servequery/datasource-sql'] = '^1.0.0';
        }
        if (dbDialect) {
            if (dbDialect.includes('postgres')) {
                dependencies.pg = '^8.8.0';
            }
            else if (dbDialect === 'mysql') {
                dependencies.mysql2 = '^3.0.1';
            }
            else if (dbDialect === 'mariadb') {
                dependencies.mariadb = '^3.0.2';
            }
            else if (dbDialect === 'mssql') {
                dependencies.tedious = '^16.7.1';
            }
        }
        let scripts = {
            start: 'node ./index.js',
            'start:watch': 'nodemon ./index.js',
        };
        const devDependencies = {
            nodemon: '^2.0.12',
        };
        const nodemonConfig = {
            ignore: ['./servequery-schema.json'],
        };
        if (language === languages_1.default.Typescript) {
            scripts = {
                build: 'tsc',
                start: 'node ./dist/index.js',
                'start:watch': 'nodemon ./index.ts',
            };
            devDependencies.typescript = '^4.9.4';
            devDependencies['ts-node'] = '^10.9.1';
            nodemonConfig.ignore.push('./typings.ts');
        }
        const pkg = {
            name: this.toValidPackageName(appName),
            version: '0.0.1',
            private: true,
            scripts,
            nodemonConfig,
            dependencies,
            devDependencies,
        };
        this.writeFile('package.json', `${JSON.stringify(pkg, null, 2)}\n`);
    }
    writeTsConfigJson() {
        this.writeFile('tsconfig.json', `${JSON.stringify({
            compilerOptions: {
                experimentalDecorators: true,
                target: 'ES2020',
                module: 'CommonJS',
                moduleResolution: 'Node',
                esModuleInterop: true,
                declaration: true,
                declarationMap: true,
                inlineSourceMap: true,
                noImplicitOverride: true,
                stripInternal: true,
                outDir: 'dist',
                skipLibCheck: true,
            },
            'ts-node': {
                transpileOnly: true,
            },
        }, null, 2)}\n`);
    }
    writeIndex(language, dbDialect, dbSchema) {
        const isMongoose = dbDialect === 'mongodb';
        const context = {
            isMongoose,
            isMySQL: dbDialect === 'mysql',
            isMSSQL: dbDialect === 'mssql',
            isMariaDB: dbDialect === 'mariadb',
            dbSchema,
            servequeryServerUrl: this.env.SERVEQUERY_URL_IS_DEFAULT ? false : this.env.SERVEQUERY_SERVER_URL,
        };
        this.copyHandleBarsTemplate(`${language.name}/index.hbs`, `index.${language.fileExtension}`, context);
    }
    writeDotEnv(dbConfig, appPort, servequeryEnvSecret, servequeryAuthSecret) {
        const dbUrl = this.buildDatabaseUrl(dbConfig);
        const context = {
            isMongoose: dbConfig.dbDialect === 'mongodb',
            dbUrl,
            dbSchema: dbConfig.dbSchema,
            dbSslMode: dbConfig.dbSslMode ?? 'disabled',
            appPort,
            servequeryServerUrl: this.env.SERVEQUERY_URL_IS_DEFAULT ? false : this.env.SERVEQUERY_SERVER_URL,
            servequeryEnvSecret,
            servequeryAuthSecret,
            hasDockerDbUrl: false,
            dockerDbUrl: '',
        };
        if (!this.isLinuxOs) {
            context.hasDockerDbUrl = true;
            context.dockerDbUrl = dbUrl.replace('localhost', 'host.docker.internal');
        }
        this.copyHandleBarsTemplate('common/env.hbs', '.env', context);
    }
    writeGitignore(language) {
        this.writeFile('.gitignore', `node_modules\n.env\n${language === languages_1.default.Typescript ? 'dist\n' : ''}`);
    }
    writeTypings() {
        this.writeFile('typings.ts', '/* eslint-disable */\nexport type Schema = any;\n');
    }
    writeDockerignore(language) {
        this.writeFile('.dockerignore', `node_modules\nnpm-debug.log\n.env\n${language === languages_1.default.Typescript ? 'dist\n' : ''}`);
    }
    writeDockerfile(language) {
        this.copyHandleBarsTemplate(`${language.name}/Dockerfile.hbs`, 'Dockerfile');
    }
    writeDockerCompose(config) {
        const servequeryServerUrl = this.env.SERVEQUERY_URL_IS_DEFAULT ? false : `\${SERVEQUERY_SERVER_URL}`;
        let servequeryExtraHost = '';
        if (servequeryServerUrl) {
            try {
                servequeryExtraHost = new URL(this.env.SERVEQUERY_SERVER_URL).hostname;
            }
            catch (error) {
                throw new Error(`Invalid value for SERVEQUERY_SERVER_URL: "${this.env.SERVEQUERY_SERVER_URL}"`);
            }
        }
        this.copyHandleBarsTemplate(`${config.language.name}/docker-compose.hbs`, 'docker-compose.yml', {
            containerName: this.lodash.snakeCase(config.appConfig.appName),
            servequeryExtraHost,
            isLinuxOs: this.isLinuxOs,
            network: this.isLinuxOs && this.isDatabaseLocal(config.dbConfig) ? 'host' : null,
        });
    }
    removeNonCompliantNestedFields(collectionName, fieldsDefinition) {
        if (typeof fieldsDefinition !== 'string') {
            if (Array.isArray(fieldsDefinition)) {
                fieldsDefinition.forEach(fieldDefinition => {
                    this.removeNonCompliantNestedFields(collectionName, fieldDefinition);
                });
            }
            else {
                Object.entries(fieldsDefinition).forEach(([key, fieldDefinition]) => {
                    if (key.includes(':')) {
                        this.logger.warn(`Ignoring field ${key} from collection ${collectionName} as it contains column and is not valid.`);
                        delete fieldsDefinition[key];
                    }
                    else {
                        this.removeNonCompliantNestedFields(collectionName, fieldDefinition);
                    }
                });
            }
        }
    }
    removeNonCompliantFields(collectionName, fieldsDefinition) {
        const compliantFieldsDefinition = JSON.parse(JSON.stringify(fieldsDefinition));
        return compliantFieldsDefinition.reduce((correctFieldsDefinitions, definition) => {
            if (definition.name.includes(':')) {
                this.logger.warn(`Ignoring field ${definition.name} from collection ${collectionName} as it contains column and is not valid.`);
            }
            else {
                correctFieldsDefinitions.push(definition);
                if (definition.type && typeof definition.type !== 'string') {
                    this.removeNonCompliantNestedFields(collectionName, definition.type);
                }
            }
            return correctFieldsDefinitions;
        }, []);
    }
    computeModelsConfiguration(language, schema) {
        const collectionNamesSorted = Object.keys(schema).sort();
        return collectionNamesSorted.map(collectionName => {
            const { fields, options } = schema[collectionName];
            const modelFileName = `${this.lodash.kebabCase(collectionName)}`;
            const modelPath = `models/${modelFileName}.${language.fileExtension}`;
            const fieldsDefinition = fields.map(field => {
                return {
                    ...field,
                    ref: field.ref && this.strings.transformToCamelCaseSafeString(field.ref),
                };
            });
            const compliantFieldsDefinition = this.removeNonCompliantFields(collectionName, fieldsDefinition);
            return {
                modelName: this.strings.transformToCamelCaseSafeString(collectionName),
                collectionName,
                fields: compliantFieldsDefinition,
                timestamps: options.timestamps,
                modelFileName,
                modelPath,
            };
        });
    }
    async writeMongooseModels(language, schema) {
        await this.mkdirp(`${this.projectPath}/models`);
        const modelsConfiguration = this.computeModelsConfiguration(language, schema);
        this.copyHandleBarsTemplate(`${language.name}/models/index.hbs`, `models/index.${language.fileExtension}`, { models: modelsConfiguration });
        modelsConfiguration.forEach(modelConfiguration => {
            this.copyHandleBarsTemplate(`${language.name}/models/model.hbs`, modelConfiguration.modelPath, {
                modelName: modelConfiguration.modelName,
                collectionName: modelConfiguration.collectionName,
                fields: modelConfiguration.fields,
                timestamps: modelConfiguration.timestamps,
            });
        });
    }
    async createFiles(dumpConfig, mongoSchema) {
        this.writePackageJson(dumpConfig.language, dumpConfig.dbConfig.dbDialect, dumpConfig.appConfig.appName);
        if (dumpConfig.language === languages_1.default.Typescript) {
            this.writeTsConfigJson();
        }
        this.writeIndex(dumpConfig.language, dumpConfig.dbConfig.dbDialect, dumpConfig.dbConfig.dbSchema);
        this.writeDotEnv(dumpConfig.dbConfig, dumpConfig.appConfig.appPort || this.DEFAULT_PORT, dumpConfig.servequeryEnvSecret, dumpConfig.servequeryAuthSecret);
        this.writeTypings();
        this.writeGitignore(dumpConfig.language);
        this.writeDockerignore(dumpConfig.language);
        this.writeDockerfile(dumpConfig.language);
        this.writeDockerCompose(dumpConfig);
        if (dumpConfig.dbConfig.dbDialect === 'mongodb' && mongoSchema) {
            await this.writeMongooseModels(dumpConfig.language, mongoSchema);
        }
    }
}
exports.default = AgentNodeJs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQtbm9kZWpzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2R1bXBlcnMvYWdlbnQtbm9kZWpzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBS0Esc0VBQThDO0FBQzlDLHdFQUErQztBQVcvQyxNQUFxQixXQUFZLFNBQVEseUJBQWM7SUFtQnJELFlBQVksT0FBTztRQUNqQixNQUFNLEVBQ0osYUFBYSxFQUNiLEdBQUcsRUFDSCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixNQUFNLEVBQ04sT0FBTyxFQUNQLGtCQUFrQixFQUNsQixNQUFNLEdBQ1AsR0FBRyxPQUFPLENBQUM7UUFFWixhQUFhLENBQUM7WUFDWixHQUFHO1lBQ0gsU0FBUztZQUNULGdCQUFnQjtZQUNoQixlQUFlO1lBQ2YsTUFBTTtZQUNOLE9BQU87WUFDUCxrQkFBa0I7WUFDbEIsTUFBTTtTQUNQLENBQUMsQ0FBQztRQUVILEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQXhDQSxpQkFBWSxHQUFHLElBQUksQ0FBQztRQWNsQixtQkFBYyxHQUFHLGNBQWMsQ0FBQztRQTRCakQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7UUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7UUFDdkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0lBQy9DLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxRQUFrQixFQUFFLFNBQWlCLEVBQUUsT0FBZTtRQUNyRSxNQUFNLFlBQVksR0FBK0I7WUFDL0MsTUFBTSxFQUFFLFNBQVM7WUFD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