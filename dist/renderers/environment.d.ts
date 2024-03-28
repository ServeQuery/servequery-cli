export = EnvironmentRenderer;
declare class EnvironmentRenderer {
    constructor({ assertPresent, chalk, logger, Table, diffString }: {
        assertPresent: any;
        chalk: any;
        logger: any;
        Table: any;
        diffString: any;
    });
    chalk: any;
    logger: any;
    Table: any;
    diffString: any;
    render(environment: any, config: any): void;
    renderApimapDiff(apimapFrom: any, apimapTo: any): void;
}
//# sourceMappingURL=environment.d.ts.map