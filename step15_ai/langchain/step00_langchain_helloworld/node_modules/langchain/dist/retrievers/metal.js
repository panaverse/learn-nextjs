import { BaseRetriever } from "../schema/index.js";
import { Document } from "../document.js";
export class MetalRetriever extends BaseRetriever {
    constructor(fields) {
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = fields.client;
    }
    async getRelevantDocuments(query) {
        const res = await this.client.search({ text: query });
        const items = ("data" in res ? res.data : res);
        return items.map(({ text, metadata }) => new Document({
            pageContent: text,
            metadata: metadata,
        }));
    }
}
