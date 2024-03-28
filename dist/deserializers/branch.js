const JSONAPIDeserializer = require('jsonapi-serializer').Deserializer;
module.exports = new JSONAPIDeserializer({
    keyForAttribute: 'camelCase',
    environments: {
        valueForRelationship: (relationship, included) => included,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJhbmNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Rlc2VyaWFsaXplcnMvYnJhbmNoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sbUJBQW1CLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUMsWUFBWSxDQUFDO0FBRXZFLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQztJQUN2QyxlQUFlLEVBQUUsV0FBVztJQUM1QixZQUFZLEVBQUU7UUFDWixvQkFBb0IsRUFBRSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLFFBQVE7S0FDM0Q7Q0FDRixDQUFDLENBQUMifQ==