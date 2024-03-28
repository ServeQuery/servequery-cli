function deserialize(error) {
    if (!error || !error.status) {
        throw new Error('Wrong API Error format');
    }
    const deserializedError = {
        status: error.status,
        message: null,
        meta: null,
    };
    if (error.response && error.response.text) {
        const errorDetails = JSON.parse(error.response.text);
        if (errorDetails.errors && errorDetails.errors[0]) {
            if (errorDetails.errors[0].detail) {
                deserializedError.message = errorDetails.errors[0].detail;
            }
            if (errorDetails.errors[0].meta) {
                deserializedError.meta = errorDetails.errors[0].meta;
            }
        }
    }
    return deserializedError;
}
module.exports = { deserialize };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Rlc2VyaWFsaXplcnMvYXBpLWVycm9yLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsV0FBVyxDQUFDLEtBQUs7SUFDeEIsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0tBQzNDO0lBRUQsTUFBTSxpQkFBaUIsR0FBRztRQUN4QixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU07UUFDcEIsT0FBTyxFQUFFLElBQUk7UUFDYixJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUM7SUFFRixJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7UUFDekMsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3JELElBQUksWUFBWSxDQUFDLE1BQU0sSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ2pELElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQzthQUMzRDtZQUNELElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQy9CLGlCQUFpQixDQUFDLElBQUksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzthQUN0RDtTQUNGO0tBQ0Y7SUFFRCxPQUFPLGlCQUFpQixDQUFDO0FBQzNCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLEVBQUUsV0FBVyxFQUFFLENBQUMifQ==