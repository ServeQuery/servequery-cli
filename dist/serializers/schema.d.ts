export = SchemaSerializer;
declare function SchemaSerializer(): void;
declare class SchemaSerializer {
    options: {
        id: string;
        attributes: string[];
        fields: {
            attributes: string[];
        };
        validations: {
            attributes: string[];
        };
        actions: {
            ref: string;
            attributes: string[];
            fields: {
                attributes: string[];
            };
            hooks: {
                attributes: string[];
            };
        };
        segments: {
            ref: string;
            attributes: string[];
        };
        keyForAttribute: string;
    };
    perform: (collections: any, meta: any) => any;
}
//# sourceMappingURL=schema.d.ts.map