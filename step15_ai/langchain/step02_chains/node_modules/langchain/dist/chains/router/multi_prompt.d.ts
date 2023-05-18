import { BaseLanguageModel } from "../../base_language/index.js";
import { MultiRouteChain, MultiRouteChainInput } from "./multi_route.js";
import { BaseChain } from "../../chains/base.js";
import { PromptTemplate } from "../../prompts/prompt.js";
export declare class MultiPromptChain extends MultiRouteChain {
    static fromPrompts(llm: BaseLanguageModel, promptNames: string[], promptDescriptions: string[], promptTemplates: string[] | PromptTemplate[], defaultChain?: BaseChain, options?: Omit<MultiRouteChainInput, "defaultChain">): MultiPromptChain;
    _chainType(): string;
}
