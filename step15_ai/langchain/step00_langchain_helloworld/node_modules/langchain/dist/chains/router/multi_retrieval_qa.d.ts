import { BaseLanguageModel } from "../../base_language/index.js";
import { MultiRouteChain, MultiRouteChainInput } from "./multi_route.js";
import { BaseChain } from "../../chains/base.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { BaseRetriever } from "../../schema/index.js";
export type MultiRetrievalDefaults = {
    defaultRetriever?: BaseRetriever;
    defaultPrompt?: PromptTemplate;
    defaultChain?: BaseChain;
};
export declare class MultiRetrievalQAChain extends MultiRouteChain {
    get outputKeys(): string[];
    static fromRetrievers(llm: BaseLanguageModel, retrieverNames: string[], retrieverDescriptions: string[], retrievers: BaseRetriever[], retrieverPrompts?: PromptTemplate[], defaults?: MultiRetrievalDefaults, options?: Omit<MultiRouteChainInput, "defaultChain">): MultiRetrievalQAChain;
    _chainType(): string;
}
