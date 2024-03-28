export function addMongooseType(type: any, schema: any, currentKey: any): void;
export function addNestedSchemaToParentSchema(type: any, schema: any, currentKey: any): void;
export function addObjectSchema(type: any, parentSchema: any, currentKey: any): void;
export function areAnalysesSameEmbeddedType(arrayOfAnalysis: any): boolean;
export function areSchemaTypesMixed(type1: any, type2: any): boolean;
export function detectSubDocumentsIdUsage(schema1: any, schema2: any): boolean | "ambiguous";
export function getMongooseArraySchema(arrayValue: any): any[];
export function getMongooseEmbeddedSchema(embeddedObject: any, handleId?: boolean): {};
export function getMongooseSchema(value: any, handleId?: boolean): {};
export function haveSameEmbeddedType(type1: any, type2: any): boolean;
export function hasEmbeddedTypes(analyses: any): boolean;
export function mergeAnalyzedSchemas(keyAnalyses: any): {};
//# sourceMappingURL=mongo-embedded-analyzer.d.ts.map