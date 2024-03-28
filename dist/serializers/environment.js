const JSONAPISerializer = require('jsonapi-serializer').Serializer;
module.exports = new JSONAPISerializer('environments', {
    attributes: [
        'name',
        'apiEndpoint',
        'project',
        'isActive',
        'type',
        'lianaName',
        'lianaVersion',
        'project',
        'secretKey',
        'currentBranchId',
        'areRolesDisabled',
    ],
    project: {
        ref: 'id',
        included: false,
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2VyaWFsaXplcnMvZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxVQUFVLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFpQixDQUFDLGNBQWMsRUFBRTtJQUNyRCxVQUFVLEVBQUU7UUFDVixNQUFNO1FBQ04sYUFBYTtRQUNiLFNBQVM7UUFDVCxVQUFVO1FBQ1YsTUFBTTtRQUNOLFdBQVc7UUFDWCxjQUFjO1FBQ2QsU0FBUztRQUNULFdBQVc7UUFDWCxpQkFBaUI7UUFDakIsa0JBQWtCO0tBQ25CO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsR0FBRyxFQUFFLElBQUk7UUFDVCxRQUFRLEVBQUUsS0FBSztLQUNoQjtDQUNGLENBQUMsQ0FBQyJ9