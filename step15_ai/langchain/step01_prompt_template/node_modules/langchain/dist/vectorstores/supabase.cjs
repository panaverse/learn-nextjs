"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseVectorStore = void 0;
const base_js_1 = require("./base.cjs");
const document_js_1 = require("../document.cjs");
class SupabaseVectorStore extends base_js_1.VectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tableName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queryName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = args.client;
        this.tableName = args.tableName || "documents";
        this.queryName = args.queryName || "match_documents";
        this.filter = args.filter;
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        const rows = vectors.map((embedding, idx) => ({
            content: documents[idx].pageContent,
            embedding,
            metadata: documents[idx].metadata,
        }));
        // upsert returns 500/502/504 (yes really any of them) if given too many rows/characters
        // ~2000 trips it, but my data is probably smaller than average pageContent and metadata
        const chunkSize = 500;
        for (let i = 0; i < rows.length; i += chunkSize) {
            const chunk = rows.slice(i, i + chunkSize);
            const res = await this.client.from(this.tableName).insert(chunk);
            if (res.error) {
                throw new Error(`Error inserting: ${res.error.message} ${res.status} ${res.statusText}`);
            }
        }
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        if (filter && this.filter) {
            throw new Error("cannot provide both `filter` and `this.filter`");
        }
        const _filter = filter ?? this.filter;
        const matchDocumentsParams = {
            filter: _filter,
            query_embedding: query,
            match_count: k,
        };
        const { data: searches, error } = await this.client.rpc(this.queryName, matchDocumentsParams);
        if (error) {
            throw new Error(`Error searching for documents: ${error.code} ${error.message} ${error.details}`);
        }
        const result = searches.map((resp) => [
            new document_js_1.Document({
                metadata: resp.metadata,
                pageContent: resp.content,
            }),
            resp.similarity,
        ]);
        return result;
    }
    static async fromTexts(texts, metadatas, embeddings, dbConfig) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new document_js_1.Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return SupabaseVectorStore.fromDocuments(docs, embeddings, dbConfig);
    }
    static async fromDocuments(docs, embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        await instance.addDocuments(docs);
        return instance;
    }
    static async fromExistingIndex(embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        return instance;
    }
}
exports.SupabaseVectorStore = SupabaseVectorStore;
