import type { DataSource, DataSourceOptions } from "typeorm";
import { PromptTemplate } from "../prompts/index.js";
export interface SqlDatabaseParams {
    includesTables?: Array<string>;
    ignoreTables?: Array<string>;
    sampleRowsInTableInfo?: number;
}
export interface SqlDatabaseOptionsParams extends SqlDatabaseParams {
    appDataSourceOptions: DataSourceOptions;
}
export interface SqlDatabaseDataSourceParams extends SqlDatabaseParams {
    appDataSource: DataSource;
}
export type SerializedSqlDatabase = SqlDatabaseOptionsParams & {
    _type: string;
};
export interface SqlTable {
    tableName: string;
    columns: SqlColumn[];
}
export interface SqlColumn {
    columnName: string;
    dataType?: string;
    isNullable?: boolean;
}
export declare const verifyListTablesExistInDatabase: (tablesFromDatabase: Array<SqlTable>, listTables: Array<string>, errorPrefixMsg: string) => void;
export declare const verifyIncludeTablesExistInDatabase: (tablesFromDatabase: Array<SqlTable>, includeTables: Array<string>) => void;
export declare const verifyIgnoreTablesExistInDatabase: (tablesFromDatabase: Array<SqlTable>, ignoreTables: Array<string>) => void;
export declare const getTableAndColumnsName: (appDataSource: DataSource) => Promise<Array<SqlTable>>;
export declare const generateTableInfoFromTables: (tables: Array<SqlTable> | undefined, appDataSource: DataSource, nbSampleRow: number) => Promise<string>;
export declare const getPromptTemplateFromDataSource: (appDataSource: DataSource) => PromptTemplate;
