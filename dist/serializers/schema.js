const JSONAPISerializer = require('jsonapi-serializer').Serializer;
const ApimapSorter = require('../services/apimap-sorter');
function SchemaSerializer() {
    // WARNING: Attributes declaration order is important for .servequery-schema.json format.
    const options = {
        id: 'name',
        // TODO: Remove nameOld attribute once the lianas versions older than 2.0.0 are minority.
        attributes: [
            'name',
            'nameOld',
            'icon',
            'integration',
            'isReadOnly',
            'isSearchable',
            'isVirtual',
            'onlyForRelationships',
            'paginationType',
            'fields',
            'segments',
            'actions',
        ],
        fields: {
            attributes: [
                'field',
                'type',
                'column',
                'defaultValue',
                'enums',
                'integration',
                'isFilterable',
                'isPrimaryKey',
                'isReadOnly',
                'isRequired',
                'isSortable',
                'isVirtual',
                'reference',
                'inverseOf',
                'relationship',
                'widget',
                'validations',
                'foreignAndPrimaryKey',
            ],
        },
        validations: {
            attributes: ['message', 'type', 'value'],
        },
        actions: {
            ref: 'id',
            attributes: [
                'name',
                'type',
                'baseUrl',
                'endpoint',
                'httpMethod',
                'redirect',
                'download',
                'fields',
                'hooks',
            ],
            fields: {
                attributes: [
                    'field',
                    'type',
                    'defaultValue',
                    'enums',
                    'isRequired',
                    'isReadOnly',
                    'reference',
                    'description',
                    'position',
                    'widget',
                    'hook',
                ],
            },
            hooks: {
                attributes: ['change', 'load'],
            },
        },
        segments: {
            ref: 'id',
            attributes: ['name'],
        },
        keyForAttribute: 'camelCase',
    };
    this.options = options;
    this.perform = (collections, meta) => {
        // NOTICE: Action ids are defined concatenating the collection name and the object name to
        //         prevent object id conflicts between collections.
        collections.forEach(collection => {
            collection.actions?.forEach(action => {
                action.id = `${collection.name}.${action.name}`;
            });
            collection.segments?.forEach(segment => {
                segment.id = `${collection.name}.${segment.name}`;
            });
        });
        options.meta = meta;
        const serializedData = new JSONAPISerializer('collections', collections, options);
        return new ApimapSorter(serializedData).perform();
    };
}
module.exports = SchemaSerializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZXJzL3NjaGVtYS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFVBQVUsQ0FBQztBQUNuRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUUxRCxTQUFTLGdCQUFnQjtJQUN2QiwwRkFBMEY7SUFDMUYsTUFBTSxPQUFPLEdBQUc7UUFDZCxFQUFFLEVBQUUsTUFBTTtRQUNWLHlGQUF5RjtRQUN6RixVQUFVLEVBQUU7WUFDVixNQUFNO1lBQ04sU0FBUztZQUNULE1BQU07WUFDTixhQUFhO1lBQ2IsWUFBWTtZQUNaLGNBQWM7WUFDZCxXQUFXO1lBQ1gsc0JBQXNCO1lBQ3RCLGdCQUFnQjtZQUNoQixRQUFRO1lBQ1IsVUFBVTtZQUNWLFNBQVM7U0FDVjtRQUNELE1BQU0sRUFBRTtZQUNOLFVBQVUsRUFBRTtnQkFDVixPQUFPO2dCQUNQLE1BQU07Z0JBQ04sUUFBUTtnQkFDUixjQUFjO2dCQUNkLE9BQU87Z0JBQ1AsYUFBYTtnQkFDYixjQUFjO2dCQUNkLGNBQWM7Z0JBQ2QsWUFBWTtnQkFDWixZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxXQUFXO2dCQUNYLFdBQVc7Z0JBQ1gsY0FBYztnQkFDZCxRQUFRO2dCQUNSLGFBQWE7Z0JBQ2Isc0JBQXNCO2FBQ3ZCO1NBQ0Y7UUFDRCxXQUFXLEVBQUU7WUFDWCxVQUFVLEVBQUUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQztTQUN6QztRQUNELE9BQU8sRUFBRTtZQUNQLEdBQUcsRUFBRSxJQUFJO1lBQ1QsVUFBVSxFQUFFO2dCQUNWLE1BQU07Z0JBQ04sTUFBTTtnQkFDTixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsWUFBWTtnQkFDWixVQUFVO2dCQUNWLFVBQVU7Z0JBQ1YsUUFBUTtnQkFDUixPQUFPO2FBQ1I7WUFDRCxNQUFNLEVBQUU7Z0JBQ04sVUFBVSxFQUFFO29CQUNWLE9BQU87b0JBQ1AsTUFBTTtvQkFDTixjQUFjO29CQUNkLE9BQU87b0JBQ1AsWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsYUFBYTtvQkFDYixVQUFVO29CQUNWLFFBQVE7b0JBQ1IsTUFBTTtpQkFDUDthQUNGO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDL0I7U0FDRjtRQUNELFFBQVEsRUFBRTtZQUNSLEdBQUcsRUFBRSxJQUFJO1lBQ1QsVUFBVSxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQ3JCO1FBQ0QsZUFBZSxFQUFFLFdBQVc7S0FDN0IsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDbkMsMEZBQTBGO1FBQzFGLDJEQUEyRDtRQUMzRCxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQy9CLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLENBQUMsRUFBRSxHQUFHLEdBQUcsVUFBVSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbEQsQ0FBQyxDQUFDLENBQUM7WUFFSCxVQUFVLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckMsT0FBTyxDQUFDLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVwQixNQUFNLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFbEYsT0FBTyxJQUFJLFlBQVksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNwRCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyJ9