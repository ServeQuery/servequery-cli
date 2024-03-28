const { getMongooseTypeFromValue, isOfMongooseType, } = require('../../../../utils/mongo-primitive-type');
/* eslint-disable vars-on-top, no-var, no-use-before-define, no-param-reassign */
/* istanbul ignore next */
function getMongooseEmbeddedSchema(embeddedObject, handleId = false) {
    if (!embeddedObject) {
        return null;
    }
    const schema = {};
    var keysToAnalyse = Object.keys(embeddedObject);
    if (!handleId) {
        keysToAnalyse = keysToAnalyse.filter(value => value !== '_id');
    }
    keysToAnalyse.forEach(key => {
        const analysis = getMongooseSchema(embeddedObject[key]);
        if (analysis) {
            schema[key] = analysis;
        }
    });
    if (Object.keys(schema).length === 0) {
        return null;
    }
    return schema;
}
/* istanbul ignore next */
function getMongooseArraySchema(arrayValue) {
    if (!arrayValue || arrayValue.length === 0 || !Array.isArray(arrayValue)) {
        return null;
    }
    const analyses = [];
    arrayValue.forEach(value => {
        const analysis = getMongooseSchema(value, true);
        if (analysis) {
            analyses.push(analysis);
        }
    });
    return analyses.length ? analyses : null;
}
/* istanbul ignore next */
function getMongooseSchema(value, handleId = false) {
    if (isOfMongooseType(value)) {
        return getMongooseTypeFromValue(value);
    }
    if (Array.isArray(value)) {
        return getMongooseArraySchema(value);
    }
    if (typeof value === 'object') {
        return getMongooseEmbeddedSchema(value, handleId);
    }
    return null;
}
/* istanbul ignore next */
function hasEmbeddedTypes(analyses) {
    if (!analyses || !analyses.length) {
        return false;
    }
    return analyses.filter(analysis => analysis.type === 'embedded').length > 0;
}
function haveSameEmbeddedType(type1, type2) {
    return typeof type1 === typeof type2 && Array.isArray(type1) === Array.isArray(type2);
}
function areSchemaTypesMixed(type1, type2) {
    if (type1 === 'Object' || type2 === 'Object') {
        return true;
    }
    if (type1 == null || type2 == null) {
        return false;
    }
    if (typeof type1 === 'object' || typeof type2 === 'object') {
        return !haveSameEmbeddedType(type1, type2);
    }
    return type1 !== type2;
}
function areAnalysesSameEmbeddedType(arrayOfAnalysis) {
    if (!Array.isArray(arrayOfAnalysis) || !arrayOfAnalysis.length) {
        return false;
    }
    const firstAnalysis = arrayOfAnalysis[0];
    for (var i = 1; i < arrayOfAnalysis.length; i += 1) {
        if (!haveSameEmbeddedType(arrayOfAnalysis[i], firstAnalysis)) {
            return false;
        }
    }
    return true;
}
function addMongooseType(type, schema, currentKey) {
    if (!schema[currentKey]) {
        schema[currentKey] = type;
    }
    else if (areSchemaTypesMixed(type, schema[currentKey])) {
        schema[currentKey] = 'Object';
    }
}
function detectSubDocumentsIdUsage(schema1, schema2) {
    if (schema1._id === 'ambiguous' || schema2._id === 'ambiguous') {
        return 'ambiguous';
    }
    if (schema1._id && schema2._id) {
        return true;
    }
    if (!schema1._id && !schema2._id) {
        return false;
    }
    return 'ambiguous';
}
function iterateOnTypeKeysToAddNestedSchemas(type, schema, isArray) {
    Object.keys(type).forEach(key => {
        addNestedSchemaToParentSchema(type[key], schema, isArray ? 0 : key);
    });
}
function setIdToSchema(type, schema) {
    const idUsage = detectSubDocumentsIdUsage(schema, type);
    if (['ambiguous', false].includes(idUsage)) {
        schema._id = idUsage;
        delete type._id;
    }
}
function addObjectSchema(type, parentSchema, currentKey) {
    const isTypeAnArray = Array.isArray(type);
    if (parentSchema[currentKey] !== undefined) {
        if (areSchemaTypesMixed(parentSchema[currentKey], type)) {
            parentSchema[currentKey] = 'Object';
        }
        else {
            // NOTICE: Checking subDocuments id usage for array of subDocuments.
            if (Array.isArray(parentSchema)) {
                setIdToSchema(type, parentSchema[currentKey]);
            }
            iterateOnTypeKeysToAddNestedSchemas(type, parentSchema[currentKey], isTypeAnArray);
        }
    }
    else {
        parentSchema[currentKey] = isTypeAnArray ? [] : {};
        // NOTICE: Init id usage for the first subDocument.
        if (!isTypeAnArray && Array.isArray(parentSchema)) {
            type._id = type._id || false;
        }
        iterateOnTypeKeysToAddNestedSchemas(type, parentSchema[currentKey], isTypeAnArray);
    }
}
function addNestedSchemaToParentSchema(type, schema, currentKey) {
    if (typeof type === 'object') {
        addObjectSchema(type, schema, currentKey);
    }
    else {
        addMongooseType(type, schema, currentKey);
    }
}
function mergeAnalyzedSchemas(keyAnalyses) {
    if (!areAnalysesSameEmbeddedType(keyAnalyses)) {
        return 'Object';
    }
    const firstAnalysis = keyAnalyses[0];
    var schema;
    var isNestedArray;
    if (Array.isArray(firstAnalysis)) {
        schema = [];
        isNestedArray = true;
    }
    else {
        schema = {};
        isNestedArray = false;
    }
    keyAnalyses.forEach(keyAnalysis => {
        iterateOnTypeKeysToAddNestedSchemas(keyAnalysis, schema, isNestedArray);
    });
    return schema;
}
module.exports = {
    addMongooseType,
    addNestedSchemaToParentSchema,
    addObjectSchema,
    areAnalysesSameEmbeddedType,
    areSchemaTypesMixed,
    detectSubDocumentsIdUsage,
    getMongooseArraySchema,
    getMongooseEmbeddedSchema,
    getMongooseSchema,
    haveSameEmbeddedType,
    hasEmbeddedTypes,
    mergeAnalyzedSchemas,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tZW1iZWRkZWQtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3VwZGF0ZS9hbmFseXplci9tb25nby1lbWJlZGRlZC1hbmFseXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLEVBQ0osd0JBQXdCLEVBQ3hCLGdCQUFnQixHQUNqQixHQUFHLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0FBRXRELGlGQUFpRjtBQUNqRiwwQkFBMEI7QUFDMUIsU0FBUyx5QkFBeUIsQ0FBQyxjQUFjLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDakUsSUFBSSxDQUFDLGNBQWMsRUFBRTtRQUNuQixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLElBQUksYUFBYSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFaEQsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLGFBQWEsR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO0tBQ2hFO0lBRUQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUMxQixNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUV4RCxJQUFJLFFBQVEsRUFBRTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxRQUFRLENBQUM7U0FDeEI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsMEJBQTBC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