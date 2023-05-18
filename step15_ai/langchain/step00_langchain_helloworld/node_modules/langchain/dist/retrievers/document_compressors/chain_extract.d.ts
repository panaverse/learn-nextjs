import { Document } from "../../document.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { BaseDocumentCompressor } from "./index.js";
export interface LLMChainExtractorArgs {
    llmChain: LLMChain;
    getInput: (query: string, doc: Document) => Record<string, unknown>;
}
export declare class LLMChainExtractor extends BaseDocumentCompressor {
    llmChain: LLMChain;
    getInput: (query: string, doc: Document) => Record<string, unknown>;
    constructor({ llmChain, getInput }: LLMChainExtractorArgs);
    compressDocuments(documents: Document[], query: string): Promise<Document[]>;
    static fromLLM(llm: BaseLanguageModel, prompt?: PromptTemplate, getInput?: (query: string, doc: Document) => Record<string, unknown>): LLMChainExtractor;
}
