/**
 * Retrieves simple mongoose type from value if detectable
 * Simple types are 'Date', 'Boolean', 'Number', 'String', 'Mongoose.Schema.Types.ObjectId'
 * @param value
 * @returns {string|null} return
 */
export function getMongooseTypeFromValue(value: any): string | null;
/**
 * Checks if the value corresponds to a mongoose type
 * @param value
 * @returns {boolean}
 */
export function isOfMongooseType(value: any): boolean;
//# sourceMappingURL=mongo-primitive-type.d.ts.map