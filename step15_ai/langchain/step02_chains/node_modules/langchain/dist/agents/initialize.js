import { BufferMemory } from "../memory/buffer_memory.js";
import { ChatAgent } from "./chat/index.js";
import { ChatConversationalAgent } from "./chat_convo/index.js";
import { AgentExecutor } from "./executor.js";
import { ZeroShotAgent } from "./mrkl/index.js";
/**
 * @deprecated use initializeAgentExecutorWithOptions instead
 */
export const initializeAgentExecutor = async (tools, llm, _agentType, _verbose, _callbackManager) => {
    const agentType = _agentType ?? "zero-shot-react-description";
    const verbose = _verbose;
    const callbackManager = _callbackManager;
    switch (agentType) {
        case "zero-shot-react-description":
            return AgentExecutor.fromAgentAndTools({
                agent: ZeroShotAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
                verbose,
                callbackManager,
            });
        case "chat-zero-shot-react-description":
            return AgentExecutor.fromAgentAndTools({
                agent: ChatAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
                verbose,
                callbackManager,
            });
        case "chat-conversational-react-description":
            return AgentExecutor.fromAgentAndTools({
                agent: ChatConversationalAgent.fromLLMAndTools(llm, tools),
                tools,
                verbose,
                callbackManager,
            });
        default:
            throw new Error("Unknown agent type");
    }
};
/**
 * Initialize an agent executor with options
 * @param tools Array of tools to use in the agent
 * @param llm LLM or ChatModel to use in the agent
 * @param options Options for the agent, including agentType, agentArgs, and other options for AgentExecutor.fromAgentAndTools
 * @returns AgentExecutor
 */
export const initializeAgentExecutorWithOptions = async (tools, llm, options = {
    agentType: llm._modelType() === "base_chat_model"
        ? "chat-zero-shot-react-description"
        : "zero-shot-react-description",
}) => {
    switch (options.agentType) {
        case "zero-shot-react-description": {
            const { agentArgs, ...rest } = options;
            return AgentExecutor.fromAgentAndTools({
                agent: ZeroShotAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                ...rest,
            });
        }
        case "chat-zero-shot-react-description": {
            const { agentArgs, ...rest } = options;
            return AgentExecutor.fromAgentAndTools({
                agent: ChatAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                ...rest,
            });
        }
        case "chat-conversational-react-description": {
            const { agentArgs, memory, ...rest } = options;
            const executor = AgentExecutor.fromAgentAndTools({
                agent: ChatConversationalAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                memory: memory ??
                    new BufferMemory({
                        returnMessages: true,
                        memoryKey: "chat_history",
                        inputKey: "input",
                    }),
                ...rest,
            });
            return executor;
        }
        default: {
            throw new Error("Unknown agent type");
        }
    }
};
