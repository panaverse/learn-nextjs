import { BaseChain } from "./base.js";
import { RecursiveCharacterTextSplitter, } from "../text_splitter.js";
/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export class AnalyzeDocumentChain extends BaseChain {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input_document"
        });
        Object.defineProperty(this, "combineDocumentsChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "textSplitter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.combineDocumentsChain = fields.combineDocumentsChain;
        this.inputKey = fields.inputKey ?? this.inputKey;
        this.textSplitter =
            fields.textSplitter ?? new RecursiveCharacterTextSplitter();
    }
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return this.combineDocumentsChain.outputKeys;
    }
    /** @ignore */
    async _call(values, runManager) {
        if (!(this.inputKey in values)) {
            throw new Error(`Document key ${this.inputKey} not found.`);
        }
        const { [this.inputKey]: doc, ...rest } = values;
        const currentDoc = doc;
        const currentDocs = await this.textSplitter.createDocuments([currentDoc]);
        const newInputs = { input_documents: currentDocs, ...rest };
        const result = await this.combineDocumentsChain.call(newInputs, runManager?.getChild());
        return result;
    }
    _chainType() {
        return "analyze_document_chain";
    }
    static async deserialize(data, values) {
        if (!("text_splitter" in values)) {
            throw new Error(`Need to pass in a text_splitter to deserialize AnalyzeDocumentChain.`);
        }
        const { text_splitter } = values;
        if (!data.combine_document_chain) {
            throw new Error(`Need to pass in a combine_document_chain to deserialize AnalyzeDocumentChain.`);
        }
        return new AnalyzeDocumentChain({
            combineDocumentsChain: await BaseChain.deserialize(data.combine_document_chain),
            textSplitter: text_splitter,
        });
    }
    serialize() {
        return {
            _type: this._chainType(),
            combine_document_chain: this.combineDocumentsChain.serialize(),
        };
    }
}
