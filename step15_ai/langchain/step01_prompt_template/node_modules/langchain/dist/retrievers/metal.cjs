"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetalRetriever = void 0;
const index_js_1 = require("../schema/index.cjs");
const document_js_1 = require("../document.cjs");
class MetalRetriever extends index_js_1.BaseRetriever {
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
        return items.map(({ text, metadata }) => new document_js_1.Document({
            pageContent: text,
            metadata: metadata,
        }));
    }
}
exports.MetalRetriever = MetalRetriever;
