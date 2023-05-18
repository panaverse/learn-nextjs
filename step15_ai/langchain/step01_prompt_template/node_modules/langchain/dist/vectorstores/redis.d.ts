import type { createCluster, createClient } from "redis";
import { VectorAlgorithms } from "redis";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export type CreateSchemaVectorField<T extends VectorAlgorithms, A extends Record<string, unknown>> = {
    ALGORITHM: T;
    DISTANCE_METRIC: "L2" | "IP" | "COSINE";
    INITIAL_CAP?: number;
} & A;
export type CreateSchemaFlatVectorField = CreateSchemaVectorField<VectorAlgorithms.FLAT, {
    BLOCK_SIZE?: number;
}>;
export type CreateSchemaHNSWVectorField = CreateSchemaVectorField<VectorAlgorithms.HNSW, {
    M?: number;
    EF_CONSTRUCTION?: number;
    EF_RUNTIME?: number;
}>;
export interface RedisVectorStoreConfig {
    redisClient: ReturnType<typeof createClient> | ReturnType<typeof createCluster>;
    indexName: string;
    indexOptions?: CreateSchemaFlatVectorField | CreateSchemaHNSWVectorField;
    keyPrefix?: string;
    contentKey?: string;
    metadataKey?: string;
    vectorKey?: string;
    filter?: RedisVectorStoreFilterType;
}
export interface RedisAddOptions {
    keys?: string[];
    batchSize?: number;
}
export type RedisVectorStoreFilterType = string[];
export declare class RedisVectorStore extends VectorStore {
    FilterType: RedisVectorStoreFilterType;
    private redisClient;
    indexName: string;
    indexOptions: CreateSchemaFlatVectorField | CreateSchemaHNSWVectorField;
    keyPrefix: string;
    contentKey: string;
    metadataKey: string;
    vectorKey: string;
    filter?: RedisVectorStoreFilterType;
    constructor(embeddings: Embeddings, _dbConfig: RedisVectorStoreConfig);
    addDocuments(documents: Document[], options?: RedisAddOptions): Promise<void>;
    addVectors(vectors: number[][], documents: Document[], { keys, batchSize }?: RedisAddOptions): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: RedisVectorStoreFilterType): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: RedisVectorStoreConfig): Promise<RedisVectorStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: RedisVectorStoreConfig): Promise<RedisVectorStore>;
    checkIndexExists(): Promise<boolean>;
    createIndex(dimensions?: number): Promise<void>;
    dropIndex(): Promise<boolean>;
    private buildQuery;
    private prepareFilter;
    /**
     * Escapes all '-' characters.
     * RediSearch considers '-' as a negative operator, hence we need
     * to escape it
     * @see https://redis.io/docs/stack/search/reference/query_syntax
     *
     * @param str
     * @returns
     */
    private escapeSpecialChars;
    /**
     * Unescapes all '-' characters, returning the original string
     *
     * @param str
     * @returns
     */
    private unEscapeSpecialChars;
    /**
     * Converts the vector to the buffer Redis needs to
     * correctly store an embedding
     *
     * @param vector
     * @returns Buffer
     */
    private getFloat32Buffer;
}
