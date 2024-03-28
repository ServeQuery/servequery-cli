const { ObjectId } = require('mongodb');
/**
 * Retrieves simple mongoose type from value if detectable
 * Simple types are 'Date', 'Boolean', 'Number', 'String', 'Mongoose.Schema.Types.ObjectId'
 * @param value
 * @returns {string|null} return
 */
/* istanbul ignore next */
function getMongooseTypeFromValue(value) {
    if (typeof value === 'object' && value instanceof Date) {
        return 'Date';
    }
    if (typeof value === 'object' && value instanceof ObjectId) {
        return 'Mongoose.Schema.Types.ObjectId';
    }
    switch (typeof value) {
        case 'boolean':
            return 'Boolean';
        case 'number':
            return 'Number';
        case 'string':
            return 'String';
        default:
            return null;
    }
}
/**
 * Checks if the value corresponds to a mongoose type
 * @param value
 * @returns {boolean}
 */
/* istanbul ignore next */
function isOfMongooseType(value) {
    return !!getMongooseTypeFromValue(value);
}
module.exports = {
    getMongooseTypeFromValue,
    isOfMongooseType,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ28tcHJpbWl0aXZlLXR5cGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvbW9uZ28tcHJpbWl0aXZlLXR5cGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUV4Qzs7Ozs7R0FLRztBQUNILDBCQUEwQjtBQUMxQixTQUFTLHdCQUF3QixDQUFDLEtBQUs7SUFDckMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLElBQUksRUFBRTtRQUN0RCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLElBQUksS0FBSyxZQUFZLFFBQVEsRUFBRTtRQUMxRCxPQUFPLGdDQUFnQyxDQUFDO0tBQ3pDO0lBRUQsUUFBUSxPQUFPLEtBQUssRUFBRTtRQUNwQixLQUFLLFNBQVM7WUFDWixPQUFPLFNBQVMsQ0FBQztRQUNuQixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUNsQixLQUFLLFFBQVE7WUFDWCxPQUFPLFFBQVEsQ0FBQztRQUNsQjtZQUNFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILDBCQUEwQjtBQUMxQixTQUFTLGdCQUFnQixDQUFDLEtBQUs7SUFDN0IsT0FBTyxDQUFDLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7SUFDZix3QkFBd0I7SUFDeEIsZ0JBQWdCO0NBQ2pCLENBQUMifQ==