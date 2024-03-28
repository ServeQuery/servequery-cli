export class MongoCollectionsAnalyzer {
    static emit(attributeName: any, attributesType: any, fieldsTypes: any): void;
    static sortFieldsInAnalysis(fields: any): any;
    constructor({ assertPresent, logger, detectReferences, applyReferences, detectHasMany, applyHasMany, isUnderscored, getMongooseTypeFromValue, isOfMongooseType, getMongooseArraySchema, getMongooseEmbeddedSchema, getMongooseSchema, haveSameEmbeddedType, hasEmbeddedTypes, mergeAnalyzedSchemas, isSystemCollection, getCollectionName, mapCollection, reduceCollection, makeProgressBar, }: {
        assertPresent: any;
        logger: any;
        detectReferences: any;
        applyReferences: any;
        detectHasMany: any;
        applyHasMany: any;
        isUnderscored: any;
        getMongooseTypeFromValue: any;
        isOfMongooseType: any;
        getMongooseArraySchema: any;
        getMongooseEmbeddedSchema: any;
        getMongooseSchema: any;
        haveSameEmbeddedType: any;
        hasEmbeddedTypes: any;
        mergeAnalyzedSchemas: any;
        isSystemCollection: any;
        getCollectionName: any;
        mapCollection: any;
        reduceCollection: any;
        makeProgressBar: any;
    });
    logger: any;
    detectReferences: any;
    applyReferences: any;
    detectHasMany: any;
    applyHasMany: any;
    isUnderscored: any;
    getCollectionName: any;
    isSystemCollection: any;
    mergeAnalyzedSchemas: any;
    mapCollection: any;
    reduceCollection: any;
    makeProgressBar: any;
    mapReduceOptions: {
        out: {
            inline: number;
        };
        limit: number;
        scope: {
            getMongooseArraySchema: any;
            getMongooseEmbeddedSchema: any;
            getMongooseSchema: any;
            getMongooseTypeFromValue: any;
            haveSameEmbeddedType: any;
            hasEmbeddedTypes: any;
            isOfMongooseType: any;
        };
    };
    restoreDefaultState(): void;
    isProgressBarDisplay: boolean;
    mergeField(field: any): {
        name: any;
        type: any;
    };
    mapReduceErrors(resolve: any, reject: any): (err: any, results: any) => any;
    getFields(fieldWithTypes: any): any[];
    analyzeMongoCollectionLocally(databaseConnection: any, collectionName: any): Promise<any[]>;
    analyzeMongoCollectionRemotely(databaseConnection: any, collectionName: any): Promise<any>;
    buildSchema(fields: any): {
        fields: any;
        references: any[];
        primaryKeys: string[];
        options: {
            timestamps: any;
        };
    };
    applyRelationships(databaseConnection: any, fields: any, collectionName: any): Promise<any>;
    fetchByChunkFunction(collection: any, numberOfDocumentAllowed: any): (fieldsTypes: any, index: any) => Promise<any>;
    analyzeCollectionAndDisplayProgressBarIfIsAllow(collection: any, collectionName: any): Promise<any>;
    analyzeMongoCollectionsWithoutProgressBar(databaseConnection: any): Promise<any>;
    analyzeMongoCollections(databaseConnection: any): Promise<any>;
}
export function mapCollection(keys: any, emitFunction: any, store: any): void;
export function reduceCollection(key: any, analyses: any): any;
//# sourceMappingURL=mongo-collections-analyzer.d.ts.map