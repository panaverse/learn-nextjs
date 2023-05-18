import { Tool } from "../../../tools/base.js";
import { VectorStore } from "../../../vectorstores/base.js";
import { Toolkit } from "../base.js";
import { BaseLanguageModel } from "../../../base_language/index.js";
import { ZeroShotCreatePromptArgs } from "../../mrkl/index.js";
import { AgentExecutor } from "../../executor.js";
export interface VectorStoreInfo {
    vectorStore: VectorStore;
    name: string;
    description: string;
}
export declare class VectorStoreToolkit extends Toolkit {
    tools: Tool[];
    llm: BaseLanguageModel;
    constructor(vectorStoreInfo: VectorStoreInfo, llm: BaseLanguageModel);
}
export declare class VectorStoreRouterToolkit extends Toolkit {
    tools: Tool[];
    vectorStoreInfos: VectorStoreInfo[];
    llm: BaseLanguageModel;
    constructor(vectorStoreInfos: VectorStoreInfo[], llm: BaseLanguageModel);
}
export declare function createVectorStoreAgent(llm: BaseLanguageModel, toolkit: VectorStoreToolkit, args?: ZeroShotCreatePromptArgs): AgentExecutor;
export declare function createVectorStoreRouterAgent(llm: BaseLanguageModel, toolkit: VectorStoreRouterToolkit, args?: ZeroShotCreatePromptArgs): AgentExecutor;
