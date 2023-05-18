import { JsonGetValueTool, JsonListKeysTool, } from "../../../tools/json.js";
import { JSON_PREFIX, JSON_SUFFIX } from "./prompt.js";
import { LLMChain } from "../../../chains/llm_chain.js";
import { ZeroShotAgent } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { AgentExecutor } from "../../executor.js";
export class JsonToolkit extends Toolkit {
    constructor(jsonSpec) {
        super();
        Object.defineProperty(this, "jsonSpec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: jsonSpec
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = [
            new JsonListKeysTool(jsonSpec),
            new JsonGetValueTool(jsonSpec),
        ];
    }
}
export function createJsonAgent(llm, toolkit, args) {
    const { prefix = JSON_PREFIX, suffix = JSON_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = toolkit;
    const prompt = ZeroShotAgent.createPrompt(tools, {
        prefix,
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
