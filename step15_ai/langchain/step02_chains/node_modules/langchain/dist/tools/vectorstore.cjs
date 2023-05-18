"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VectorStoreQATool = void 0;
const vector_db_qa_js_1 = require("../chains/vector_db_qa.cjs");
const base_js_1 = require("./base.cjs");
class VectorStoreQATool extends base_js_1.Tool {
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
        this.chain = vector_db_qa_js_1.VectorDBQAChain.fromLLM(this.llm, this.vectorStore);
    }
    static getDescription(name, description) {
        return `Useful for when you need to answer questions about ${name}. Whenever you need information about ${description} you should ALWAYS use this. Input should be a fully formed question.`;
    }
    /** @ignore */
    async _call(input) {
        return this.chain.run(input);
    }
}
exports.VectorStoreQATool = VectorStoreQATool;
