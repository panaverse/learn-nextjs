import { BaseLanguageModel } from "../../base_language/index.js";
import { ChatPromptTemplate } from "../../prompts/chat.js";
import { AgentStep, BaseChatMessage } from "../../schema/index.js";
import { Tool } from "../../tools/base.js";
import { Optional } from "../../types/type-utils.js";
import { Agent, AgentArgs, OutputParserArgs } from "../agent.js";
import { AgentActionOutputParser, AgentInput } from "../types.js";
export interface ChatConversationalCreatePromptArgs {
    /** String to put after the list of tools. */
    systemMessage?: string;
    /** String to put before the list of tools. */
    humanMessage?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
    /** Output parser to use for formatting. */
    outputParser?: AgentActionOutputParser;
}
export type ChatConversationalAgentInput = Optional<AgentInput, "outputParser">;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export declare class ChatConversationalAgent extends Agent {
    constructor(input: ChatConversationalAgentInput);
    _agentType(): "chat-conversational-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    static validateTools(tools: Tool[]): void;
    constructScratchPad(steps: AgentStep[]): Promise<BaseChatMessage[]>;
    static getDefaultOutputParser(_fields?: OutputParserArgs): AgentActionOutputParser;
    /**
     * Create prompt in the style of the ChatConversationAgent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.systemMessage - String to put before the list of tools.
     * @param args.humanMessage - String to put after the list of tools.
     */
    static createPrompt(tools: Tool[], args?: ChatConversationalCreatePromptArgs): ChatPromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: ChatConversationalCreatePromptArgs & AgentArgs): ChatConversationalAgent;
}
