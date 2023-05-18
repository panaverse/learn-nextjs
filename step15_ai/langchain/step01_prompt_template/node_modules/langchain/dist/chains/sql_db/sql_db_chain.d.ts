import { BaseChain, ChainInputs } from "../base.js";
import type { SqlDatabase } from "../../sql_db.js";
import { ChainValues } from "../../schema/index.js";
import { SerializedSqlDatabaseChain } from "../serde.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { PromptTemplate } from "../../prompts/index.js";
export interface SqlDatabaseChainInput extends ChainInputs {
    llm: BaseLanguageModel;
    database: SqlDatabase;
    topK?: number;
    inputKey?: string;
    outputKey?: string;
    prompt?: PromptTemplate;
}
export declare class SqlDatabaseChain extends BaseChain {
    llm: BaseLanguageModel;
    database: SqlDatabase;
    prompt: PromptTemplate;
    topK: number;
    inputKey: string;
    outputKey: string;
    returnDirect: boolean;
    constructor(fields: SqlDatabaseChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "sql_database_chain";
    get inputKeys(): string[];
    get outputKeys(): string[];
    static deserialize(data: SerializedSqlDatabaseChain, SqlDatabaseFromOptionsParams: (typeof SqlDatabase)["fromOptionsParams"]): Promise<SqlDatabaseChain>;
    serialize(): SerializedSqlDatabaseChain;
    private verifyNumberOfTokens;
}
