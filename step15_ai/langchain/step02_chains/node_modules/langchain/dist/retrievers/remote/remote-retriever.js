import { Document } from "../../document.js";
import { RemoteRetriever, } from "./base.js";
export class RemoteLangChainRetriever extends RemoteRetriever {
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
        (r) => new Document({
            pageContent: r[this.pageContentKey],
            metadata: r[this.metadataKey],
        }));
    }
}
