import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export interface MyScaleLibArgs {
    host: string;
    port: string | number;
    protocol?: string;
    username: string;
    password: string;
    indexType?: string;
    indexParam?: Record<string, string>;
    columnMap?: ColumnMap;
    database?: string;
    table?: string;
    metric?: metric;
}
export interface ColumnMap {
    id: string;
    text: string;
    vector: string;
    metadata: string;
}
export type metric = "ip" | "cosine" | "l2";
export interface MyScaleFilter {
    whereStr: string;
}
export declare class MyScaleStore extends VectorStore {
    FilterType: MyScaleFilter;
    private client;
    private indexType;
    private indexParam;
    private columnMap;
    private database;
    private table;
    private metric;
    private isInitialized;
    constructor(embeddings: Embeddings, args: MyScaleLibArgs);
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    addDocuments(documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: this["FilterType"]): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object | object[], embeddings: Embeddings, args: MyScaleLibArgs): Promise<MyScaleStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, args: MyScaleLibArgs): Promise<MyScaleStore>;
    static fromExistingIndex(embeddings: Embeddings, args: MyScaleLibArgs): Promise<MyScaleStore>;
    private initialize;
    private buildInsertQuery;
    private escapeString;
    private buildSearchQuery;
}
