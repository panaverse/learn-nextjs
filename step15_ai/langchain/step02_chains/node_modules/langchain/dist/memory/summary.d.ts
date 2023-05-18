import { BaseLanguageModel } from "../base_language/index.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { BaseChatMessage } from "../schema/index.js";
import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
export interface ConversationSummaryMemoryInput extends BaseChatMemoryInput {
    llm: BaseLanguageModel;
    memoryKey?: string;
    humanPrefix?: string;
    aiPrefix?: string;
    prompt?: BasePromptTemplate;
    summaryChatMessageClass?: new (content: string) => BaseChatMessage;
}
export declare class ConversationSummaryMemory extends BaseChatMemory {
    buffer: string;
    memoryKey: string;
    humanPrefix: string;
    aiPrefix: string;
    llm: BaseLanguageModel;
    prompt: BasePromptTemplate;
    summaryChatMessageClass: new (content: string) => BaseChatMessage;
    constructor(fields: ConversationSummaryMemoryInput);
    get memoryKeys(): string[];
    predictNewSummary(messages: BaseChatMessage[], existingSummary: string): Promise<string>;
    loadMemoryVariables(_: InputValues): Promise<MemoryVariables>;
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
    clear(): Promise<void>;
}
