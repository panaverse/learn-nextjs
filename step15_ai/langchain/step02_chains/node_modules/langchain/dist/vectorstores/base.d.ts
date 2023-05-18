import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
export interface VectorStoreRetrieverInput<V extends VectorStore> {
    vectorStore: V;
    k?: number;
    filter?: V["FilterType"];
}
export declare class VectorStoreRetriever<V extends VectorStore = VectorStore> extends BaseRetriever {
    vectorStore: V;
    k: number;
    filter?: V["FilterType"];
    constructor(fields: VectorStoreRetrieverInput<V>);
    getRelevantDocuments(query: string): Promise<Document[]>;
    addDocuments(documents: Document[]): Promise<void>;
}
export declare abstract class VectorStore {
    FilterType: object;
    embeddings: Embeddings;
    constructor(embeddings: Embeddings, _dbConfig: Record<string, any>);
    abstract addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    abstract addDocuments(documents: Document[]): Promise<void>;
    abstract similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"]): Promise<[Document, number][]>;
    similaritySearch(query: string, k?: number, filter?: this["FilterType"] | undefined): Promise<Document[]>;
    similaritySearchWithScore(query: string, k?: number, filter?: this["FilterType"] | undefined): Promise<[Document, number][]>;
    static fromTexts(_texts: string[], _metadatas: object[] | object, _embeddings: Embeddings, _dbConfig: Record<string, any>): Promise<VectorStore>;
    static fromDocuments(_docs: Document[], _embeddings: Embeddings, _dbConfig: Record<string, any>): Promise<VectorStore>;
    asRetriever(k?: number, filter?: this["FilterType"]): VectorStoreRetriever<this>;
}
export declare abstract class SaveableVectorStore extends VectorStore {
    abstract save(directory: string): Promise<void>;
    static load(_directory: string, _embeddings: Embeddings): Promise<SaveableVectorStore>;
}
