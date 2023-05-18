"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOpenApiAgent = exports.OpenApiToolkit = exports.RequestsToolkit = void 0;
const dynamic_js_1 = require("../../../tools/dynamic.cjs");
const executor_js_1 = require("../../executor.cjs");
const prompt_js_1 = require("./prompt.cjs");
const llm_chain_js_1 = require("../../../chains/llm_chain.cjs");
const index_js_1 = require("../../mrkl/index.cjs");
const base_js_1 = require("../base.cjs");
const requests_js_1 = require("../../../tools/requests.cjs");
const json_js_1 = require("../json/json.cjs");
class RequestsToolkit extends base_js_1.Toolkit {
    constructor(headers) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = [new requests_js_1.RequestsGetTool(headers), new requests_js_1.RequestsPostTool(headers)];
    }
}
exports.RequestsToolkit = RequestsToolkit;
class OpenApiToolkit extends RequestsToolkit {
    constructor(jsonSpec, llm, headers) {
        super(headers);
        const jsonAgent = (0, json_js_1.createJsonAgent)(llm, new json_js_1.JsonToolkit(jsonSpec));
        this.tools = [
            ...this.tools,
            new dynamic_js_1.DynamicTool({
                name: "json_explorer",
                func: async (input) => {
                    const result = await jsonAgent.call({ input });
                    return result.output;
                },
                description: prompt_js_1.JSON_EXPLORER_DESCRIPTION,
            }),
        ];
    }
}
exports.OpenApiToolkit = OpenApiToolkit;
function createOpenApiAgent(llm, openApiToolkit, args) {
    const { prefix = prompt_js_1.OPENAPI_PREFIX, suffix = prompt_js_1.OPENAPI_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = openApiToolkit;
    const prompt = index_js_1.ZeroShotAgent.createPrompt(tools, {
        prefix,
        suffix,
        inputVariables,
    });
    const chain = new llm_chain_js_1.LLMChain({
        prompt,
        llm,
    });
    const toolNames = tools.map((tool) => tool.name);
    const agent = new index_js_1.ZeroShotAgent({ llmChain: chain, allowedTools: toolNames });
    return executor_js_1.AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
exports.createOpenApiAgent = createOpenApiAgent;
