"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanAndExecuteAgentExecutor = void 0;
const base_js_1 = require("../../chains/base.cjs");
const base_js_2 = require("./base.cjs");
const executor_js_1 = require("../../agents/executor.cjs");
const prompt_js_1 = require("./prompt.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const outputParser_js_1 = require("./outputParser.cjs");
const index_js_1 = require("../../agents/chat/index.cjs");
class PlanAndExecuteAgentExecutor extends base_js_1.BaseChain {
    constructor(input) {
        super(input);
        Object.defineProperty(this, "planner", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stepExecutor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stepContainer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new base_js_2.ListStepContainer()
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        this.planner = input.planner;
        this.stepExecutor = input.stepExecutor;
        this.stepContainer = input.stepContainer ?? this.stepContainer;
        this.inputKey = input.inputKey ?? this.inputKey;
        this.outputKey = input.outputKey ?? this.outputKey;
    }
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
    static getDefaultPlanner({ llm }) {
        const plannerLlmChain = new llm_chain_js_1.LLMChain({
            llm,
            prompt: prompt_js_1.PLANNER_CHAT_PROMPT,
        });
        return new base_js_2.LLMPlanner(plannerLlmChain, new outputParser_js_1.PlanOutputParser());
    }
    static getDefaultStepExecutor({ llm, tools, humanMessageTemplate = prompt_js_1.DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE, }) {
        const agent = index_js_1.ChatAgent.fromLLMAndTools(llm, tools, {
            humanMessageTemplate,
        });
        return new base_js_2.ChainStepExecutor(executor_js_1.AgentExecutor.fromAgentAndTools({
            agent,
            tools,
        }));
    }
    static fromLLMAndTools({ llm, tools, humanMessageTemplate, }) {
        const executor = new PlanAndExecuteAgentExecutor({
            planner: PlanAndExecuteAgentExecutor.getDefaultPlanner({ llm }),
            stepExecutor: PlanAndExecuteAgentExecutor.getDefaultStepExecutor({
                llm,
                tools,
                humanMessageTemplate,
            }),
        });
        return executor;
    }
    /** @ignore */
    async _call(inputs, runManager) {
        const plan = await this.planner.plan(inputs.input, runManager?.getChild());
        if (!plan.steps?.length) {
            throw new Error("Could not create and parse a plan to answer your question - please try again.");
        }
        plan.steps[plan.steps.length - 1].text += ` The original question was: ${inputs.input}.`;
        for (const step of plan.steps) {
            const newInputs = {
                ...inputs,
                previous_steps: JSON.stringify(this.stepContainer.getSteps()),
                current_step: step.text,
            };
            const response = await this.stepExecutor.step(newInputs, runManager?.getChild());
            this.stepContainer.addStep(step, response);
        }
        return { [this.outputKey]: this.stepContainer.getFinalResponse() };
    }
    _chainType() {
        return "agent_executor";
    }
    serialize() {
        throw new Error("Cannot serialize an AgentExecutor");
    }
}
exports.PlanAndExecuteAgentExecutor = PlanAndExecuteAgentExecutor;
