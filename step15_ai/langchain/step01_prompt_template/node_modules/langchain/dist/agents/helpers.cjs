"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deserializeHelper = void 0;
const llm_chain_js_1 = require("../chains/llm_chain.cjs");
const deserializeHelper = async (llm, tools, data, fromLLMAndTools, fromConstructor) => {
    if (data.load_from_llm_and_tools) {
        if (!llm) {
            throw new Error("Loading from llm and tools, llm must be provided.");
        }
        if (!tools) {
            throw new Error("Loading from llm and tools, tools must be provided.");
        }
        return fromLLMAndTools(llm, tools, data);
    }
    if (!data.llm_chain) {
        throw new Error("Loading from constructor, llm_chain must be provided.");
    }
    const llmChain = await llm_chain_js_1.LLMChain.deserialize(data.llm_chain);
    return fromConstructor({ ...data, llmChain });
};
exports.deserializeHelper = deserializeHelper;
