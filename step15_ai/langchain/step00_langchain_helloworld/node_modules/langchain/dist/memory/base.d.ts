import { BaseChatMessage } from "../schema/index.js";
export type InputValues = Record<string, any>;
export type OutputValues = Record<string, any>;
export type MemoryVariables = Record<string, any>;
export declare abstract class BaseMemory {
    abstract get memoryKeys(): string[];
    abstract loadMemoryVariables(values: InputValues): Promise<MemoryVariables>;
    abstract saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
}
/**
 * This function is used by memory classes to select the input value
 * to use for the memory. If there is only one input value, it is used.
 * If there are multiple input values, the inputKey must be specified.
 */
export declare const getInputValue: (inputValues: InputValues, inputKey?: string) => any;
/**
 * This function is used by memory classes to get a string representation
 * of the chat message history, based on the message content and role.
 */
export declare function getBufferString(messages: BaseChatMessage[], humanPrefix?: string, aiPrefix?: string): string;
export declare function getPromptInputKey(inputs: Record<string, unknown>, memoryVariables: string[]): string;
