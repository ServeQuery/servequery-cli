export = MysqlTableConstraintsGetter;
declare function MysqlTableConstraintsGetter(databaseConnection: any): void;
declare class MysqlTableConstraintsGetter {
    constructor(databaseConnection: any);
    convertToUniqueIndexArray: (constraints: any) => any[];
    applyUniqueIndexArray: (constraints: any) => any;
    perform: (table: any) => Promise<any>;
}
//# sourceMappingURL=mysql-table-constraints-getter.d.ts.map