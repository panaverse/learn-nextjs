import { Document } from "../../document.js";
import { RemoteRetriever, } from "./base.js";
export class ChatGPTPluginRetriever extends RemoteRetriever {
    constructor({ topK = 4, filter, ...rest }) {
        super(rest);
        Object.defineProperty(this, "topK", {
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
        this.topK = topK;
        this.filter = filter;
    }
    createJsonBody(query) {
        return {
            queries: [
                {
                    query,
                    top_k: this.topK,
                    filter: this.filter,
                },
            ],
        };
    }
    processJsonResponse(json) {
        const results = json?.results?.[0]?.results;
        if (!results) {
            // Note an empty array of results would not fall into this case
            throw new Error("No results returned from ChatGPTPluginRetriever");
        }
        return results.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (result) => new Document({
            pageContent: result.text,
            metadata: result.metadata,
        }));
    }
}
