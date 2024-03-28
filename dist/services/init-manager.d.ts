export function handleInitError(rawError: any): any;
export function handleDatabaseConfiguration(): Promise<any>;
export function validateEndpoint(input: any): true | "Application input must be a valid url." | "HTTPS protocol is mandatory, except for localhost and 127.0.0.1.";
export function getApplicationPortFromCompleteEndpoint(endpoint: any): any;
export function amendDotenvFile(environmentVariables: any): void;
export function createDotenvFile(environmentVariables: any): void;
export function displayEnvironmentVariablesAndCopyToClipboard(environmentVariables: any): Promise<void>;
//# sourceMappingURL=init-manager.d.ts.map