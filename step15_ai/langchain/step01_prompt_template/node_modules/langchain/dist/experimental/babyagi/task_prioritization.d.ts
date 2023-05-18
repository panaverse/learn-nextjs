import { LLMChain, LLMChainInput } from "../../chains/llm_chain.js";
/** Chain to prioritize tasks. */
export declare class TaskPrioritizationChain extends LLMChain {
    static fromLLM(fields: Omit<LLMChainInput, "prompt">): LLMChain;
}
