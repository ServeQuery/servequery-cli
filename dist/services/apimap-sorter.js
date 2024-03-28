const { inject } = require('@servequery/context');
function ApimapSorter(apimap) {
    const { assertPresent, logger, lodash } = inject();
    assertPresent({ logger, lodash });
    function sortArrayOfObjects(array) {
        return lodash.sortBy(array, ['type', 'id']);
    }
    function sortArrayOfFields(array) {
        return lodash.sortBy(array, ['field', 'type']);
    }
    function reorderKeysBasic(object) {
        const objectReordered = {};
        lodash.each(lodash.sortBy(Object.keys(object)), key => {
            objectReordered[key] = object[key];
        });
        return objectReordered;
    }
    function reorderKeysChild(object) {
        const objectReorderedStart = {
            type: object.type,
            id: object.id,
            attributes: object.attributes,
        };
        return Object.assign(objectReorderedStart, object);
    }
    function reorderKeysCollection(collection) {
        const collectionReorderedStart = {
            name: collection.name,
        };
        const collectionReorderedEnd = collection.fields ? { fields: collection.fields } : {};
        delete collection.name;
        delete collection.fields;
        collection = reorderKeysBasic(collection);
        return Object.assign(collectionReorderedStart, collection, collectionReorderedEnd);
    }
    function reorderKeysField(field) {
        const fieldReorderedStart = {
            field: field.field,
            type: field.type,
        };
        delete field.fields;
        delete field.type;
        field = reorderKeysBasic(field);
        return Object.assign(fieldReorderedStart, field);
    }
    this.perform = () => {
        try {
            apimap = reorderKeysBasic(apimap);
            apimap.data = sortArrayOfObjects(apimap.data);
            apimap.data = apimap.data.map(collection => {
                collection = reorderKeysChild(collection);
                collection.attributes = reorderKeysCollection(collection.attributes);
                if (collection.attributes.fields) {
                    collection.attributes.fields = sortArrayOfFields(collection.attributes.fields);
                    collection.attributes.fields = collection.attributes.fields.map(field => reorderKeysField(field));
                }
                return collection;
            });
            if (apimap.included) {
                apimap.included = sortArrayOfObjects(apimap.included);
                apimap.included = apimap.included.map(include => {
                    include = reorderKeysChild(include);
                    include.attributes = reorderKeysCollection(include.attributes);
                    if (include.attributes.fields) {
                        include.attributes.fields = sortArrayOfFields(include.attributes.fields);
                        include.attributes.fields = include.attributes.fields.map(field => reorderKeysField(field));
                    }
                    return include;
                });
            }
            apimap.meta = reorderKeysBasic(apimap.meta);
            return apimap;
        }
        catch (error) {
            logger.warn('An Apimap reordering issue occured:', error);
            return apimap;
        }
    };
}
module.exports = ApimapSorter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpbWFwLXNvcnRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJ2aWNlcy9hcGltYXAtc29ydGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQUVuRCxTQUFTLFlBQVksQ0FBQyxNQUFNO0lBQzFCLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sRUFBRSxDQUFDO0lBQ25ELGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBRWxDLFNBQVMsa0JBQWtCLENBQUMsS0FBSztRQUMvQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVMsaUJBQWlCLENBQUMsS0FBSztRQUM5QixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBTTtRQUM5QixNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFFM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNwRCxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxlQUFlLENBQUM7SUFDekIsQ0FBQztJQUVELFNBQVMsZ0JBQWdCLENBQUMsTUFBTTtRQUM5QixNQUFNLG9CQUFvQixHQUFHO1lBQzNCLElBQUksRUFBRSxNQUFNLENBQUMs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