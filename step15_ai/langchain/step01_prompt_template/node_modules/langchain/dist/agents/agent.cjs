"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Agent = exports.LLMSingleActionAgent = exports.BaseMultiActionAgent = exports.BaseSingleActionAgent = exports.BaseAgent = void 0;
class ParseError extends Error {
    constructor(msg, output) {
        super(msg);
        Object.defineProperty(this, "output", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.output = output;
    }
}
class BaseAgent {
    get returnValues() {
        return ["output"];
    }
    get allowedTools() {
        return undefined;
    }
    /**
     * Return the string type key uniquely identifying this class of agent.
     */
    _agentType() {
        throw new Error("Not implemented");
    }
    /**
     * Return response when agent has been stopped due to max iterations
     */
    returnStoppedResponse(earlyStoppingMethod, _steps, _inputs, _callbackManager) {
        if (earlyStoppingMethod === "force") {
            return Promise.resolve({
                returnValues: { output: "Agent stopped due to max iterations." },
                log: "",
            });
        }
        throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
    }
    /**
     * Prepare the agent for output, if needed
     */
    async prepareForOutput(_returnValues, _steps) {
        return {};
    }
}
exports.BaseAgent = BaseAgent;
class BaseSingleActionAgent extends BaseAgent {
    _agentActionType() {
        return "single";
    }
}
exports.BaseSingleActionAgent = BaseSingleActionAgent;
class BaseMultiActionAgent extends BaseAgent {
    _agentActionType() {
        return "multi";
    }
}
exports.BaseMultiActionAgent = BaseMultiActionAgent;
class LLMSingleActionAgent extends BaseSingleActionAgent {
    constructor(input) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.stop = input.stop;
        this.llmChain = input.llmChain;
        this.outputParser = input.outputParser;
    }
    get inputKeys() {
        return this.llmChain.inputKeys;
    }
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager.
     *
     * @returns Action specifying what tool to use.
     */
    async plan(steps, inputs, callbackManager) {
        const output = await this.llmChain.call({
            intermediate_steps: steps,
            stop: this.stop,
            ...inputs,
        }, callbackManager);
        return this.outputParser.parse(output[this.llmChain.outputKey], callbackManager);
    }
}
exports.LLMSingleActionAgent = LLMSingleActionAgent;
/**
 * Class responsible for calling a language model and deciding an action.
 *
 * @remarks This is driven by an LLMChain. The prompt in the LLMChain *must*
 * include a variable called "agent_scratchpad" where the agent can put its
 * intermediary work.
 */
class Agent extends BaseSingleActionAgent {
    get allowedTools() {
        return this._allowedTools;
    }
    get inputKeys() {
        return this.llmChain.inputKeys.filter((k) => k !== "agent_scratchpad");
    }
    constructor(input) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_allowedTools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: undefined
        });
        this.llmChain = input.llmChain;
        this._allowedTools = input.allowedTools;
        this.outputParser = input.outputParser;
    }
    /**
     * Get the default output parser for this agent.
     */
    static getDefaultOutputParser(_fields) {
        throw new Error("Not implemented");
    }
    /**
     * Create a prompt for this class
     *
     * @param _tools - List of tools the agent will have access to, used to format the prompt.
     * @param _fields - Additional fields used to format the prompt.
     *
     * @returns A PromptTemplate assembled from the given tools and fields.
     * */
    static createPrompt(_tools, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _fields) {
        throw new Error("Not implemented");
    }
    /** Construct an agent from an LLM and a list of tools */
    static fromLLMAndTools(_llm, _tools, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _args) {
        throw new Error("Not implemented");
    }
    /**
     * Validate that appropriate tools are passed in
     */
    static validateTools(_tools) { }
    _stop() {
        return [`\n${this.observationPrefix()}`];
    }
    /**
     * Name of tool to use to terminate the chain.
     */
    finishToolName() {
        return "Final Answer";
    }
    /**
     * Construct a scratchpad to let the agent continue its thought process
     */
    async constructScratchPad(steps) {
        return steps.reduce((thoughts, { action, observation }) => thoughts +
            [
                action.log,
                `${this.observationPrefix()}${observation}`,
                this.llmPrefix(),
            ].join("\n"), "");
    }
    async _plan(steps, inputs, suffix, callbackManager) {
        const thoughts = await this.constructScratchPad(steps);
        const newInputs = {
            ...inputs,
            agent_scratchpad: suffix ? `${thoughts}${suffix}` : thoughts,
        };
        if (this._stop().length !== 0) {
            newInputs.stop = this._stop();
        }
        const output = await this.llmChain.predict(newInputs, callbackManager);
        return this.outputParser.parse(output, callbackManager);
    }
    /**
     * Decide what to do given some input.
     *
     * @param steps - Steps the LLM has taken so far, along with observations from each.
     * @param inputs - User inputs.
     * @param callbackManager - Callback manager to use for this call.
     *
     * @returns Action specifying what tool to use.
     */
    plan(steps, inputs, callbackManager) {
        return this._plan(steps, inputs, undefined, callbackManager);
    }
    /**
     * Return response when agent has been stopped due to max iterations
     */
    async returnStoppedResponse(earlyStoppingMethod, steps, inputs, callbackManager) {
        if (earlyStoppingMethod === "force") {
            return {
                returnValues: { output: "Agent stopped due to max iterations." },
                log: "",
            };
        }
        if (earlyStoppingMethod === "generate") {
            try {
                const action = await this._plan(steps, inputs, "\n\nI now need to return a final answer based on the previous steps:", callbackManager);
                if ("returnValues" in action) {
                    return action;
                }
                return { returnValues: { output: action.log }, log: action.log };
            }
            catch (err) {
                // fine to use instanceof because we're in the same module
                // eslint-disable-next-line no-instanceof/no-instanceof
                if (!(err instanceof ParseError)) {
                    throw err;
                }
                return { returnValues: { output: err.output }, log: err.output };
            }
        }
        throw new Error(`Invalid stopping method: ${earlyStoppingMethod}`);
    }
    /**
     * Load an agent from a json-like object describing it.
     */
    static async deserialize(data) {
        switch (data._type) {
            case "zero-shot-react-description": {
                const { ZeroShotAgent } = await import("./mrkl/index.js");
                return ZeroShotAgent.deserialize(data);
            }
            default:
                throw new Error("Unknown agent type");
        }
    }
}
exports.Agent = Agent;
