import { BaseChatMemory, BaseChatMemoryInput } from "./chat_memory.js";
import { InputValues, OutputValues, MemoryVariables } from "./base.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export interface MotorheadMemoryMessage {
    role: string;
    content: string;
}
/**
 * @interface
 */
export type MotorheadMemoryInput = BaseChatMemoryInput & AsyncCallerParams & {
    sessionId: string;
    motorheadURL?: string;
    memoryKey?: string;
    timeout?: number;
};
export declare class MotorheadMemory extends BaseChatMemory {
    motorheadURL: string;
    timeout: number;
    memoryKey: string;
    sessionId: string;
    context?: string;
    caller: AsyncCaller;
    constructor(fields: MotorheadMemoryInput);
    get memoryKeys(): string[];
    init(): Promise<void>;
    loadMemoryVariables(_values: InputValues): Promise<MemoryVariables>;
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
}
