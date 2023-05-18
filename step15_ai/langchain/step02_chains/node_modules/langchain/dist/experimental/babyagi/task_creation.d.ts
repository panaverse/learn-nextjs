import { LLMChain, LLMChainInput } from "../../chains/llm_chain.js";
/** Chain to generate tasks. */
export declare class TaskCreationChain extends LLMChain {
    static fromLLM(fields: Omit<LLMChainInput, "prompt">): LLMChain;
}
