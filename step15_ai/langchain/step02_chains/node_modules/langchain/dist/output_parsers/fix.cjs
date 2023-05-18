"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFixingParser = void 0;
const output_parser_js_1 = require("../schema/output_parser.cjs");
const llm_chain_js_1 = require("../chains/llm_chain.cjs");
const prompts_js_1 = require("./prompts.cjs");
class OutputFixingParser extends output_parser_js_1.BaseOutputParser {
    static fromLLM(llm, parser, fields) {
        const prompt = fields?.prompt ?? prompts_js_1.NAIVE_FIX_PROMPT;
        const chain = new llm_chain_js_1.LLMChain({ llm, prompt });
        return new OutputFixingParser({ parser, retryChain: chain });
    }
    constructor({ parser, retryChain, }) {
        super();
        Object.defineProperty(this, "parser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "retryChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.parser = parser;
        this.retryChain = retryChain;
    }
    async parse(completion, callbacks) {
        try {
            return await this.parser.parse(completion, callbacks);
        }
        catch (e) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (e instanceof output_parser_js_1.OutputParserException) {
                const result = await this.retryChain.call({
                    instructions: this.parser.getFormatInstructions(),
                    completion,
                    error: e,
                }, callbacks);
                const newCompletion = result[this.retryChain.outputKey];
                return this.parser.parse(newCompletion);
            }
            throw e;
        }
    }
    getFormatInstructions() {
        return this.parser.getFormatInstructions();
    }
}
exports.OutputFixingParser = OutputFixingParser;
