import { Agent } from "./agent.js";
import { Tool } from "../tools/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
export declare const loadAgent: (uri: string, llmAndTools?: {
    llm?: BaseLanguageModel;
    tools?: Tool[];
}) => Promise<Agent>;
