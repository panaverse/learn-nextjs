import { Client } from "@opensearch-project/opensearch";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
import { VectorStore } from "./base.js";
type OpenSearchEngine = "nmslib" | "hnsw";
type OpenSearchSpaceType = "l2" | "cosinesimil" | "ip";
interface VectorSearchOptions {
    readonly engine?: OpenSearchEngine;
    readonly spaceType?: OpenSearchSpaceType;
    readonly m?: number;
    readonly efConstruction?: number;
    readonly efSearch?: number;
}
export interface OpenSearchClientArgs {
    readonly client: Client;
    readonly indexName?: string;
    readonly vectorSearchOptions?: VectorSearchOptions;
}
type OpenSearchFilter = object;
export declare class OpenSearchVectorStore extends VectorStore {
    FilterType: OpenSearchFilter;
    private readonly client;
    private readonly indexName;
    private readonly engine;
    private readonly spaceType;
    private readonly efConstruction;
    private readonly efSearch;
    private readonly m;
    constructor(embeddings: Embeddings, args: OpenSearchClientArgs);
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: OpenSearchFilter | undefined): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, args: OpenSearchClientArgs): Promise<OpenSearchVectorStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: OpenSearchClientArgs): Promise<OpenSearchVectorStore>;
    static fromExistingIndex(embeddings: Embeddings, dbConfig: OpenSearchClientArgs): Promise<OpenSearchVectorStore>;
    private ensureIndexExists;
    private buildMetadataTerms;
    doesIndexExist(): Promise<boolean>;
    deleteIfExists(): Promise<void>;
}
export {};
