import { BaseChain, ChainInputs } from "../../chains/base.js";
import { BasePlanner, BaseStepContainer, BaseStepExecutor, LLMPlanner, ChainStepExecutor } from "./base.js";
import { ChainValues } from "../../schema/index.js";
import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { Tool } from "../../tools/base.js";
import { SerializedLLMChain } from "../../chains/serde.js";
export interface PlanAndExecuteAgentExecutorInput extends ChainInputs {
    planner: BasePlanner;
    stepExecutor: BaseStepExecutor;
    stepContainer?: BaseStepContainer;
    inputKey?: string;
    outputKey?: string;
}
export declare class PlanAndExecuteAgentExecutor extends BaseChain {
    private planner;
    private stepExecutor;
    private stepContainer;
    private inputKey;
    private outputKey;
    constructor(input: PlanAndExecuteAgentExecutorInput);
    get inputKeys(): string[];
    get outputKeys(): string[];
    static getDefaultPlanner({ llm }: {
        llm: BaseLanguageModel;
    }): LLMPlanner;
    static getDefaultStepExecutor({ llm, tools, humanMessageTemplate, }: {
        llm: BaseLanguageModel;
        tools: Tool[];
        humanMessageTemplate?: string;
    }): ChainStepExecutor;
    static fromLLMAndTools({ llm, tools, humanMessageTemplate, }: {
        llm: BaseLanguageModel;
        tools: Tool[];
        humanMessageTemplate?: string;
    } & Omit<PlanAndExecuteAgentExecutorInput, "planner" | "stepExecutor">): PlanAndExecuteAgentExecutor;
    /** @ignore */
    _call(inputs: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "agent_executor";
    serialize(): SerializedLLMChain;
}
