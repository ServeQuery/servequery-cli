const JSONAPISerializer = require('jsonapi-serializer').Serializer;
module.exports = new JSONAPISerializer('projects', {
    attributes: ['name', 'defaultEnvironment', 'origin', 'agent', 'databaseType', 'architecture'],
    defaultEnvironment: {
        ref: 'id',
        attributes: ['name', 'apiEndpoint', 'type'],
    },
    keyForAttribute: 'snake_case',
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemVycy9wcm9qZWN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsVUFBVSxDQUFDO0FBRW5FLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLEVBQUU7SUFDakQsVUFBVSxFQUFFLENBQUMsTUFBTSxFQUFFLG9CQUFvQixFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLGNBQWMsQ0FBQztJQUM3RixrQkFBa0IsRUFBRTtRQUNsQixHQUFHLEVBQUUsSUFBSTtRQUNULFVBQVUsRUFBRSxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsTUFBTSxDQUFDO0tBQzVDO0lBQ0QsZUFBZSxFQUFFLFlBQVk7Q0FDOUIsQ0FBQyxDQUFDIn0=