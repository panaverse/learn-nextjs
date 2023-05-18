import { BasePromptTemplate } from "../../prompts/base.js";
import { StuffDocumentsChain, MapReduceDocumentsChain, RefineDocumentsChain, MapReduceDocumentsChainInput } from "../combine_docs_chain.js";
import { BaseLanguageModel } from "../../base_language/index.js";
export type QAChainParams = ({
    type?: "stuff";
} & StuffQAChainParams) | ({
    type?: "map_reduce";
} & MapReduceQAChainParams) | ({
    type?: "refine";
} & RefineQAChainParams);
export declare const loadQAChain: (llm: BaseLanguageModel, params?: QAChainParams) => StuffDocumentsChain | MapReduceDocumentsChain | RefineDocumentsChain;
export interface StuffQAChainParams {
    prompt?: BasePromptTemplate;
    verbose?: boolean;
}
export declare function loadQAStuffChain(llm: BaseLanguageModel, params?: StuffQAChainParams): StuffDocumentsChain;
export interface MapReduceQAChainParams {
    returnIntermediateSteps?: MapReduceDocumentsChainInput["returnIntermediateSteps"];
    combineMapPrompt?: BasePromptTemplate;
    combinePrompt?: BasePromptTemplate;
    verbose?: boolean;
}
export declare function loadQAMapReduceChain(llm: BaseLanguageModel, params?: MapReduceQAChainParams): MapReduceDocumentsChain;
export interface RefineQAChainParams {
    questionPrompt?: BasePromptTemplate;
    refinePrompt?: BasePromptTemplate;
    verbose?: boolean;
}
export declare function loadQARefineChain(llm: BaseLanguageModel, params?: RefineQAChainParams): RefineDocumentsChain;
