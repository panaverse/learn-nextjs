import { BaseChain } from "../../chains/base.js";
import { ListStepContainer, LLMPlanner, ChainStepExecutor, } from "./base.js";
import { AgentExecutor } from "../../agents/executor.js";
import { DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE, PLANNER_CHAT_PROMPT, } from "./prompt.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { PlanOutputParser } from "./outputParser.js";
import { ChatAgent } from "../../agents/chat/index.js";
export class PlanAndExecuteAgentExecutor extends BaseChain {
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
            value: new ListStepContainer()
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
        const plannerLlmChain = new LLMChain({
            llm,
            prompt: PLANNER_CHAT_PROMPT,
        });
        return new LLMPlanner(plannerLlmChain, new PlanOutputParser());
    }
    static getDefaultStepExecutor({ llm, tools, humanMessageTemplate = DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE, }) {
        const agent = ChatAgent.fromLLMAndTools(llm, tools, {
            humanMessageTemplate,
        });
        return new ChainStepExecutor(AgentExecutor.fromAgentAndTools({
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
