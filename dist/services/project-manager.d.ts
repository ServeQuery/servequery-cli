export = ProjectManager;
declare function ProjectManager(config: any): void;
declare class ProjectManager {
    constructor(config: any);
    listProjects: () => Promise<any>;
    getByEnvSecret: (envSecret: any, includeLegacy?: boolean) => Promise<any>;
    getProject: () => Promise<any>;
    getProjectForDevWorkflow: () => Promise<any>;
    getDevelopmentEnvironmentForUser: (projectId: any) => Promise<any>;
}
//# sourceMappingURL=project-manager.d.ts.map