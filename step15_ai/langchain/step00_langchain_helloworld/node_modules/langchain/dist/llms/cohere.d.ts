import { LLM, BaseLLMParams } from "./base.js";
export interface CohereInput extends BaseLLMParams {
    /** Sampling temperature to use */
    temperature?: number;
    /**
     * Maximum number of tokens to generate in the completion.
     */
    maxTokens?: number;
    /** Model to use */
    model?: string;
    apiKey?: string;
}
export declare class Cohere extends LLM implements CohereInput {
    temperature: number;
    maxTokens: number;
    model: string;
    apiKey: string;
    constructor(fields?: CohereInput);
    _llmType(): string;
    /** @ignore */
    _call(prompt: string, options: this["ParsedCallOptions"]): Promise<string>;
    /** @ignore */
    static imports(): Promise<{
        cohere: typeof import("cohere-ai");
    }>;
}
