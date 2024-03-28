const P = require('bluebird');
const { ObjectId } = require('mongodb');
const EmptyDatabaseError = require('../../../../errors/database/empty-database-error');
const { getMongooseSchema, hasEmbeddedTypes, } = require('../../../../services/schema/update/analyzer/mongo-embedded-analyzer');
const MAP_REDUCE_ERROR_STRING = 'MapReduceError';
// NOTICE: This code runs on the MongoDB side (mapReduce feature) or locally
//         when the the JS is disabled.
//         The supported JS version is not the same than elsewhere.
//         The code used here must work with MongoDB lower version supported.
/* eslint-disable vars-on-top, no-var, no-undef, no-restricted-syntax,
                  sonarjs/cognitive-complexity, no-use-before-define */
/* istanbul ignore next */
function mapCollection(keys = this, emitFunction, store) {
    // this block is to inject the emit function when this code is running locally
    var emitAction;
    if (emitFunction && store) {
        emitAction = function emit(key, value) {
            emitFunction(key, value, store);
        };
    }
    else {
        // when the emit is defined by mongodb
        emitAction = emit;
    }
    function allItemsAreObjectIDs(array) {
        if (!array.length)
            return false;
        var itemToCheckCount = array.length > 3 ? 3 : array.length;
        var arrayOfObjectIDs = true;
        for (var i = 0; i < itemToCheckCount; i += 1) {
            if (!(array[i] instanceof ObjectId)) {
                arrayOfObjectIDs = false;
                break;
            }
        }
        return arrayOfObjectIDs;
    }
    for (var key in keys) {
        if (keys[key] instanceof ObjectId && key !== '_id') {
            emitAction(key, 'Mongoose.Schema.Types.ObjectId');
        }
        else if (keys[key] instanceof Date) {
            emitAction(key, 'Date');
        }
        else if (typeof keys[key] === 'boolean') {
            emitAction(key, 'Boolean');
        }
        else if (typeof keys[key] === 'string') {
            emitAction(key, 'String');
        }
        else if (typeof keys[key] === 'number' && key !== '__v') {
            emitAction(key, 'Number');
        }
        else if (typeof keys[key] === 'object') {
            if (Array.isArray(keys[key]) && allItemsAreObjectIDs(keys[key])) {
                emitAction(key, '[Mongoose.Schema.Types.ObjectId]');
            }
            else if (key !== '_id') {
                var analysis = getMongooseSchema(keys[key]);
                if (analysis) {
                    // Notice: Wrap the analysis of embedded in a recognizable object for further treatment
                    emitAction(key, { type: 'embedded', schema: analysis });
                }
            }
        }
    }
}
/* eslint-enable */
/* istanbul ignore next */
function reduceCollection(key, analyses) {
    if (hasEmbeddedTypes(analyses)) {
        const formattedAnalysis = { type: 'embedded', schemas: [] };
        analyses.forEach(analysis => {
            if (analysis.type === 'embedded') {
                formattedAnalysis.schemas.push(analysis.schema);
            }
            else {
                formattedAnalysis.schemas.push(analysis);
            }
        });
        return formattedAnalysis;
    }
    return analyses.length ? analyses[0] : null;
}
/* eslint-disable no-shadow */
class MongoCollectionsAnalyzer {
    constructor({ assertPresent, logger, detectReferences, applyReferences, detectHasMany, applyHasMany, isUnderscored, getMongooseTypeFromValue, isOfMongooseType, getMongooseArraySchema, getMongooseEmbeddedSchema, getMongooseSchema, haveSameEmbeddedType, hasEmbeddedTypes, mergeAnalyzedSchemas, isSystemCollection, getCollectionName, mapCollection, reduceCollection, makeProgressBar, }) {
        assertPresent({
            logger,
            detectReferences,
            applyReferences,
            detectHasMany,
            applyHasMany,
            isUnderscored,
            getMongooseTypeFromValue,
            isOfMongooseType,
            getMongooseArraySchema,
            getMongooseEmbeddedSchema,
            getMongooseSchema,
            haveSameEmbeddedType,
            hasEmbeddedTypes,
            mergeAnalyzedSchemas,
            isSystemCollection,
            getCollectionName,
            mapCollection,
            reduceCollection,
            makeProgressBar,
        });
        this.logger = logger;
        this.detectReferences = detectReferences;
        this.applyReferences = applyReferences;
        this.detectHasMany = detectHasMany;
        this.applyHasMany = applyHasMany;
        this.isUnderscored = isUnderscored;
        this.getCollectionName = getCollectionName;
        this.isSystemCollection = isSystemCollection;
        this.mergeAnalyzedSchemas = mergeAnalyzedSchemas;
        this.mapCollection = mapCollection;
        this.reduceCollection = reduceCollection;
        this.makeProgressBar = makeProgressBar;
        this.restoreDefaultState();
        this.mapReduceOptions = {
            out: { inline: 1 },
            limit: 100,
            scope: {
                getMongooseArraySchema,
                getMongooseEmbeddedSchema,
                getMongooseSchema,
                getMongooseTypeFromValue,
                haveSameEmbeddedType,
                hasEmbeddedTypes,
                isOfMongooseType,
            },
        };
    }
    restoreDefaultState() {
        this.isProgressBarDisplay = true;
    }
    mergeField(field) {
        if (field.value && field.value.type === 'embedded') {
            const schemas = field.value.schemas ? field.value.schemas : [field.value.schema];
            const mergedSchema = this.mergeAnalyzedSchemas(schemas);
            return {
                name: field._id,
                type: mergedSchema,
            };
        }
        return {
            name: field._id,
            type: field.value,
        };
    }
    mapReduceErrors(resolve, reject) {
        return (err, results) => {
            if (err) {
                if (err.message &&
                    (err.message.startsWith('CMD_NOT_ALLOWED') || /mapreduce/gim.test(err.message))) {
                    return resolve(MAP_REDUCE_ERROR_STRING);
                }
                if (err.codeName && err.codeName === 'CommandNotSupportedOnView') {
                    // NOTICE: Silently ignore views errors (e.g do not import views).
                    //         See: https://github.com/servequery/lumber/issues/265
                    return resolve([]);
                }
                return reject(err);
            }
            return resolve(results.map(result => this.mergeField(result)));
        };
    }
    static emit(attributeName, attributesType, fieldsTypes) {
        if (fieldsTypes[attributeName]) {
            fieldsTypes[attributeName].push(attributesType);
        }
        else {
            fieldsTypes[attributeName] = [attributesType];
        }
    }
    getFields(fieldWithTypes) {
        const keys = Object.keys(fieldWithTypes);
        return keys.reduce((fields, key) => {
            const field = this.mergeField({
                _id: key,
                value: this.reduceCollection(key, fieldWithTypes[key]),
            });
            fields.push(field);
            return fields;
        }, []);
    }
    // M0 free clusters and M2/M5 shared clusters do not support server-side JavaScript.
    // Also, JS can be disabled on the mongodb instance.
    // https://docs.atlas.mongodb.com/reference/free-shared-limitations/
    // https://docs.mongodb.com/manual/core/server-side-javascript/
    async analyzeMongoCollectionLocally(databaseConnection, collectionName) {
        const collection = databaseConnection.collection(collectionName);
        const analyze = await this.analyzeCollectionAndDisplayProgressBarIfIsAllow(collection, collectionName);
        return this.getFields(analyze);
    }
    analyzeMongoCollectionRemotely(databaseConnection, collectionName) {
        return new Promise((resolve, reject) => {
            databaseConnection
                .collection(collectionName)
                .mapReduce(this.mapCollection, this.reduceCollection, this.mapReduceOptions, this.mapReduceErrors(resolve, reject));
        });
    }
    buildSchema(fields) {
        return {
            fields,
            references: [],
            primaryKeys: ['_id'],
            options: {
                timestamps: this.isUnderscored(fields),
            },
        };
    }
    async applyRelationships(databaseConnection, fields, collectionName) {
        const references = await this.detectReferences(databaseConnection, fields, collectionName);
        this.applyReferences(fields, references);
        const hasMany = await this.detectHasMany(databaseConnection, fields, collectionName);
        this.applyHasMany(fields, hasMany);
        return fields;
    }
    fetchByChunkFunction(collection, numberOfDocumentAllowed) {
        return async (fieldsTypes, index) => {
            const minIndex = index * numberOfDocumentAllowed;
            const options = { minIndex, limit: numberOfDocumentAllowed };
            const documents = await collection.find({}, options).toArray();
            documents.map(document => this.mapCollection(document, MongoCollectionsAnalyzer.emit, fieldsTypes));
            return fieldsTypes;
        };
    }
    async analyzeCollectionAndDisplayProgressBarIfIsAllow(collection, collectionName) {
        const countDocuments = await collection.countDocuments();
        if (countDocuments === 0) {
            return {};
        }
        const numberOfDocumentAllowed = 50;
        const countIterations = Math.ceil(countDocuments / numberOfDocumentAllowed);
        let fetchFunction = this.fetchByChunkFunction(collection, numberOfDocumentAllowed);
        if (this.isProgressBarDisplay) {
            const bar = this.makeProgressBar(`Analysing the **${collectionName}** collection`, countIterations);
            bar.update(0);
            fetchFunction = async (fieldTypes, index) => {
                const wrapper = this.fetchByChunkFunction(collection, numberOfDocumentAllowed);
                await wrapper(fieldTypes, index);
                bar.tick();
                return fieldTypes;
            };
        }
        const iterations = [...Array(countIterations).keys()];
        return P.reduce(iterations, fetchFunction, {});
    }
    async analyzeMongoCollectionsWithoutProgressBar(databaseConnection) {
        this.isProgressBarDisplay = false;
        return this.analyzeMongoCollections(databaseConnection);
    }
    static sortFieldsInAnalysis(fields) {
        if (!Array.isArray(fields)) {
            return fields;
        }
        return fields.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            return 1;
        });
    }
    async analyzeMongoCollections(databaseConnection) {
        const collections = await databaseConnection.collections();
        if (collections.length === 0) {
            this.restoreDefaultState();
            throw new EmptyDatabaseError('no collections found', {
                orm: 'mongoose',
                dialect: 'mongodb',
            });
        }
        const collectionsInfos = await databaseConnection.listCollections().toArray();
        const isView = name => collectionsInfos.find(info => !!info.options.viewOn && name === info.name);
        let isMongodbInstanceSupportJs = true;
        const schema = await P.reduce(collections, async (schema, collection) => {
            const collectionName = this.getCollectionName(collection);
            // Ignore system collections and collection without a valid name.
            if (!collectionName || this.isSystemCollection(collection)) {
                return schema;
            }
            let analysis = [];
            if (isMongodbInstanceSupportJs && !isView(collectionName)) {
                analysis = await this.analyzeMongoCollectionRemotely(databaseConnection, collectionName);
                if (analysis === MAP_REDUCE_ERROR_STRING) {
                    isMongodbInstanceSupportJs = false;
                    this.logger.warn('The analysis is running locally instead of in the db instance because your instance does not support javascript.' +
                        ' This action can takes a bit of time because it fetches all the collections.');
                }
            }
            if (!isMongodbInstanceSupportJs && !isView(collectionName)) {
                analysis = await this.analyzeMongoCollectionLocally(databaseConnection, collectionName);
            }
            analysis = await this.applyRelationships(databaseConnection, analysis, collectionName);
            schema[collectionName] = this.buildSchema(MongoCollectionsAnalyzer.sortFieldsInAnalysis(analysis));
            return schema;
        }, {});
        this.restoreDefaultState();
        return schema;
    }
}
module.exports = { MongoCollectionsAnalyzer, mapCollection, reduceCollection };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tY29sbGVjdGlvbnMtYW5hbHl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvc2NoZW1hL3VwZGF0ZS9hbmFseXplci9tb25nby1jb2xsZWN0aW9ucy1hbmFseXplci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDOUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV4QyxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxrREFBa0QsQ0FBQyxDQUFDO0FBRXZGLE1BQU0sRUFDSixpQkFBaUIsRUFDakIsZ0JBQWdCLEdBQ2pCLEdBQUcsT0FBTyxDQUFDLHFFQUFxRSxDQUFDLENBQUM7QUFFbkYsTUFBTSx1QkFBdUIsR0FBRyxnQkFBZ0IsQ0FBQztBQUVqRCw0RUFBNEU7QUFDNUUsdUNBQXVDO0FBQ3ZDLG1FQUFtRTtBQUNuRSw2RUFBNkU7QUFDN0U7dUVBQ3VFO0FBQ3ZFLDBCQUEwQjtBQUMxQixTQUFTLGFBQWEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLFlBQVksRUFBRSxLQUFLO0lBQ3JELDhFQUE4RTtJQUM5RSxJQUFJLFVBQVUsQ0FBQztJQUNmLElBQUksWUFBWSxJQUFJLEtBQUssRUFBRTtRQUN6QixVQUFVLEdBQUcsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUs7WUFDbkMsWUFBWSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFDO0tBQ0g7U0FBTTtRQUNMLHNDQUFzQztRQUN0QyxVQUFVLEdBQUcsSUFBSSxDQUFDO0tBQ25CO0lBRUQsU0FBUyxvQkFBb0IsQ0FBQyxLQUFLO1FBQ2pDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ2hDLElBQUks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