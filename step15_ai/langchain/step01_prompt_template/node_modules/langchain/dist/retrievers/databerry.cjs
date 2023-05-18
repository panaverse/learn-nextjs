"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataberryRetriever = void 0;
const index_js_1 = require("../schema/index.cjs");
const document_js_1 = require("../document.cjs");
const async_caller_js_1 = require("../util/async_caller.cjs");
class DataberryRetriever extends index_js_1.BaseRetriever {
    constructor({ datastoreUrl, apiKey, topK, ...rest }) {
        super();
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datastoreUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new async_caller_js_1.AsyncCaller(rest);
        this.datastoreUrl = datastoreUrl;
        this.apiKey = apiKey;
        this.topK = topK;
    }
    async getRelevantDocuments(query) {
        const r = await this.caller.call(fetch, this.datastoreUrl, {
            method: "POST",
            body: JSON.stringify({
                query,
                ...(this.topK ? { topK: this.topK } : {}),
            }),
            headers: {
                "Content-Type": "application/json",
                ...(this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {}),
            },
        });
        const { results } = (await r.json());
        return results.map(({ text, score, source, ...rest }) => new document_js_1.Document({
            pageContent: text,
            metadata: {
                score,
                source,
                ...rest,
            },
        }));
    }
}
exports.DataberryRetriever = DataberryRetriever;
