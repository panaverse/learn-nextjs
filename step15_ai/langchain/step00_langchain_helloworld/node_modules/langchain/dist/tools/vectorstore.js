import { VectorDBQAChain } from "../chains/vector_db_qa.js";
import { Tool } from "./base.js";
export class VectorStoreQATool extends Tool {
    constructor(name, description, fields) {
        super();
        Object.defineProperty(this, "vectorStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = name;
        this.description = description;
        this.vectorStore = fields.vectorStore;
        this.llm = fields.llm;
        this.chain = VectorDBQAChain.fromLLM(this.llm, this.vectorStore);
    }
    static getDescription(name, description) {
        return `Useful for when you need to answer questions about ${name}. Whenever you need information about ${description} you should ALWAYS use this. Input should be a fully formed question.`;
    }
    /** @ignore */
    async _call(input) {
        return this.chain.run(input);
    }
}
