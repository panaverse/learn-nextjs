import { BaseRetriever } from "../schema/index.js";
import { Document } from "../document.js";
import { AsyncCaller } from "../util/async_caller.js";
export class DataberryRetriever extends BaseRetriever {
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
        this.caller = new AsyncCaller(rest);
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
        return results.map(({ text, score, source, ...rest }) => new Document({
            pageContent: text,
            metadata: {
                score,
                source,
                ...rest,
            },
        }));
    }
}
