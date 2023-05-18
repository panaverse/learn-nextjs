import { BaseLanguageModel } from "../base_language/index.js";
import { CallbackManager, Callbacks } from "../callbacks/manager.js";
import { LLMChain } from "../chains/llm_chain.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { AgentAction, AgentFinish, AgentStep, BaseChatMessage, ChainValues } from "../schema/index.js";
import { Tool } from "../tools/base.js";
import { AgentActionOutputParser, AgentInput, SerializedAgent, StoppingMethod } from "./types.js";
export type OutputParserArgs = Record<string, any>;
export declare abstract class BaseAgent {
    abstract get inputKeys(): string[];
    get returnValues(): string[];
    get allowedTools(): string[] | undefined;
    /**
     * Return the string type key uniquely identifying this class of agent.
     */
    _agentType(): string;
    /**
     * Return the string type key uniquely identifying multi or single action agents.
     */
    abstract _agentActionType(): string;
    /**
     * Return response when agent has been stopped due to max iterations
     */
    returnStoppedResponse(earlyStoppingMethod: StoppingMethod, _steps: AgentStep[], _inputs: ChainValues, _callbackManager?: CallbackManager): Promise<AgentFinish>;
    /**
     * Prepare the agent for output, if needed
     */
    prepareForOutput(_returnValues: AgentFinish["returnValues"], _steps: AgentStep[]): Promise<AgentFinish["returnValues"]>;
}
export declare abstract class BaseSingleActionAgent extends BaseAgent {
    _agentActionType(): string;
    /**
     * Decide what to do, given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager.
     *
     * @returns Action specifying what tool to use.
     */
    abstract plan(steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction | AgentFinish>;
}
export declare abstract class BaseMultiActionAgent extends BaseAgent {
    _agentActionType(): string;
    /**
     * Decide what to do, given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager.
     *
     * @returns Actions specifying what tools to use.
     */
    abstract plan(steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction[] | AgentFinish>;
}
export interface LLMSingleActionAgentInput {
    llmChain: LLMChain;
    outputParser: AgentActionOutputParser;
    stop?: string[];
}
export declare class LLMSingleActionAgent extends BaseSingleActionAgent {
    llmChain: LLMChain;
    outputParser: AgentActionOutputParser;
    stop?: string[];
    constructor(input: LLMSingleActionAgentInput);
    get inputKeys(): string[];
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager.
     *
     * @returns Action specifying what tool to use.
     */
    plan(steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction | AgentFinish>;
}
export interface AgentArgs {
    outputParser?: AgentActionOutputParser;
    callbacks?: Callbacks;
    /**
     * @deprecated Use `callbacks` instead.
     */
    callbackManager?: CallbackManager;
}
/**
 * Class responsible for calling a language model and deciding an action.
 *
 * @remarks This is driven by an LLMChain. The prompt in the LLMChain *must*
 * include a variable called "agent_scratchpad" where the agent can put its
 * intermediary work.
 */
export declare abstract class Agent extends BaseSingleActionAgent {
    llmChain: LLMChain;
    outputParser: AgentActionOutputParser;
    private _allowedTools?;
    get allowedTools(): string[] | undefined;
    get inputKeys(): string[];
    constructor(input: AgentInput);
    /**
     * Prefix to append the observation with.
     */
    abstract observationPrefix(): string;
    /**
     * Prefix to append the LLM call with.
     */
    abstract llmPrefix(): string;
    /**
     * Return the string type key uniquely identifying this class of agent.
     */
    abstract _agentType(): string;
    /**
     * Get the default output parser for this agent.
     */
    static getDefaultOutputParser(_fields?: OutputParserArgs): AgentActionOutputParser;
    /**
     * Create a prompt for this class
     *
     * @param _tools - List of tools the agent will have access to, used to format the prompt.
     * @param _fields - Additional fields used to format the prompt.
     *
     * @returns A PromptTemplate assembled from the given tools and fields.
     * */
    static createPrompt(_tools: Tool[], _fields?: Record<string, any>): BasePromptTemplate;
    /** Construct an agent from an LLM and a list of tools */
    static fromLLMAndTools(_llm: BaseLanguageModel, _tools: Tool[], _args?: AgentArgs): Agent;
    /**
     * Validate that appropriate tools are passed in
     */
    static validateTools(_tools: Tool[]): void;
    _stop(): string[];
    /**
     * Name of tool to use to terminate the chain.
     */
    finishToolName(): string;
    /**
     * Construct a scratchpad to let the agent continue its thought process
     */
    constructScratchPad(steps: AgentStep[]): Promise<string | BaseChatMessage[]>;
    private _plan;
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager to use for this call.
     *
     * @returns Action specifying what tool to use.
     */
    plan(steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentAction | AgentFinish>;
    /**
     * Return response when agent has been stopped due to max iterations
     */
    returnStoppedResponse(earlyStoppingMethod: StoppingMethod, steps: AgentStep[], inputs: ChainValues, callbackManager?: CallbackManager): Promise<AgentFinish>;
    /**
     * Load an agent from a json-like object describing it.
     */
    static deserialize(data: SerializedAgent & {
        llm?: BaseLanguageModel;
        tools?: Tool[];
    }): Promise<Agent>;
}
