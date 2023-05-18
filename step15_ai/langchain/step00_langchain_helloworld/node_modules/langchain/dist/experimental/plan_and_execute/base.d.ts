import { BaseOutputParser } from "../../schema/output_parser.js";
import { BaseChain } from "../../chains/base.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { ChainValues } from "../../schema/index.js";
import { CallbackManager } from "../../callbacks/manager.js";
export type StepAction = {
    text: string;
};
export type StepResult = {
    response: string;
};
export type Step = {
    action: StepAction;
    result: StepResult;
};
export type Plan = {
    steps: StepAction[];
};
export declare abstract class BasePlanner {
    abstract plan(inputs: ChainValues, runManager?: CallbackManager): Promise<Plan>;
}
export declare abstract class BaseStepExecutor {
    abstract step(inputs: ChainValues, runManager?: CallbackManager): Promise<StepResult>;
}
export declare abstract class BaseStepContainer {
    abstract addStep(action: StepAction, result: StepResult): void;
    abstract getSteps(): Step[];
    abstract getFinalResponse(): string;
}
export declare class ListStepContainer extends BaseStepContainer {
    private steps;
    addStep(action: StepAction, result: StepResult): void;
    getSteps(): Step[];
    getFinalResponse(): string;
}
export declare class LLMPlanner extends BasePlanner {
    private llmChain;
    private outputParser;
    constructor(llmChain: LLMChain, outputParser: BaseOutputParser<Plan>);
    plan(inputs: ChainValues, runManager?: CallbackManager): Promise<Plan>;
}
export declare class ChainStepExecutor extends BaseStepExecutor {
    private chain;
    constructor(chain: BaseChain);
    step(inputs: ChainValues, runManager?: CallbackManager): Promise<StepResult>;
}
