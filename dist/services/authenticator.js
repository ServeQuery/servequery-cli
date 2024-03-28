const ApplicationError = require('../errors/application-error');
const { ERROR_UNEXPECTED } = require('../utils/messages');
/**
 * @class
 * @param {import('../context/plan').Context} context
 */
function Authenticator({ logger, api, chalk, inquirer, jwtDecode, fs, joi, env, oidcAuthenticator, applicationTokenService, mkdirp, }) {
    /**
     * @param {string?} path
     * @returns {string|null}
     */
    this.getAuthToken = (path = env.TOKEN_PATH) => {
        const paths = [`${path}/.servequery.d/.servequeryrc`, `${path}/.servequeryrc`, `${path}/.lumberrc`];
        for (let i = 0; i < paths.length; i += 1) {
            const token = this.getVerifiedToken(paths[i]);
            if (token)
                return token;
        }
        return null;
    };
    this.getVerifiedToken = path => {
        const token = this.readAuthTokenFrom(path);
        return token && this.verify(token);
    };
    this.readAuthTokenFrom = path => {
        try {
            return fs.readFileSync(path, 'utf8');
        }
        catch (e) {
            return null;
        }
    };
    this.saveToken = async (token) => {
        const path = `${env.TOKEN_PATH}/.servequery.d`;
        await mkdirp(path);
        const servequeryrcPath = `${path}/.servequeryrc`;
        fs.writeFileSync(servequeryrcPath, token);
    };
    this.verify = token => {
        if (!token)
            return null;
        let decodedToken;
        try {
            decodedToken = jwtDecode(token);
        }
        catch (error) {
            return null;
        }
        const nowInSeconds = Date.now().valueOf() / 1000;
        if (!decodedToken.exp || nowInSeconds < decodedToken.exp) {
            return token;
        }
        return null;
    };
    this.validateToken = token => !!this.verify(token) || 'Invalid token. Please enter your authentication token.';
    this.logout = async (opts = {}) => {
        const basePath = env.TOKEN_PATH;
        const pathServequeryrc = `${basePath}/.servequeryrc`;
        const servequeryToken = this.getVerifiedToken(pathServequeryrc);
        if (servequeryToken) {
            fs.unlinkSync(pathServequeryrc);
            await applicationTokenService.deleteApplicationToken(servequeryToken);
        }
        const pathServequeryServequeryrc = `${basePath}/.servequery.d/.servequeryrc`;
        const servequeryServequeryToken = this.getVerifiedToken(pathServequeryServequeryrc);
        if (servequeryServequeryToken) {
            fs.unlinkSync(pathServequeryServequeryrc);
            await applicationTokenService.deleteApplicationToken(servequeryServequeryToken);
        }
        if (opts.log) {
            const pathLumberrc = `${basePath}/.lumberrc`;
            const isLumberLoggedIn = this.getVerifiedToken(pathLumberrc);
            if (isLumberLoggedIn) {
                logger.info('You cannot be logged out with this command. Please use "lumber logout" command.');
            }
            else {
                logger.info(chalk.green('You are logged out.'));
            }
        }
    };
    this.tryLogin = async (config) => {
        await this.logout({ log: false });
        try {
            const token = await this.login(config);
            await this.saveToken(token);
            logger.info('Login successful');
        }
        catch (error) {
            const message = error instanceof ApplicationError
                ? error.message
                : `${ERROR_UNEXPECTED} ${chalk.red(error)}`;
            logger.error(message);
        }
    };
    /**
     * @param {{
     *  email: string;
     *  password: string;
     *  token: string;
     * }} params
     * @returns {Promise<string>}
     */
    this.login = async ({ email, password, token }) => {
        if (token !== undefined && typeof token === 'string' && !token.trim()) {
            throw new ApplicationError('The provided token is empty. Please provide a valid token.');
        }
        if (!password && !token) {
            const sessionToken = await oidcAuthenticator.authenticate();
            return applicationTokenService.generateApplicationToken(sessionToken);
        }
        if (email) {
            const validationResult = await this.validateEmail(email);
            if (validationResult !== true) {
                throw new ApplicationError(validationResult);
            }
        }
        else
            email = await this.promptEmail();
        if (token) {
            return this.loginWithToken(token);
        }
        try {
            return await this.loginWithPassword(email, password);
        }
        catch (e) {
            if (e.message === 'Unauthorized') {
                throw new ApplicationError('Incorrect email or password.');
            }
            throw e;
        }
    };
    this.loginWithToken = token => {
        const validationResult = this.validateToken(token);
        if (validationResult !== true) {
            throw new ApplicationError(validationResult);
        }
        return token;
    };
    this.validateEmail = input => {
        if (!joi.string().email().validate(input).error) {
            return true;
        }
        return input ? 'Invalid email' : 'Please enter your email address.';
    };
    this.promptEmail = async () => {
        const { email } = await inquirer.prompt([
            {
                type: 'input',
                name: 'email',
                message: 'What is your email address?',
                validate: this.validateEmail,
            },
        ]);
        return email;
    };
    this.loginWithPassword = async (email, password) => {
        if (!password) {
            ({ password } = await inquirer.prompt([
                {
                    type: 'password',
                    name: 'password',
                    message: 'What is your Serve Query password:',
                    validate: input => !!input || 'Please enter your password.',
                },
            ]));
        }
        return api.login(email, password);
    };
}
module.exports = Authenticator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGVudGljYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hdXRoZW50aWNhdG9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDaEUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFFMUQ7OztHQUdHO0FBQ0gsU0FBUyxhQUFhLENBQUMsRUFDckIsTUFBTSxFQUNOLEdBQUcsRUFDSCxLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxFQUFFLEVBQ0YsR0FBRyxFQUNILEdBQUcsRUFDSCxpQkFBaUIsRUFDakIsdUJBQXVCLEVBQ3ZCLE1BQU0sR0FDUDtJQUNDOzs7T0FHRztJQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQzVDLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxJQUFJLHNCQUFzQixFQUFFLEdBQUcsSUFBSSxZQUFZLEVBQUUsR0FBRyxJQUFJLFlBQVksQ0FBQyxDQUFDO1FBQ3hGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksS0FBSztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUN6QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBRUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxFQUFFO1FBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztR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