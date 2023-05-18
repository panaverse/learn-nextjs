"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVectorStoreRouterAgent = exports.createVectorStoreAgent = exports.VectorStoreRouterToolkit = exports.VectorStoreToolkit = void 0;
const vectorstore_js_1 = require("../../../tools/vectorstore.cjs");
const base_js_1 = require("../base.cjs");
const index_js_1 = require("../../mrkl/index.cjs");
const prompt_js_1 = require("./prompt.cjs");
const prompt_js_2 = require("../../mrkl/prompt.cjs");
const llm_chain_js_1 = require("../../../chains/llm_chain.cjs");
const executor_js_1 = require("../../executor.cjs");
class VectorStoreToolkit extends base_js_1.Toolkit {
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
        const description = vectorstore_js_1.VectorStoreQATool.getDescription(vectorStoreInfo.name, vectorStoreInfo.description);
        this.llm = llm;
        this.tools = [
            new vectorstore_js_1.VectorStoreQATool(vectorStoreInfo.name, description, {
                vectorStore: vectorStoreInfo.vectorStore,
                llm: this.llm,
            }),
        ];
    }
}
exports.VectorStoreToolkit = VectorStoreToolkit;
class VectorStoreRouterToolkit extends base_js_1.Toolkit {
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
            const description = vectorstore_js_1.VectorStoreQATool.getDescription(vectorStoreInfo.name, vectorStoreInfo.description);
            return new vectorstore_js_1.VectorStoreQATool(vectorStoreInfo.name, description, {
                vectorStore: vectorStoreInfo.vectorStore,
                llm: this.llm,
            });
        });
    }
}
exports.VectorStoreRouterToolkit = VectorStoreRouterToolkit;
function createVectorStoreAgent(llm, toolkit, args) {
    const { prefix = prompt_js_1.VECTOR_PREFIX, suffix = prompt_js_2.SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
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
exports.createVectorStoreAgent = createVectorStoreAgent;
function createVectorStoreRouterAgent(llm, toolkit, args) {
    const { prefix = prompt_js_1.VECTOR_ROUTER_PREFIX, suffix = prompt_js_2.SUFFIX, inputVariables = ["input", "agent_scratchpad"], } = args ?? {};
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
exports.createVectorStoreRouterAgent = createVectorStoreRouterAgent;
