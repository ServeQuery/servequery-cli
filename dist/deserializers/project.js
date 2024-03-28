const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
module.exports = new JSONAPIDeserializer({
    keyForAttribute: 'camelCase',
    environments: {
        valueForRelationship: (relationship, included) => included,
    },
    renderings: {
        valueForRelationship: (relationship, included) => included,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXNlcmlhbGl6ZXJzL3Byb2plY3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxtQkFBbUIsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFFdkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO0lBQ3ZDLGVBQWUsRUFBRSxXQUFXO0lBQzVCLFlBQVksRUFBRTtRQUNaLG9CQUFvQixFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTtLQUMzRDtJQUNELFVBQVUsRUFBRTtRQUNWLG9CQUFvQixFQUFFLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUTtLQUMzRDtDQUNGLENBQUMsQ0FBQyJ9