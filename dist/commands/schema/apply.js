const { Flags } = require('@oclif/core');
const SchemaSerializer = require('../../serializers/schema');
const SchemaSender = require('../../services/schema-sender');
const JobStateChecker = require('../../services/job-state-checker');
const AbstractAuthenticatedCommand = require('../../abstract-authenticated-command').default;
class ApplyCommand extends AbstractAuthenticatedCommand {
    constructor(argv, config, plan) {
        super(argv, config, plan);
        const { assertPresent, env, fs, joi } = this.context;
        assertPresent({ env, fs, joi });
        this.env = env;
        this.fs = fs;
        this.joi = joi;
    }
    async runAuthenticated() {
        const oclifExit = this.exit.bind(this);
        const { flags: parsedFlags } = await this.parse(ApplyCommand);
        const serializedSchema = this.readSchema();
        const secret = this.getEnvironmentSecret(parsedFlags);
        const authenticationToken = this.authenticator.getAuthToken();
        this.logger.log('Sending ".servequery-schema.json"...');
        const jobId = await new SchemaSender(serializedSchema, secret, authenticationToken, oclifExit).perform();
        if (jobId) {
            await new JobStateChecker('Processing schema', oclifExit).check(jobId);
            this.logger.log('Schema successfully sent to servequery.');
        }
        else {
            this.logger.log('The schema is the same as before, nothing changed.');
        }
        return null;
    }
    readSchema() {
        this.logger.log('Reading ".servequery-schema.json" from current directory...');
        const filename = '.servequery-schema.json';
        if (!this.fs.existsSync(filename)) {
            this.logger.error('Cannot find the file ".servequery-schema.json" in this directory. Please be sure to run this command inside your project directory.');
            this.exit(1);
        }
        let schema;
        try {
            schema = JSON.parse(this.fs.readFileSync(filename, 'utf8'));
        }
        catch (error) {
            this.logger.error(`Invalid json: ${error.message}`);
            this.exit(1);
        }
        if (!schema) {
            this.logger.error('The ".servequery-schema.json" file is empty');
            this.exit(1);
        }
        const stack = this.joi.object().keys({
            orm_version: this.joi.string(),
            database_type: this.joi.string(),
            framework_version: this.joi.string().allow(null),
            engine: this.joi.string().allow(null),
            engine_version: this.joi.string().allow(null),
        });
        const validateRequiredWithStackPresence = this.joi.when('stack', {
            is: this.joi.object().required(),
            then: this.joi.forbidden(),
            otherwise: this.joi.string().required(),
        });
        const allowNullWithStackPresence = this.joi.when('stack', {
            is: this.joi.object().required(),
            then: this.joi.forbidden(),
            otherwise: this.joi.string().allow(null),
        });
        const { error } = this.joi
            .object()
            .keys({
            collections: this.joi.array().items(this.joi.object()).required(),
            meta: this.joi
                .object()
                .keys({
                liana: this.joi.string().required(),
                liana_version: this.joi.string().required(),
                stack: stack.optional(),
                orm_version: validateRequiredWithStackPresence,
                database_type: validateRequiredWithStackPresence,
                framework_version: allowNullWithStackPresence,
                engine: allowNullWithStackPresence,
                engine_version: allowNullWithStackPresence,
            })
                .unknown()
                .required(),
        })
            .validate(schema);
        if (error) {
            this.logger.error('Cannot properly read the ".servequery-schema.json" file:');
            error.details.forEach(detail => this.logger.error(`| ${detail.message}`));
            this.exit(20);
        }
        return new SchemaSerializer().perform(schema.collections, schema.meta);
    }
    getEnvironmentSecret(parsedFlags) {
        let secret;
        if (parsedFlags.secret) {
            secret = parsedFlags.secret;
        }
        else if (this.env.SERVEQUERY_ENV_SECRET) {
            this.logger.log('Using the servequery environment secret found in the environment variable "SERVEQUERY_ENV_SECRET"');
            secret = this.env.SERVEQUERY_ENV_SECRET;
        }
        else {
            this.logger.error('Cannot find your servequery environment secret in the environment variable "SERVEQUERY_ENV_SECRET".\nPlease set the "SERVEQUERY_ENV_SECRET" variable or pass the secret in parameter using --secret.');
            this.exit(2);
        }
        return secret;
    }
}
ApplyCommand.description =
    'Apply the current schema of your repository to the specified environment (using your ".servequery-schema.json" file).';
ApplyCommand.flags = {
    secret: Flags.string({
        char: 's',
        description: 'Environment secret of the project (SERVEQUERY_ENV_SECRET).',
        required: false,
    }),
};
module.exports = ApplyCommand;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tbWFuZHMvc2NoZW1hL2FwcGx5LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDekMsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztBQUM3RCxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM3RCxNQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNwRSxNQUFNLDRCQUE0QixHQUFHLE9BQU8sQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQztBQUU3RixNQUFNLFlBQWEsU0FBUSw0QkFBNEI7SUFDckQsWUFBWSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUk7UUFDNUIsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDMUIsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDckQsYUFBYSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNqQixDQUFDO0lBRUQsS0FBSyxDQUFDLGdCQUFnQjtRQUNwQixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2QyxNQUFNLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFD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