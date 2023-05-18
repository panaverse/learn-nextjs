import { LLMChain, LLMChainInput } from "./llm_chain.js";
import { Optional } from "../types/type-utils.js";
export declare const DEFAULT_TEMPLATE = "The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.\n\nCurrent conversation:\n{history}\nHuman: {input}\nAI:";
export declare class ConversationChain extends LLMChain {
    constructor({ prompt, outputKey, memory, ...rest }: Optional<LLMChainInput, "prompt">);
}
