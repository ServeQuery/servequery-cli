const ProgressBar = require('progress');
const { detectReferences, applyReferences, } = require('../services/schema/update/analyzer/mongo-references-analyzer');
const { detectHasMany, applyHasMany, } = require('../services/schema/update/analyzer/mongo-hasmany-analyzer');
const { isUnderscored } = require('../utils/fields');
const { getMongooseTypeFromValue, isOfMongooseType } = require('../utils/mongo-primitive-type');
const { isSystemCollection, getCollectionName } = require('../utils/mongo-collections');
const { getMongooseArraySchema, getMongooseEmbeddedSchema, getMongooseSchema, haveSameEmbeddedType, hasEmbeddedTypes, mergeAnalyzedSchemas, } = require('../services/schema/update/analyzer/mongo-embedded-analyzer');
const { MongoCollectionsAnalyzer, mapCollection, reduceCollection, } = require('../services/schema/update/analyzer/mongo-collections-analyzer');
function makeProgressBar(message, total) {
    return new ProgressBar(`${message} [:bar] :percent`, { total, width: 50 });
}
/* eslint-disable global-require */
module.exports = plan => plan
    .addModule('path', () => require('path'))
    .addFunction('mapCollection', mapCollection, { private: true })
    .addFunction('reduceCollection', reduceCollection, { private: true })
    .addFunction('detectReferences', detectReferences, { private: true })
    .addFunction('applyReferences', applyReferences, { private: true })
    .addFunction('detectHasMany', detectHasMany, { private: true })
    .addFunction('applyHasMany', applyHasMany, { private: true })
    .addFunction('isUnderscored', isUnderscored, { private: true })
    .addFunction('getMongooseTypeFromValue', getMongooseTypeFromValue, { private: true })
    .addFunction('isOfMongooseType', isOfMongooseType, { private: true })
    .addFunction('getMongooseArraySchema', getMongooseArraySchema, { private: true })
    .addFunction('getMongooseEmbeddedSchema', getMongooseEmbeddedSchema, { private: true })
    .addFunction('getMongooseSchema', getMongooseSchema, { private: true })
    .addFunction('haveSameEmbeddedType', haveSameEmbeddedType, { private: true })
    .addFunction('hasEmbeddedTypes', hasEmbeddedTypes, { private: true })
    .addFunction('mergeAnalyzedSchemas', mergeAnalyzedSchemas, { private: true })
    .addFunction('isSystemCollection', isSystemCollection, { private: true })
    .addFunction('getCollectionName', getCollectionName, { private: true })
    .addFunction('makeProgressBar', makeProgressBar, { private: true })
    .addFunction('sequelizeAnalyzer', require('../services/schema/update/analyzer/sequelize-tables-analyzer'))
    .addUsingClass('spinnerUi', () => require('../services/spinner'))
    .addUsingClass('mongoAnalyzer', MongoCollectionsAnalyzer)
    .addUsingClass('databaseAnalyzer', () => require('../services/schema/update/analyzer/database-analyzer'));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZC1wcm9qZWN0cy1jb21tb24tcGxhbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb250ZXh0L2NvbW1hbmQtcHJvamVjdHMtY29tbW9uLXBsYW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3hDLE1BQU0sRUFDSixnQkFBZ0IsRUFDaEIsZUFBZSxHQUNoQixHQUFHLE9BQU8sQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO0FBRTVFLE1BQU0sRUFDSixhQUFhLEVBQ2IsWUFBWSxHQUNiLEdBQUcsT0FBTyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7QUFFekUsTUFBTSxFQUFFLGFBQWEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBRXJELE1BQU0sRUFBRSx3QkFBd0IsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBRWhHLE1BQU0sRUFBRSxrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRSxHQUFHLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRXhGLE1BQU0sRUFDSixzQkFBc0IsRUFDdEIseUJBQXlCLEVBQ3pCLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLG9CQUFvQixHQUNyQixHQUFHLE9BQU8sQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO0FBRTFFLE1BQU0sRUFDSix3QkFBd0IsRUFDeEIsYUFBYSxFQUNiLGdCQUFnQixHQUNqQixHQUFHLE9BQU8sQ0FBQywrREFBK0QsQ0FBQyxDQUFDO0FBRTdFLFNBQVMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLO0lBQ3JDLE9BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxPQUFPLGtCQUFrQixFQUFFLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzdFLENBQUM7QUFFRCxtQ0FBbUM7QUFDbkMsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUN0QixJQUFJO0tBQ0QsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDeEMsV0FBVyxDQUFDLGVBQWUsRUFBRSxhQUFhLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDOUQsV0FBVyxDQUFDLGtCQUFrQixFQUFFLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ3BFLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNwRSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2xFLFdBQVcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzlELFdBQVcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzVELFdBQVcsQ0FBQyxlQUFlLEVBQUUsYUFBYSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzlELFdBQVcsQ0FBQywwQkFBMEIsRUFBRSx3QkFBd0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNwRixXQUFXLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDcEUsV0FBVyxDQUFDLHdCQUF3QixFQUFFLHNCQUFzQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2hGLFdBQVcsQ0FBQywyQkFBMkIsRUFBRSx5QkFBeUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN0RixXQUFXLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDdEUsV0FBVyxDQUFDLHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQzVFLFdBQVcsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUNwRSxXQUFXLENBQUMsc0JBQXNCLEVBQUUsb0JBQW9CLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUM7S0FDNUUsV0FBVyxDQUFDLG9CQUFvQixFQUFFLGtCQUFrQixFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ3hFLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsQ0FBQztLQUN0RSxXQUFXLENBQUMsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDO0tBQ2xFLFdBQVcsQ0FDVixtQkFBbUIsRUFDbkIsT0FBTyxDQUFDLDhEQUE4RCxDQUFDLENBQ3hFO0tBQ0EsYUFBYSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUNoRSxhQUFhLENBQUMsZUFBZSxFQUFFLHdCQUF3QixDQUFDO0tBQ3hELGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUUsQ0FDdEMsT0FBTyxDQUFDLHNEQUFzRCxDQUFDLENBQ2hFLENBQUMifQ==