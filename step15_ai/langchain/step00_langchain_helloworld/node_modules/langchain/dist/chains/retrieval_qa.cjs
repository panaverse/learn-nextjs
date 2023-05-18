"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetrievalQAChain = void 0;
const base_js_1 = require("./base.cjs");
const load_js_1 = require("./question_answering/load.cjs");
class RetrievalQAChain extends base_js_1.BaseChain {
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys.concat(this.returnSourceDocuments ? ["sourceDocuments"] : []);
    }
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "query"
        });
        Object.defineProperty(this, "retriever", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnSourceDocuments", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.retriever = fields.retriever;
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.returnSourceDocuments =
            fields.returnSourceDocuments ?? this.returnSourceDocuments;
    }
    /** @ignore */
    async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Question key ${this.inputKey} not found.`);
        }
        const question = values[this.inputKey];
        const docs = await this.retriever.getRelevantDocuments(question);
        const inputs = { question, input_documents: docs };
        const result = await this.combineDocumentsChain.call(inputs, runManager?.getChild());
        if (this.returnSourceDocuments) {
            return {
                ...result,
                sourceDocuments: docs,
            };
        }
        return result;
    }
    _chainType() {
        return "retrieval_qa";
    }
    static async deserialize(_data, _values) {
        throw new Error("Not implemented");
    }
    serialize() {
        throw new Error("Not implemented");
    }
    static fromLLM(llm, retriever, options) {
        const qaChain = (0, load_js_1.loadQAStuffChain)(llm, {
            prompt: options?.prompt,
        });
        return new this({
            retriever,
            combineDocumentsChain: qaChain,
            ...options,
        });
    }
}
exports.RetrievalQAChain = RetrievalQAChain;
