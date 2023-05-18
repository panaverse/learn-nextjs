import type { DataSource as DataSourceT, DataSourceOptions } from "typeorm";
import { SerializedSqlDatabase, SqlDatabaseDataSourceParams, SqlDatabaseOptionsParams, SqlTable } from "./util/sql_utils.js";
export { SqlDatabaseDataSourceParams, SqlDatabaseOptionsParams };
export declare class SqlDatabase implements SqlDatabaseOptionsParams, SqlDatabaseDataSourceParams {
    appDataSourceOptions: DataSourceOptions;
    appDataSource: DataSourceT;
    allTables: Array<SqlTable>;
    includesTables: Array<string>;
    ignoreTables: Array<string>;
    sampleRowsInTableInfo: number;
    protected constructor(fields: SqlDatabaseDataSourceParams);
    static fromDataSourceParams(fields: SqlDatabaseDataSourceParams): Promise<SqlDatabase>;
    static fromOptionsParams(fields: SqlDatabaseOptionsParams): Promise<SqlDatabase>;
    /**
     * Get information about specified tables.
     *
     * Follows best practices as specified in: Rajkumar et al, 2022
     * (https://arxiv.org/abs/2204.00498)
     *
     * If `sample_rows_in_table_info`, the specified number of sample rows will be
     * appended to each table description. This can increase performance as
     * demonstrated in the paper.
     */
    getTableInfo(targetTables?: Array<string>): Promise<string>;
    /**
     * Execute a SQL command and return a string representing the results.
     * If the statement returns rows, a string of the results is returned.
     * If the statement returns no rows, an empty string is returned.
     */
    run(command: string, fetch?: "all" | "one"): Promise<string>;
    serialize(): SerializedSqlDatabase;
    /** @ignore */
    static imports(): Promise<{
        DataSource: typeof DataSourceT;
    }>;
}
