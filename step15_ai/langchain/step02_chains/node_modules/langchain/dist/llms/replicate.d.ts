import { LLM, BaseLLMParams } from "./base.js";
export interface ReplicateInput {
    model: `${string}/${string}:${string}`;
    input?: {
        [key: string]: string | number | boolean;
    };
    apiKey?: string;
}
export declare class Replicate extends LLM implements ReplicateInput {
    model: ReplicateInput["model"];
    input: ReplicateInput["input"];
    apiKey: string;
    constructor(fields: ReplicateInput & BaseLLMParams);
    _llmType(): string;
    /** @ignore */
    _call(prompt: string, options: this["ParsedCallOptions"]): Promise<string>;
    /** @ignore */
    static imports(): Promise<{
        Replicate: typeof import("replicate").default;
    }>;
}
