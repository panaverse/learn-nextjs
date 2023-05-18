import { Document } from "../document.js";
import { BaseMemory, getInputValue, } from "./base.js";
export class VectorStoreRetrieverMemory extends BaseMemory {
    constructor(fields) {
        super();
        Object.defineProperty(this, "vectorStoreRetriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnDocs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.vectorStoreRetriever = fields.vectorStoreRetriever;
        this.inputKey = fields.inputKey;
        this.memoryKey = fields.memoryKey ?? "memory";
        this.returnDocs = fields.returnDocs ?? false;
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    async loadMemoryVariables(values) {
        const query = getInputValue(values, this.inputKey);
        const results = await this.vectorStoreRetriever.getRelevantDocuments(query);
        return {
            [this.memoryKey]: this.returnDocs
                ? results
                : results.map((r) => r.pageContent).join("\n"),
        };
    }
    async saveContext(inputValues, outputValues) {
        const text = Object.entries(inputValues)
            .filter(([k]) => k !== this.memoryKey)
            .concat(Object.entries(outputValues))
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");
        await this.vectorStoreRetriever.addDocuments([
            new Document({ pageContent: text }),
        ]);
    }
}
