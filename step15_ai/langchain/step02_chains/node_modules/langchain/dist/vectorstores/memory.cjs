"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryVectorStore = void 0;
const ml_distance_1 = require("ml-distance");
const base_js_1 = require("./base.cjs");
const document_js_1 = require("../document.cjs");
class MemoryVectorStore extends base_js_1.VectorStore {
    constructor(embeddings, { similarity, ...rest } = {}) {
        super(embeddings, rest);
        Object.defineProperty(this, "memoryVectors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "similarity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.similarity = similarity ?? ml_distance_1.similarity.cosine;
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        const memoryVectors = vectors.map((embedding, idx) => ({
            content: documents[idx].pageContent,
            embedding,
            metadata: documents[idx].metadata,
        }));
        this.memoryVectors = this.memoryVectors.concat(memoryVectors);
    }
    async similaritySearchVectorWithScore(query, k) {
        const searches = this.memoryVectors
            .map((vector, index) => ({
            similarity: this.similarity(query, vector.embedding),
            index,
        }))
            .sort((a, b) => (a.similarity > b.similarity ? -1 : 0))
            .slice(0, k);
        const result = searches.map((search) => [
            new document_js_1.Document({
                metadata: this.memoryVectors[search.index].metadata,
                pageContent: this.memoryVectors[search.index].content,
            }),
            search.similarity,
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
        return MemoryVectorStore.fromDocuments(docs, embeddings, dbConfig);
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
exports.MemoryVectorStore = MemoryVectorStore;
