import type { ChromaClient as ChromaClientT, Collection } from "chromadb";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export type ChromaLibArgs = {
    url?: string;
    numDimensions?: number;
    collectionName?: string;
} | {
    index?: ChromaClientT;
    numDimensions?: number;
    collectionName?: string;
};
export declare class Chroma extends VectorStore {
    index?: ChromaClientT;
    collection?: Collection;
    collectionName: string;
    numDimensions?: number;
    url: string;
    constructor(embeddings: Embeddings, args: ChromaLibArgs);
    addDocuments(documents: Document[]): Promise<void>;
    ensureCollection(): Promise<Collection>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document<Record<string, any>>, number][]>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig: {
        collectionName?: string;
        url?: string;
    }): Promise<Chroma>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: {
        collectionName?: string;
        url?: string;
    }): Promise<Chroma>;
    static fromExistingCollection(embeddings: Embeddings, dbConfig: {
        collectionName: string;
        url?: string;
    }): Promise<Chroma>;
    static imports(): Promise<{
        ChromaClient: typeof ChromaClientT;
    }>;
}
