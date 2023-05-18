import { BaseOutputParser, OutputParserException, } from "../schema/output_parser.js";
import { LLMChain } from "../chains/llm_chain.js";
import { NAIVE_FIX_PROMPT } from "./prompts.js";
export class OutputFixingParser extends BaseOutputParser {
    static fromLLM(llm, parser, fields) {
        const prompt = fields?.prompt ?? NAIVE_FIX_PROMPT;
        const chain = new LLMChain({ llm, prompt });
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
            if (e instanceof OutputParserException) {
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
