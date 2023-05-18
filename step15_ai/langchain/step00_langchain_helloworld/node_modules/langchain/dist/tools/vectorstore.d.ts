import { VectorStore } from "../vectorstores/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { VectorDBQAChain } from "../chains/vector_db_qa.js";
import { Tool } from "./base.js";
interface VectorStoreTool {
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
}
export declare class VectorStoreQATool extends Tool implements VectorStoreTool {
    vectorStore: VectorStore;
    llm: BaseLanguageModel;
    name: string;
    description: string;
    chain: VectorDBQAChain;
    constructor(name: string, description: string, fields: VectorStoreTool);
    static getDescription(name: string, description: string): string;
    /** @ignore */
    _call(input: string): Promise<string>;
}
export {};
