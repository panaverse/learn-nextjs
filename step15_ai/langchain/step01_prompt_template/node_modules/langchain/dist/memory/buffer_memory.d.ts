import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
export interface BufferMemoryInput extends BaseChatMemoryInput {
    humanPrefix?: string;
    aiPrefix?: string;
    memoryKey?: string;
}
export declare class BufferMemory extends BaseChatMemory implements BufferMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    constructor(fields?: BufferMemoryInput);
    get memoryKeys(): string[];
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
