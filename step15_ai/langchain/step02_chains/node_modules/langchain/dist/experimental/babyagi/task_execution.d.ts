import { LLMChain, LLMChainInput } from "../../chains/llm_chain.js";
/** Chain to execute tasks. */
export declare class TaskExecutionChain extends LLMChain {
    static fromLLM(fields: Omit<LLMChainInput, "prompt">): LLMChain;
}
