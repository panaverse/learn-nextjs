import { BaseLanguageModel } from "../base_language/index.js";
import { BaseEntityStore } from "../schema/index.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
import { InputValues, MemoryVariables, OutputValues } from "./base.js";
import { PromptTemplate } from "../prompts/prompt.js";
export interface EntityMemoryInput extends BaseChatMemoryInput {
    llm: BaseLanguageModel;
    humanPrefix?: string;
    aiPrefix?: string;
    entityExtractionPrompt?: PromptTemplate;
    entitySummarizationPrompt?: PromptTemplate;
    entityCache?: string[];
    k?: number;
    chatHistoryKey?: string;
    entitiesKey?: string;
    entityStore?: BaseEntityStore;
}
export declare class EntityMemory extends BaseChatMemory implements EntityMemoryInput {
    private entityExtractionChain;
    private entitySummarizationChain;
    entityStore: BaseEntityStore;
    entityCache: string[];
    k: number;
    chatHistoryKey: string;
    llm: BaseLanguageModel;
    entitiesKey: string;
    humanPrefix?: string;
    aiPrefix?: string;
    constructor(fields: EntityMemoryInput);
    get memoryKeys(): string[];
    get memoryVariables(): string[];
    loadMemoryVariables(inputs: InputValues): Promise<MemoryVariables>;
    saveContext(inputs: InputValues, outputs: OutputValues): Promise<void>;
    clear(): Promise<void>;
}
