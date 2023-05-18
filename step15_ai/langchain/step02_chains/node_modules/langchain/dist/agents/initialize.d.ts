import { BaseLanguageModel } from "../base_language/index.js";
import { CallbackManager } from "../callbacks/manager.js";
import { Tool } from "../tools/base.js";
import { ChatAgent } from "./chat/index.js";
import { ChatConversationalAgent } from "./chat_convo/index.js";
import { AgentExecutor, AgentExecutorInput } from "./executor.js";
import { ZeroShotAgent } from "./mrkl/index.js";
type AgentType = "zero-shot-react-description" | "chat-zero-shot-react-description" | "chat-conversational-react-description";
/**
 * @deprecated use initializeAgentExecutorWithOptions instead
 */
export declare const initializeAgentExecutor: (tools: Tool[], llm: BaseLanguageModel, _agentType?: AgentType, _verbose?: boolean, _callbackManager?: CallbackManager) => Promise<AgentExecutor>;
/**
 * @interface
 */
export type InitializeAgentExecutorOptions = ({
    agentType: "zero-shot-react-description";
    agentArgs?: Parameters<typeof ZeroShotAgent.fromLLMAndTools>[2];
    memory?: never;
} & Omit<AgentExecutorInput, "agent" | "tools">) | ({
    agentType: "chat-zero-shot-react-description";
    agentArgs?: Parameters<typeof ChatAgent.fromLLMAndTools>[2];
    memory?: never;
} & Omit<AgentExecutorInput, "agent" | "tools">) | ({
    agentType: "chat-conversational-react-description";
    agentArgs?: Parameters<typeof ChatConversationalAgent.fromLLMAndTools>[2];
} & Omit<AgentExecutorInput, "agent" | "tools">);
/**
 * Initialize an agent executor with options
 * @param tools Array of tools to use in the agent
 * @param llm LLM or ChatModel to use in the agent
 * @param options Options for the agent, including agentType, agentArgs, and other options for AgentExecutor.fromAgentAndTools
 * @returns AgentExecutor
 */
export declare const initializeAgentExecutorWithOptions: (tools: Tool[], llm: BaseLanguageModel, options?: InitializeAgentExecutorOptions) => Promise<AgentExecutor>;
export {};
