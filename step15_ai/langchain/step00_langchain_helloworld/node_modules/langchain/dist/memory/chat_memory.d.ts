import { BaseChatMessageHistory } from "../schema/index.js";
import { BaseMemory, InputValues, OutputValues } from "./base.js";
export interface BaseChatMemoryInput {
    chatHistory?: BaseChatMessageHistory;
    returnMessages?: boolean;
    inputKey?: string;
    outputKey?: string;
}
export declare abstract class BaseChatMemory extends BaseMemory {
    chatHistory: BaseChatMessageHistory;
    returnMessages: boolean;
    inputKey?: string;
    outputKey?: string;
    constructor(fields?: BaseChatMemoryInput);
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
    clear(): Promise<void>;
}
