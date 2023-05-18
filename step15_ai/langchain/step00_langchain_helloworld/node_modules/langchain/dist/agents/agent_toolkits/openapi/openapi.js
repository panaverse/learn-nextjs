import { DynamicTool } from "../../../tools/dynamic.js";
import { AgentExecutor } from "../../executor.js";
import { OPENAPI_PREFIX, OPENAPI_SUFFIX, JSON_EXPLORER_DESCRIPTION, } from "./prompt.js";
import { LLMChain } from "../../../chains/llm_chain.js";
import { ZeroShotAgent } from "../../mrkl/index.js";
import { Toolkit } from "../base.js";
import { RequestsGetTool, RequestsPostTool, } from "../../../tools/requests.js";
import { createJsonAgent, JsonToolkit } from "../json/json.js";
export class RequestsToolkit extends Toolkit {
    constructor(headers) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.tools = [new RequestsGetTool(headers), new RequestsPostTool(headers)];
    }
}
export class OpenApiToolkit extends RequestsToolkit {
    constructor(jsonSpec, llm, headers) {
        super(headers);
        const jsonAgent = createJsonAgent(llm, new JsonToolkit(jsonSpec));
        this.tools = [
            ...this.tools,
            new DynamicTool({
                name: "json_explorer",
                func: async (input) => {
                    const result = await jsonAgent.call({ input });
                    return result.output;
                },
                description: JSON_EXPLORER_DESCRIPTION,
            }),
        ];
    }
}
export function createOpenApiAgent(llm, openApiToolkit, args) {
    const { prefix = OPENAPI_PREFIX, suffix = OPENAPI_SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
    const { tools } = openApiToolkit;
    const prompt = ZeroShotAgent.createPrompt(tools, {
        prefix,
        suffix,
        inputVariables,
    });
    const chain = new LLMChain({
        prompt,
        llm,
    });
    const toolNames = tools.map((tool) => tool.name);
    const agent = new ZeroShotAgent({ llmChain: chain, allowedTools: toolNames });
    return AgentExecutor.fromAgentAndTools({
        agent,
        tools,
        returnIntermediateSteps: true,
    });
}
