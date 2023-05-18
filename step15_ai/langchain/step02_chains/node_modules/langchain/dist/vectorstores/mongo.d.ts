import type { MongoClient, Collection, Document as MongoDocument } from "mongodb";
import { VectorStore } from "./base.js";
import { Embeddings } from "../embeddings/base.js";
import { Document } from "../document.js";
export type MongoLibArgs = {
    client: MongoClient;
    collection: Collection<MongoDocument>;
    indexName?: string;
};
export type MongoVectorStoreQueryExtension = {
    postQueryPipelineSteps?: MongoDocument[];
};
export declare class MongoVectorStore extends VectorStore {
    FilterType: MongoVectorStoreQueryExtension;
    collection: Collection<MongoDocument>;
    client: MongoClient;
    indexName: string;
    constructor(embeddings: Embeddings, args: MongoLibArgs);
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number, filter?: MongoVectorStoreQueryExtension): Promise<[Document, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: MongoLibArgs): Promise<MongoVectorStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: MongoLibArgs): Promise<MongoVectorStore>;
}
