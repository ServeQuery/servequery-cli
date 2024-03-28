export = EnvironmentManager;
declare function EnvironmentManager(config: any): void;
declare class EnvironmentManager {
    constructor(config: any);
    listEnvironments: () => Promise<any>;
    getEnvironment: (environmentId: any) => Promise<any>;
    getEnvironmentApimap: (environmentId: any) => Promise<any>;
    createEnvironment: () => Promise<any>;
    createDevelopmentEnvironment: (projectId: any, endpoint: any) => Promise<any>;
    updateEnvironment: () => Promise<any>;
    deleteEnvironment: (environmentId: any) => Promise<any>;
    reset: (environmentName: any, environmentSecret: any) => Promise<any>;
    /**
     * Deploy layout changes of an environment to production.
     * @param {Number} environment.id - The environment id that contains the layout changes to deploy.
     */
    deploy: () => any;
    handleEnvironmentError: (rawError: any) => any;
}
//# sourceMappingURL=environment-manager.d.ts.map