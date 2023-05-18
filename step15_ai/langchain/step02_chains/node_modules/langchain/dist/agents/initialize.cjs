"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAgentExecutorWithOptions = exports.initializeAgentExecutor = void 0;
const buffer_memory_js_1 = require("../memory/buffer_memory.cjs");
const index_js_1 = require("./chat/index.cjs");
const index_js_2 = require("./chat_convo/index.cjs");
const executor_js_1 = require("./executor.cjs");
const index_js_3 = require("./mrkl/index.cjs");
/**
 * @deprecated use initializeAgentExecutorWithOptions instead
 */
const initializeAgentExecutor = async (tools, llm, _agentType, _verbose, _callbackManager) => {
    const agentType = _agentType ?? "zero-shot-react-description";
    const verbose = _verbose;
    const callbackManager = _callbackManager;
    switch (agentType) {
        case "zero-shot-react-description":
            return executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_3.ZeroShotAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
                verbose,
                callbackManager,
            });
        case "chat-zero-shot-react-description":
            return executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_1.ChatAgent.fromLLMAndTools(llm, tools),
                tools,
                returnIntermediateSteps: true,
                verbose,
                callbackManager,
            });
        case "chat-conversational-react-description":
            return executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_2.ChatConversationalAgent.fromLLMAndTools(llm, tools),
                tools,
                verbose,
                callbackManager,
            });
        default:
            throw new Error("Unknown agent type");
    }
};
exports.initializeAgentExecutor = initializeAgentExecutor;
/**
 * Initialize an agent executor with options
 * @param tools Array of tools to use in the agent
 * @param llm LLM or ChatModel to use in the agent
 * @param options Options for the agent, including agentType, agentArgs, and other options for AgentExecutor.fromAgentAndTools
 * @returns AgentExecutor
 */
const initializeAgentExecutorWithOptions = async (tools, llm, options = {
    agentType: llm._modelType() === "base_chat_model"
        ? "chat-zero-shot-react-description"
        : "zero-shot-react-description",
}) => {
    switch (options.agentType) {
        case "zero-shot-react-description": {
            const { agentArgs, ...rest } = options;
            return executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_3.ZeroShotAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                ...rest,
            });
        }
        case "chat-zero-shot-react-description": {
            const { agentArgs, ...rest } = options;
            return executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_1.ChatAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                ...rest,
            });
        }
        case "chat-conversational-react-description": {
            const { agentArgs, memory, ...rest } = options;
            const executor = executor_js_1.AgentExecutor.fromAgentAndTools({
                agent: index_js_2.ChatConversationalAgent.fromLLMAndTools(llm, tools, agentArgs),
                tools,
                memory: memory ??
                    new buffer_memory_js_1.BufferMemory({
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
exports.initializeAgentExecutorWithOptions = initializeAgentExecutorWithOptions;
