import { InfoSqlTool, ListTablesSqlTool, QueryCheckerTool, QuerySqlTool, } from "../../../tools/sql.js";
import { Toolkit } from "../base.js";
import { SQL_PREFIX, SQL_SUFFIX } from "./prompt.js";
import { renderTemplate } from "../../../prompts/template.js";
import { LLMChain } from "../../../chains/llm_chain.js";
import { ZeroShotAgent } from "../../mrkl/index.js";
import { AgentExecutor } from "../../executor.js";
export class SqlToolkit extends Toolkit {
    constructor(db) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dialect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "sqlite"
        });
        this.db = db;
        this.tools = [
            new QuerySqlTool(db),
            new InfoSqlTool(db),
            new ListTablesSqlTool(db),
            new QueryCheckerTool(),
        ];
    }
}
export function createSqlAgent(llm, toolkit, args) {
    const { prefix = SQL_PREFIX, suffix = SQL_SUFFIX, inputVariables = ["input", "agent_scratchpad"], topK = 10, } = args ?? {};
    const { tools } = toolkit;
    const formattedPrefix = renderTemplate(prefix, "f-string", {
        dialect: toolkit.dialect,
        top_k: topK,
    });
    const prompt = ZeroShotAgent.createPrompt(tools, {
        prefix: formattedPrefix,
        suffix,
        inputVariables,
    });
    const chain = new LLMChain({ prompt, llm });
    const agent = new ZeroShotAgent({
        llmChain: chain,
        allowedTools: tools.map((t) => t.name),
    });
    return AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
