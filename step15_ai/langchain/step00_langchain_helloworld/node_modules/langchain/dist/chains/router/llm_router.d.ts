import { BasePromptTemplate } from "../../prompts/base.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { RouterChain } from "./multi_route.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { ChainValues } from "../../schema/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { ChainInputs } from "../../chains/base.js";
export type RouterOutputSchema = {
    destination: string;
    next_inputs: {
        [key: string]: string;
    };
};
export interface LLMRouterChainInput extends ChainInputs {
    llmChain: LLMChain<RouterOutputSchema>;
}
export declare class LLMRouterChain extends RouterChain implements LLMRouterChainInput {
    llmChain: LLMChain<RouterOutputSchema>;
    constructor(fields: LLMRouterChainInput);
    get inputKeys(): string[];
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun | undefined): Promise<RouterOutputSchema>;
    _chainType(): string;
    static fromLLM(llm: BaseLanguageModel, prompt: BasePromptTemplate, options?: Omit<LLMRouterChainInput, "llmChain">): LLMRouterChain;
}
