import type { WeaviateClient, WhereFilter } from "weaviate-ts-client";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export declare const flattenObjectForWeaviate: (obj: Record<string, any>) => Record<string, any>;
export interface WeaviateLibArgs {
    client: WeaviateClient;
    /**
     * The name of the class in Weaviate. Must start with a capital letter.
     */
    indexName: string;
    textKey?: string;
    metadataKeys?: string[];
}
export interface WeaviateFilter {
    distance?: number;
    where: WhereFilter;
}
export declare class WeaviateStore extends VectorStore {
    embeddings: Embeddings;
    FilterType: WeaviateFilter;
    private client;
    private indexName;
    private textKey;
    private queryAttrs;
    constructor(embeddings: Embeddings, args: WeaviateLibArgs);
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    addDocuments(documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: WeaviateFilter): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object | object[], embeddings: Embeddings, args: WeaviateLibArgs): Promise<WeaviateStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, args: WeaviateLibArgs): Promise<WeaviateStore>;
    static fromExistingIndex(embeddings: Embeddings, args: WeaviateLibArgs): Promise<WeaviateStore>;
}
