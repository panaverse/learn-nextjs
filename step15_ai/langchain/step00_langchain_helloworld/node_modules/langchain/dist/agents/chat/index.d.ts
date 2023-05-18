import { BaseLanguageModel } from "../../base_language/index.js";
import { ChatPromptTemplate } from "../../prompts/chat.js";
import { AgentStep } from "../../schema/index.js";
import { Tool } from "../../tools/base.js";
import { Optional } from "../../types/type-utils.js";
import { Agent, AgentArgs, OutputParserArgs } from "../agent.js";
import { AgentInput } from "../types.js";
import { ChatAgentOutputParser } from "./outputParser.js";
export interface ChatCreatePromptArgs {
    /** String to put after the list of tools. */
    suffix?: string;
    /** String to put before the list of tools. */
    prefix?: string;
    /** String to use directly as the human message template. */
    humanMessageTemplate?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
}
export type ChatAgentInput = Optional<AgentInput, "outputParser">;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export declare class ChatAgent extends Agent {
    constructor(input: ChatAgentInput);
    _agentType(): "chat-zero-shot-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    _stop(): string[];
    static validateTools(tools: Tool[]): void;
    static getDefaultOutputParser(_fields?: OutputParserArgs): ChatAgentOutputParser;
    constructScratchPad(steps: AgentStep[]): Promise<string>;
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.humanMessageTemplate - String to use directly as the human message template
     */
    static createPrompt(tools: Tool[], args?: ChatCreatePromptArgs): ChatPromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: ChatCreatePromptArgs & AgentArgs): ChatAgent;
}
