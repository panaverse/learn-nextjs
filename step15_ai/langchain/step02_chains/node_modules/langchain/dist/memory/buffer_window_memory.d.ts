import { InputValues, MemoryVariables } from "./base.js";
import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
export interface BufferWindowMemoryInput extends BaseChatMemoryInput {
    humanPrefix?: string;
    aiPrefix?: string;
    memoryKey?: string;
    k?: number;
}
export declare class BufferWindowMemory extends BaseChatMemory implements BufferWindowMemoryInput {
    humanPrefix: string;
    aiPrefix: string;
    memoryKey: string;
    k: number;
    constructor(fields?: BufferWindowMemoryInput);
    get memoryKeys(): string[];
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
}
