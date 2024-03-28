function MysqlTableConstraintsGetter(databaseConnection) {
    const queryInterface = databaseConnection.getQueryInterface();
    // NOTICE: provide an array of array. Each inner array representing a (possibly composite) unique
    //         index
    this.convertToUniqueIndexArray = constraints => {
        const uniqueIndexes = {};
        constraints
            .filter(constraint => constraint.columnType === 'UNIQUE')
            .forEach(constraint => {
            uniqueIndexes[constraint.constraintName] = uniqueIndexes[constraint.constraintName] || [];
            uniqueIndexes[constraint.constraintName].push(constraint.columnName);
        });
        const uniqueIndexArray = Object.values(uniqueIndexes);
        return uniqueIndexArray.length ? uniqueIndexArray : null;
    };
    // NOTICE: This function exists only to create a structure compatible with the needed response.
    this.applyUniqueIndexArray = constraints => {
        if (constraints && constraints.length) {
            const uniqueIndexes = this.convertToUniqueIndexArray(constraints);
            // NOTICE: We apply the uniqueIndexes array to every element of the constraints array.
            return constraints.map(constraint => ({ ...constraint, uniqueIndexes }));
        }
        return constraints;
    };
    this.perform = async (table) => {
        const replacements = { table, schemaName: queryInterface.sequelize.config.database };
        const query = `
        SELECT DISTINCT
            tableConstraints.constraint_type AS columnType,
            tableConstraints.constraint_name AS constraintName,
            tableConstraints.table_name AS tableName,
            keyColumnUsage.column_name AS columnName,
            keyColumnUsage.referenced_table_name AS foreignTableName,
            keyColumnUsage.referenced_column_name AS foreignColumnName,
            uniqueIndexes.SEQ_IN_INDEX AS sequenceInIndex
        FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS AS tableConstraints
        JOIN INFORMATION_SCHEMA.key_column_usage AS keyColumnUsage
          ON tableConstraints.table_name = keyColumnUsage.table_name
          AND tableConstraints.constraint_name = keyColumnUsage.constraint_name
        LEFT JOIN INFORMATION_SCHEMA.STATISTICS AS uniqueIndexes
          ON keyColumnUsage.column_name = uniqueIndexes.column_name
          AND tableConstraints.constraint_name = uniqueIndexes.INDEX_NAME
        WHERE tableConstraints.table_schema = :schemaName
          AND tableConstraints.table_name = :table
        ORDER BY uniqueIndexes.SEQ_IN_INDEX;
    `;
        const constraints = (await queryInterface.sequelize.query(query, {
            type: queryInterface.sequelize.QueryTypes.SELECT,
            replacements,
        }))
            // NOTICE: This map remove the `sequenceInIndex`property from the constraints.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .map(({ sequenceInIndex, ...constraint }) => constraint);
        return this.applyUniqueIndexArray(constraints);
    };
}
module.exports = MysqlTableConstraintsGetter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwtdGFibGUtY29uc3RyYWludHMtZ2V0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3NjaGVtYS91cGRhdGUvYW5hbHl6ZXIvbXlzcWwtdGFibGUtY29uc3RyYWludHMtZ2V0dGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsMkJBQTJCLENBQUMsa0JBQWtCO0lBQ3JELE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFFOUQsaUdBQWlHO0lBQ2pHLGdCQUFnQjtJQUNoQixJQUFJLENBQUMseUJBQXlCLEdBQUcsV0FBVyxDQUFDLEVBQUU7UUFDN0MsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLFdBQVc7YUFDUixNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxLQUFLLFFBQVEsQ0FBQzthQUN4RCxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDcEIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMxRixhQUFhLENBQUMsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUM7UUFDTCxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdEQsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDM0QsQ0FBQyxDQUFDO0lBRUYsK0ZBQStGO0lBQy9GLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxXQUFXLENBQUMsRUFBRTtRQUN6QyxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsTUFBTSxFQUFFO1lBQ3JDLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNsRSxzRkFBc0Y7WUFDdEYsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEdBQUcsVUFBVSxFQUFFLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMxRTtRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFO1FBQzNCLE1BQU0sWUFBWSxHQUFHLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyRixNQUFNLEtBQUssR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CYixDQUFDO1FBRUYsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsTUFBTSxjQUFjLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDMUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE1BQU07WUFDaEQsWUFBWTtTQUNiLENBQUMsQ0FDSDtZQUNDLDhFQUE4RTtZQUM5RSw2REFBNkQ7YUFDNUQsR0FBRyxDQUFDLENBQUMsRUFBRSxlQUFlLEVBQUUsR0FBRyxVQUFVLEVBQUUsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFM0QsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUMifQ==