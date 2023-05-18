import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
export class SupabaseHybridSearch extends BaseRetriever {
    constructor(embeddings, args) {
        super();
        Object.defineProperty(this, "similarityK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "query", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "keywordK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "similarityQueryName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
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
        Object.defineProperty(this, "keywordQueryName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "embeddings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.embeddings = embeddings;
        this.client = args.client;
        this.tableName = args.tableName || "documents";
        this.similarityQueryName = args.similarityQueryName || "match_documents";
        this.keywordQueryName = args.keywordQueryName || "kw_match_documents";
        this.similarityK = args.similarityK || 2;
        this.keywordK = args.keywordK || 2;
    }
    async similaritySearch(query, k) {
        const embeddedQuery = await this.embeddings.embedQuery(query);
        const matchDocumentsParams = {
            query_embedding: embeddedQuery,
            match_count: k,
        };
        const { data: searches, error } = await this.client.rpc(this.similarityQueryName, matchDocumentsParams);
        if (error) {
            throw new Error(`Error searching for documents: ${error.code} ${error.message} ${error.details}`);
        }
        return searches.map((resp) => [
            new Document({
                metadata: resp.metadata,
                pageContent: resp.content,
            }),
            resp.similarity,
            resp.id,
        ]);
    }
    async keywordSearch(query, k) {
        const kwMatchDocumentsParams = {
            query_text: query,
            match_count: k,
        };
        const { data: searches, error } = await this.client.rpc(this.keywordQueryName, kwMatchDocumentsParams);
        if (error) {
            throw new Error(`Error searching for documents: ${error.code} ${error.message} ${error.details}`);
        }
        return searches.map((resp) => [
            new Document({
                metadata: resp.metadata,
                pageContent: resp.content,
            }),
            resp.similarity * 10,
            resp.id,
        ]);
    }
    async hybridSearch(query, similarityK, keywordK) {
        const similarity_search = this.similaritySearch(query, similarityK);
        const keyword_search = this.keywordSearch(query, keywordK);
        return Promise.all([similarity_search, keyword_search])
            .then((results) => results.flat())
            .then((results) => {
            const picks = new Map();
            results.forEach((result) => {
                const id = result[2];
                const nextScore = result[1];
                const prevScore = picks.get(id)?.[1];
                if (prevScore === undefined || nextScore > prevScore) {
                    picks.set(id, result);
                }
            });
            return Array.from(picks.values());
        })
            .then((results) => results.sort((a, b) => b[1] - a[1]));
    }
    async getRelevantDocuments(query) {
        const searchResults = await this.hybridSearch(query, this.similarityK, this.keywordK);
        return searchResults.map(([doc]) => doc);
    }
}
