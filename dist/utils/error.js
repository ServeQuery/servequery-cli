const ApiErrorDeserializer = require('../deserializers/api-error');
const UNEXPECTED_ERROR_MESSAGE = 'Oops something went wrong.';
function getError(rawError) {
    let error;
    // NOTICE: We check if the errors are from the API (have a status) or if thrown internally.
    if (rawError.status) {
        try {
            error = ApiErrorDeserializer.deserialize(rawError);
        }
        catch (e) {
            return UNEXPECTED_ERROR_MESSAGE;
        }
    }
    else {
        error = rawError;
    }
    return error;
}
function handleError(rawError) {
    const error = getError(rawError);
    return error.message ? error.message : UNEXPECTED_ERROR_MESSAGE;
}
function handleErrorWithMeta(rawError) {
    const error = getError(rawError);
    return {
        message: error.message,
        meta: error.meta,
    };
}
module.exports = { handleError, handleErrorWithMeta };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvZXJyb3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxvQkFBb0IsR0FBRyxPQUFPLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUVuRSxNQUFNLHdCQUF3QixHQUFHLDRCQUE0QixDQUFDO0FBRTlELFNBQVMsUUFBUSxDQUFDLFFBQVE7SUFDeEIsSUFBSSxLQUFLLENBQUM7SUFDViwyRkFBMkY7SUFDM0YsSUFBSSxRQUFRLENBQUMsTUFBTSxFQUFFO1FBQ25CLElBQUk7WUFDRixLQUFLLEdBQUcsb0JBQW9CLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3BEO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDVixPQUFPLHdCQUF3QixDQUFDO1NBQ2pDO0tBQ0Y7U0FBTTtRQUNMLEtBQUssR0FBRyxRQUFRLENBQUM7S0FDbEI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxRQUFRO0lBQzNCLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNqQyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDO0FBQ2xFLENBQUM7QUFFRCxTQUFTLG1CQUFtQixDQUFDLFFBQVE7SUFDbkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLE9BQU87UUFDTCxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87UUFDdEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO0tBQ2pCLENBQUM7QUFDSixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLFdBQVcsRUFBRSxtQkFBbUIsRUFBRSxDQUFDIn0=