import { Tool } from "../../../tools/base.js";
import { Toolkit } from "../base.js";
import { BaseLanguageModel } from "../../../base_language/index.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { AgentExecutor } from "../../executor.js";
import { SqlDatabase } from "../../../sql_db.js";
export interface SqlCreatePromptArgs extends ZeroShotCreatePromptArgs {
    /** Number of results to return. */
    topK?: number;
}
export declare class SqlToolkit extends Toolkit {
    tools: Tool[];
    db: SqlDatabase;
    dialect: string;
    constructor(db: SqlDatabase);
}
export declare function createSqlAgent(llm: BaseLanguageModel, toolkit: SqlToolkit, args?: SqlCreatePromptArgs): AgentExecutor;
