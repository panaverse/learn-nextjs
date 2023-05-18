import { BaseRetriever } from "../schema/index.js";
export class ContextualCompressionRetriever extends BaseRetriever {
    constructor({ baseCompressor, baseRetriever, }) {
        super();
        Object.defineProperty(this, "baseCompressor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseCompressor = baseCompressor;
        this.baseRetriever = baseRetriever;
    }
    async getRelevantDocuments(query) {
        const docs = await this.baseRetriever.getRelevantDocuments(query);
        const compressedDocs = await this.baseCompressor.compressDocuments(docs, query);
        return compressedDocs;
    }
}
