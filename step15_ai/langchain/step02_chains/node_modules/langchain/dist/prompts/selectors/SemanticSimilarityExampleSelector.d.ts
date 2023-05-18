import { Embeddings } from "../../embeddings/base.js";
import { VectorStore } from "../../vectorstores/base.js";
import { Example } from "../../schema/index.js";
import type { BaseExampleSelector } from "../base.js";
export interface SemanticSimilarityExampleSelectorInput {
    vectorStore: VectorStore;
    k?: number;
    exampleKeys?: string[];
    inputKeys?: string[];
}
export declare class SemanticSimilarityExampleSelector implements BaseExampleSelector {
    vectorStore: VectorStore;
    k: number;
    exampleKeys?: string[];
    inputKeys?: string[];
    constructor(data: SemanticSimilarityExampleSelectorInput);
    addExample(example: Example): Promise<void>;
    selectExamples<T>(inputVariables: Record<string, T>): Promise<Example[]>;
    static fromExamples<C extends typeof VectorStore>(examples: Record<string, string>[], embeddings: Embeddings, vectorStoreCls: C, options?: {
        k?: number;
        inputKeys?: string[];
    } & Parameters<C["fromTexts"]>[3]): Promise<SemanticSimilarityExampleSelector>;
}
