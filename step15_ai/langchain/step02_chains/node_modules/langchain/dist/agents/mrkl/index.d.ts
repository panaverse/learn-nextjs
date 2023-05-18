import { BaseLanguageModel } from "../../base_language/index.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { Tool } from "../../tools/base.js";
import { Optional } from "../../types/type-utils.js";
import { Agent, AgentArgs, OutputParserArgs } from "../agent.js";
import { AgentInput, SerializedZeroShotAgent } from "../types.js";
import { ZeroShotAgentOutputParser } from "./outputParser.js";
export interface ZeroShotCreatePromptArgs {
    /** String to put after the list of tools. */
    suffix?: string;
    /** String to put before the list of tools. */
    prefix?: string;
    /** List of input variables the final prompt will expect. */
    inputVariables?: string[];
}
export type ZeroShotAgentInput = Optional<AgentInput, "outputParser">;
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
export declare class ZeroShotAgent extends Agent {
    constructor(input: ZeroShotAgentInput);
    _agentType(): "zero-shot-react-description";
    observationPrefix(): string;
    llmPrefix(): string;
    static getDefaultOutputParser(fields?: OutputParserArgs): ZeroShotAgentOutputParser;
    static validateTools(tools: Tool[]): void;
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.inputVariables - List of input variables the final prompt will expect.
     */
    static createPrompt(tools: Tool[], args?: ZeroShotCreatePromptArgs): PromptTemplate;
    static fromLLMAndTools(llm: BaseLanguageModel, tools: Tool[], args?: ZeroShotCreatePromptArgs & AgentArgs): ZeroShotAgent;
    static deserialize(data: SerializedZeroShotAgent & {
        llm?: BaseLanguageModel;
        tools?: Tool[];
    }): Promise<ZeroShotAgent>;
}
