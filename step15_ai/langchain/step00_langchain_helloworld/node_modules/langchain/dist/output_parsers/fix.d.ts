import { BaseOutputParser } from "../schema/output_parser.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { LLMChain } from "../chains/llm_chain.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { Callbacks } from "../callbacks/manager.js";
export declare class OutputFixingParser<T> extends BaseOutputParser<T> {
    parser: BaseOutputParser<T>;
    retryChain: LLMChain;
    static fromLLM<T>(llm: BaseLanguageModel, parser: BaseOutputParser<T>, fields?: {
        prompt?: BasePromptTemplate;
    }): OutputFixingParser<T>;
    constructor({ parser, retryChain, }: {
        parser: BaseOutputParser<T>;
        retryChain: LLMChain;
    });
    parse(completion: string, callbacks?: Callbacks): Promise<T>;
    getFormatInstructions(): string;
}
