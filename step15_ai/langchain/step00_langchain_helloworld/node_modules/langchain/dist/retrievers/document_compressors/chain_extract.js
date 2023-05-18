import { Document } from "../../document.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/index.js";
import { BaseOutputParser } from "../../schema/output_parser.js";
import { BaseDocumentCompressor } from "./index.js";
import { PROMPT_TEMPLATE } from "./chain_extract_prompt.js";
function defaultGetInput(query, doc) {
    return { question: query, context: doc.pageContent };
}
class NoOutputParser extends BaseOutputParser {
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
    const template = PROMPT_TEMPLATE(outputParser.noOutputStr);
    return new PromptTemplate({
        template,
        inputVariables: ["question", "context"],
        outputParser,
    });
}
export class LLMChainExtractor extends BaseDocumentCompressor {
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
                ? new Document({
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
        const llmChain = new LLMChain({ llm, prompt: _prompt });
        return new LLMChainExtractor({ llmChain, getInput: _getInput });
    }
}
