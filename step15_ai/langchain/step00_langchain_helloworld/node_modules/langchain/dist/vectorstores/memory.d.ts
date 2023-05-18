import { similarity as ml_distance_similarity } from "ml-distance";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
interface MemoryVector {
    content: string;
    embedding: number[];
    metadata: Record<string, any>;
}
export interface MemoryVectorStoreArgs {
    similarity?: typeof ml_distance_similarity.cosine;
}
export declare class MemoryVectorStore extends VectorStore {
    memoryVectors: MemoryVector[];
    similarity: typeof ml_distance_similarity.cosine;
    constructor(embeddings: Embeddings, { similarity, ...rest }?: MemoryVectorStoreArgs);
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig?: MemoryVectorStoreArgs): Promise<MemoryVectorStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig?: MemoryVectorStoreArgs): Promise<MemoryVectorStore>;
    static fromExistingIndex(embeddings: Embeddings, dbConfig?: MemoryVectorStoreArgs): Promise<MemoryVectorStore>;
}
export {};
