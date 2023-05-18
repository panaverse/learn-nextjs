import { VectorStoreQATool } from "../../../tools/vectorstore.js";
import { Toolkit } from "../base.js";
import { ZeroShotAgent } from "../../mrkl/index.js";
import { VECTOR_PREFIX, VECTOR_ROUTER_PREFIX } from "./prompt.js";
import { SUFFIX } from "../../mrkl/prompt.js";
import { LLMChain } from "../../../chains/llm_chain.js";
import { AgentExecutor } from "../../executor.js";
export class VectorStoreToolkit extends Toolkit {
    constructor(vectorStoreInfo, llm) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const description = VectorStoreQATool.getDescription(vectorStoreInfo.name, vectorStoreInfo.description);
        this.llm = llm;
        this.tools = [
            new VectorStoreQATool(vectorStoreInfo.name, description, {
                vectorStore: vectorStoreInfo.vectorStore,
                llm: this.llm,
            }),
        ];
    }
}
export class VectorStoreRouterToolkit extends Toolkit {
    constructor(vectorStoreInfos, llm) {
        super();
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vectorStoreInfos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llm = llm;
        this.vectorStoreInfos = vectorStoreInfos;
        this.tools = vectorStoreInfos.map((vectorStoreInfo) => {
            const description = VectorStoreQATool.getDescription(vectorStoreInfo.name, vectorStoreInfo.description);
            return new VectorStoreQATool(vectorStoreInfo.name, description, {
                vectorStore: vectorStoreInfo.vectorStore,
                llm: this.llm,
            });
        });
    }
}
export function createVectorStoreAgent(llm, toolkit, args) {
    const { prefix = VECTOR_PREFIX, suffix = SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
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
export function createVectorStoreRouterAgent(llm, toolkit, args) {
    const { prefix = VECTOR_ROUTER_PREFIX, suffix = SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
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
