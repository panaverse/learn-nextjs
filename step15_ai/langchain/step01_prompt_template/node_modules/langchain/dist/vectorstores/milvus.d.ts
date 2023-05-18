import { MilvusClient } from "@zilliz/milvus2-sdk-node";
import { Embeddings } from "../embeddings/base.js";
import { VectorStore } from "./base.js";
import { Document } from "../document.js";
export interface MilvusLibArgs {
    collectionName?: string;
    primaryField?: string;
    vectorField?: string;
    textField?: string;
    url?: string;
    ssl?: boolean;
    username?: string;
    password?: string;
}
type IndexType = "IVF_FLAT" | "IVF_SQ8" | "IVF_PQ" | "HNSW" | "RHNSW_FLAT" | "RHNSW_SQ" | "RHNSW_PQ" | "IVF_HNSW" | "ANNOY";
interface IndexParam {
    params: {
        nprobe?: number;
        ef?: number;
        search_k?: number;
    };
}
export declare class Milvus extends VectorStore {
    collectionName: string;
    numDimensions?: number;
    autoId?: boolean;
    primaryField: string;
    vectorField: string;
    textField: string;
    fields: string[];
    client: MilvusClient;
    colMgr: MilvusClient["collectionManager"];
    idxMgr: MilvusClient["indexManager"];
    dataMgr: MilvusClient["dataManager"];
    indexParams: Record<IndexType, IndexParam>;
    indexCreateParams: {
        index_type: string;
        metric_type: string;
        params: string;
    };
    indexSearchParams: string;
    constructor(embeddings: Embeddings, args: MilvusLibArgs);
    addDocuments(documents: Document[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document[]): Promise<void>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document, number][]>;
    ensureCollection(vectors?: number[][], documents?: Document[]): Promise<void>;
    createCollection(vectors: number[][], documents: Document[]): Promise<void>;
    grabCollectionFields(): Promise<void>;
    static fromTexts(texts: string[], metadatas: object[] | object, embeddings: Embeddings, dbConfig?: {
        collectionName?: string;
        url?: string;
    }): Promise<Milvus>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig?: MilvusLibArgs): Promise<Milvus>;
    static fromExistingCollection(embeddings: Embeddings, dbConfig: MilvusLibArgs): Promise<Milvus>;
}
export {};
