import { Document } from "../document.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { VectorStore, VectorStoreRetriever, VectorStoreRetrieverInput } from "../vectorstores/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
export type PromptKey = "websearch" | "scifact" | "arguana" | "trec-covid" | "fiqa" | "dbpedia-entity" | "trec-news" | "mr-tydi";
export interface HydeRetrieverOptions<V extends VectorStore> extends VectorStoreRetrieverInput<V> {
    llm: BaseLanguageModel;
    promptTemplate?: BasePromptTemplate | PromptKey;
}
export declare class HydeRetriever<V extends VectorStore = VectorStore> extends VectorStoreRetriever<V> {
    llm: BaseLanguageModel;
    promptTemplate?: BasePromptTemplate;
    constructor(fields: HydeRetrieverOptions<V>);
    getRelevantDocuments(query: string): Promise<Document[]>;
}
export declare function getPromptTemplateFromKey(key: PromptKey): BasePromptTemplate;
