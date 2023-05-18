import { BaseChain, ChainInputs } from "../chains/base.js";
import { BaseMultiActionAgent, BaseSingleActionAgent } from "./agent.js";
import { Tool } from "../tools/base.js";
import { StoppingMethod } from "./types.js";
import { SerializedLLMChain } from "../chains/serde.js";
import { ChainValues } from "../schema/index.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export interface AgentExecutorInput extends ChainInputs {
    agent: BaseSingleActionAgent | BaseMultiActionAgent;
    tools: Tool[];
    returnIntermediateSteps?: boolean;
    maxIterations?: number;
    earlyStoppingMethod?: StoppingMethod;
}
/**
 * A chain managing an agent using tools.
 * @augments BaseChain
 */
export declare class AgentExecutor extends BaseChain {
    agent: BaseSingleActionAgent | BaseMultiActionAgent;
    tools: Tool[];
    returnIntermediateSteps: boolean;
    maxIterations?: number;
    earlyStoppingMethod: StoppingMethod;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(input: AgentExecutorInput);
    /** Create from agent and a list of tools. */
    static fromAgentAndTools(fields: AgentExecutorInput): AgentExecutor;
    private shouldContinue;
    /** @ignore */
    _call(inputs: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "agent_executor";
    serialize(): SerializedLLMChain;
}
