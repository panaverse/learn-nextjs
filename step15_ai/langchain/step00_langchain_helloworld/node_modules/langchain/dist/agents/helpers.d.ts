import type { SerializedAgentT, AgentInput } from "./types.js";
import { Tool } from "../tools/base.js";
import { BaseLanguageModel } from "../base_language/index.js";
export declare const deserializeHelper: <T extends string, U extends Record<string, unknown>, V extends AgentInput, Z>(llm: BaseLanguageModel | undefined, tools: Tool[] | undefined, data: SerializedAgentT<T, U, V>, fromLLMAndTools: (llm: BaseLanguageModel, tools: Tool[], args: U) => Z, fromConstructor: (args: V) => Z) => Promise<Z>;
