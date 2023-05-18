import { VectorStoreRetriever } from "../vectorstores/base.js";
import { BaseMemory, InputValues, MemoryVariables, OutputValues } from "./base.js";
export interface VectorStoreRetrieverMemoryParams {
    vectorStoreRetriever: VectorStoreRetriever;
    inputKey?: string;
    outputKey?: string;
    memoryKey?: string;
    returnDocs?: boolean;
}
export declare class VectorStoreRetrieverMemory extends BaseMemory implements VectorStoreRetrieverMemoryParams {
    vectorStoreRetriever: VectorStoreRetriever;
    inputKey?: string;
    memoryKey: string;
    returnDocs: boolean;
    constructor(fields: VectorStoreRetrieverMemoryParams);
    get memoryKeys(): string[];
    loadMemoryVariables(values: InputValues): Promise<MemoryVariables>;
    saveContext(inputValues: InputValues, outputValues: OutputValues): Promise<void>;
}
