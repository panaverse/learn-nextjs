import { LLMChain } from "../../chains/llm_chain.js";
import { BaseChatModel } from "../../chat_models/base.js";
import { VectorStoreRetriever } from "../../vectorstores/base.js";
import { Tool } from "../../tools/base.js";
import { AutoGPTOutputParser } from "./output_parser.js";
import { BaseChatMessage } from "../../schema/index.js";
import { ObjectTool } from "./schema.js";
import { TokenTextSplitter } from "../../text_splitter.js";
export interface AutoGPTInput {
    aiName: string;
    aiRole: string;
    memory: VectorStoreRetriever;
    humanInTheLoop?: boolean;
    outputParser?: AutoGPTOutputParser;
    maxIterations?: number;
}
export declare class AutoGPT {
    aiName: string;
    memory: VectorStoreRetriever;
    fullMessageHistory: BaseChatMessage[];
    nextActionCount: number;
    chain: LLMChain;
    outputParser: AutoGPTOutputParser;
    tools: ObjectTool[];
    feedbackTool?: Tool;
    maxIterations: number;
    textSplitter: TokenTextSplitter;
    constructor({ aiName, memory, chain, outputParser, tools, feedbackTool, maxIterations, }: Omit<Required<AutoGPTInput>, "aiRole" | "humanInTheLoop"> & {
        chain: LLMChain;
        tools: ObjectTool[];
        feedbackTool?: Tool;
    });
    static fromLLMAndTools(llm: BaseChatModel, tools: ObjectTool[], { aiName, aiRole, memory, maxIterations, outputParser, }: AutoGPTInput): AutoGPT;
    run(goals: string[]): Promise<string | undefined>;
}
