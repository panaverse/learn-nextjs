"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteLangChainRetriever = void 0;
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("./base.cjs");
class RemoteLangChainRetriever extends base_js_1.RemoteRetriever {
    constructor({ inputKey = "message", responseKey = "response", pageContentKey = "page_content", metadataKey = "metadata", ...rest }) {
        super(rest);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "responseKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "pageContentKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadataKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.inputKey = inputKey;
        this.responseKey = responseKey;
        this.pageContentKey = pageContentKey;
        this.metadataKey = metadataKey;
    }
    createJsonBody(query) {
        return {
            [this.inputKey]: query,
        };
    }
    processJsonResponse(json) {
        return json[this.responseKey].map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r) => new document_js_1.Document({
            pageContent: r[this.pageContentKey],
            metadata: r[this.metadataKey],
        }));
    }
}
exports.RemoteLangChainRetriever = RemoteLangChainRetriever;
