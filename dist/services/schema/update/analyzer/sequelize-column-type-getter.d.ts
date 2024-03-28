export = ColumnTypeGetter;
declare function ColumnTypeGetter(databaseConnection: any, schema: any, allowWarning?: boolean): void;
declare class ColumnTypeGetter {
    constructor(databaseConnection: any, schema: any, allowWarning?: boolean);
    getTypeForArray: (tableName: any, columnName: any) => any;
    perform: (columnInfo: any, columnName: any, tableName: any) => any;
}
//# sourceMappingURL=sequelize-column-type-getter.d.ts.map