"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMChainExtractor = void 0;
const document_js_1 = require("../../document.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const index_js_1 = require("../../prompts/index.cjs");
const output_parser_js_1 = require("../../schema/output_parser.cjs");
const index_js_2 = require("./index.cjs");
const chain_extract_prompt_js_1 = require("./chain_extract_prompt.cjs");
function defaultGetInput(query, doc) {
    return { question: query, context: doc.pageContent };
}
class NoOutputParser extends output_parser_js_1.BaseOutputParser {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "noOutputStr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "NO_OUTPUT"
        });
    }
    parse(text) {
        const cleanedText = text.trim();
        if (cleanedText === this.noOutputStr) {
            return Promise.resolve("");
        }
        return Promise.resolve(cleanedText);
    }
    getFormatInstructions() {
        throw new Error("Method not implemented.");
    }
}
function getDefaultChainPrompt() {
    const outputParser = new NoOutputParser();
    const template = (0, chain_extract_prompt_js_1.PROMPT_TEMPLATE)(outputParser.noOutputStr);
    return new index_js_1.PromptTemplate({
        template,
        inputVariables: ["question", "context"],
        outputParser,
    });
}
class LLMChainExtractor extends index_js_2.BaseDocumentCompressor {
    constructor({ llmChain, getInput }) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getInput", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: defaultGetInput
        });
        this.llmChain = llmChain;
        this.getInput = getInput;
    }
    async compressDocuments(documents, query) {
        const compressedDocs = await Promise.all(documents.map(async (doc) => {
            const input = this.getInput(query, doc);
            const output = await this.llmChain.predict(input);
            return output.length > 0
                ? new document_js_1.Document({
                    pageContent: output,
                    metadata: doc.metadata,
                })
                : undefined;
        }));
        return compressedDocs.filter((doc) => doc !== undefined);
    }
    static fromLLM(llm, prompt, getInput) {
        const _prompt = prompt || getDefaultChainPrompt();
        const _getInput = getInput || defaultGetInput;
        const llmChain = new llm_chain_js_1.LLMChain({ llm, prompt: _prompt });
        return new LLMChainExtractor({ llmChain, getInput: _getInput });
    }
}
exports.LLMChainExtractor = LLMChainExtractor;
