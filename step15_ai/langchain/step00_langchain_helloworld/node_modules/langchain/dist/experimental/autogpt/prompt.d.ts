import { BaseChatPromptTemplate } from "../../prompts/chat.js";
import { BaseChatMessage, PartialValues } from "../../schema/index.js";
import { VectorStoreRetriever } from "../../vectorstores/base.js";
import { ObjectTool } from "./schema.js";
import { BasePromptTemplate } from "../../index.js";
import { SerializedBasePromptTemplate } from "../../prompts/serde.js";
export interface AutoGPTPromptInput {
    aiName: string;
    aiRole: string;
    tools: ObjectTool[];
    tokenCounter: (text: string) => Promise<number>;
    sendTokenLimit?: number;
}
export declare class AutoGPTPrompt extends BaseChatPromptTemplate implements AutoGPTPromptInput {
    aiName: string;
    aiRole: string;
    tools: ObjectTool[];
    tokenCounter: (text: string) => Promise<number>;
    sendTokenLimit: number;
    constructor(fields: AutoGPTPromptInput);
    _getPromptType(): "autogpt";
    constructFullPrompt(goals: string[]): string;
    formatMessages({ goals, memory, messages: previousMessages, user_input, }: {
        goals: string[];
        memory: VectorStoreRetriever;
        messages: BaseChatMessage[];
        user_input: string;
    }): Promise<BaseChatMessage[]>;
    partial(_values: PartialValues): Promise<BasePromptTemplate>;
    serialize(): SerializedBasePromptTemplate;
}
