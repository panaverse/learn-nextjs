"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonAgent = exports.JsonToolkit = void 0;
const json_js_1 = require("../../../tools/json.cjs");
const prompt_js_1 = require("./prompt.cjs");
const llm_chain_js_1 = require("../../../chains/llm_chain.cjs");
const index_js_1 = require("../../mrkl/index.cjs");
const base_js_1 = require("../base.cjs");
const executor_js_1 = require("../../executor.cjs");
class JsonToolkit extends base_js_1.Toolkit {
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
            new json_js_1.JsonListKeysTool(jsonSpec),
            new json_js_1.JsonGetValueTool(jsonSpec),
        ];
    }
}
exports.JsonToolkit = JsonToolkit;
function createJsonAgent(llm, toolkit, args) {
    const { prefix = prompt_js_1.JSON_PREFIX, suffix = prompt_js_1.JSON_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = toolkit;
    const prompt = index_js_1.ZeroShotAgent.createPrompt(tools, {
        prefix,
        suffix,
        inputVariables,
    });
    const chain = new llm_chain_js_1.LLMChain({ prompt, llm });
    const agent = new index_js_1.ZeroShotAgent({
        llmChain: chain,
        allowedTools: tools.map((t) => t.name),
    });
    return executor_js_1.AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
exports.createJsonAgent = createJsonAgent;
