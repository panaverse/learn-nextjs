import { BaseChain } from "../chains/base.js";
/**
 * A chain managing an agent using tools.
 * @augments BaseChain
 */
export class AgentExecutor extends BaseChain {
    get inputKeys() {
        return this.agent.inputKeys;
    }
    get outputKeys() {
        return this.agent.returnValues;
    }
    constructor(input) {
        super(input.memory, input.verbose, input.callbacks ?? input.callbackManager);
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnIntermediateSteps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 15
        });
        Object.defineProperty(this, "earlyStoppingMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "force"
        });
        this.agent = input.agent;
        this.tools = input.tools;
        if (this.agent._agentActionType() === "multi") {
            for (const tool of this.tools) {
                if (tool.returnDirect) {
                    throw new Error(`Tool with return direct ${tool.name} not supported for multi-action agent.`);
                }
            }
        }
        this.returnIntermediateSteps =
            input.returnIntermediateSteps ?? this.returnIntermediateSteps;
        this.maxIterations = input.maxIterations ?? this.maxIterations;
        this.earlyStoppingMethod =
            input.earlyStoppingMethod ?? this.earlyStoppingMethod;
    }
    /** Create from agent and a list of tools. */
    static fromAgentAndTools(fields) {
        return new AgentExecutor(fields);
    }
    shouldContinue(iterations) {
        return this.maxIterations === undefined || iterations < this.maxIterations;
    }
    /** @ignore */
    async _call(inputs, runManager) {
        const toolsByName = Object.fromEntries(this.tools.map((t) => [t.name.toLowerCase(), t]));
        const steps = [];
        let iterations = 0;
        const getOutput = async (finishStep) => {
            const { returnValues } = finishStep;
            const additional = await this.agent.prepareForOutput(returnValues, steps);
            if (this.returnIntermediateSteps) {
                return { ...returnValues, intermediateSteps: steps, ...additional };
            }
            await runManager?.handleAgentEnd(finishStep);
            return { ...returnValues, ...additional };
        };
        while (this.shouldContinue(iterations)) {
            const output = await this.agent.plan(steps, inputs, runManager?.getChild());
            // Check if the agent has finished
            if ("returnValues" in output) {
                return getOutput(output);
            }
            let actions;
            if (Array.isArray(output)) {
                actions = output;
            }
            else {
                actions = [output];
            }
            const newSteps = await Promise.all(actions.map(async (action) => {
                await runManager?.handleAgentAction(action);
                const tool = toolsByName[action.tool?.toLowerCase()];
                const observation = tool
                    ? await tool.call(action.toolInput, runManager?.getChild())
                    : `${action.tool} is not a valid tool, try another one.`;
                return { action, observation };
            }));
            steps.push(...newSteps);
            const lastStep = steps[steps.length - 1];
            const lastTool = toolsByName[lastStep.action.tool?.toLowerCase()];
            if (lastTool?.returnDirect) {
                return getOutput({
                    returnValues: { [this.agent.returnValues[0]]: lastStep.observation },
                    log: "",
                });
            }
            iterations += 1;
        }
        const finish = await this.agent.returnStoppedResponse(this.earlyStoppingMethod, steps, inputs);
        return getOutput(finish);
    }
    _chainType() {
        return "agent_executor";
    }
    serialize() {
        throw new Error("Cannot serialize an AgentExecutor");
    }
}
