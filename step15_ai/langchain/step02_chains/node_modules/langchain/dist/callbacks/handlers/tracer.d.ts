import { AgentAction, BaseChatMessage, ChainValues, LLMResult, RunInputs, RunOutputs } from "../../schema/index.js";
import { BaseCallbackHandler } from "../base.js";
export type RunType = "llm" | "chain" | "tool";
export type Extra = Record<string, any>;
export interface BaseRun {
    id: string;
    name: string;
    start_time: number;
    end_time: number;
    extra?: Extra;
    error?: string;
    execution_order: number;
    serialized: object;
    inputs: RunInputs;
    outputs?: RunOutputs;
    reference_example_id?: string;
    run_type: RunType;
}
export interface Run extends BaseRun {
    child_runs: this[];
    child_execution_order: number;
    parent_run_id?: string;
}
export interface AgentRun extends Run {
    actions: AgentAction[];
}
export declare abstract class BaseTracer extends BaseCallbackHandler {
    protected runMap: Map<string, Run>;
    constructor();
    copy(): this;
    protected abstract persistRun(run: Run): Promise<void>;
    protected _addChildRun(parentRun: Run, childRun: Run): void;
    protected _startTrace(run: Run): void;
    protected _endTrace(run: Run): Promise<void>;
    protected _getExecutionOrder(parentRunId: string | undefined): number;
    handleLLMStart(llm: {
        name: string;
    }, prompts: string[], runId: string, parentRunId?: string, extraParams?: Record<string, unknown>): Promise<void>;
    handleChatModelStart(llm: {
        name: string;
    }, messages: BaseChatMessage[][], runId: string, parentRunId?: string, extraParams?: Record<string, unknown>): Promise<void>;
    handleLLMEnd(output: LLMResult, runId: string): Promise<void>;
    handleLLMError(error: Error, runId: string): Promise<void>;
    handleChainStart(chain: {
        name: string;
    }, inputs: ChainValues, runId: string, parentRunId?: string): Promise<void>;
    handleChainEnd(outputs: ChainValues, runId: string): Promise<void>;
    handleChainError(error: Error, runId: string): Promise<void>;
    handleToolStart(tool: {
        name: string;
    }, input: string, runId: string, parentRunId?: string): Promise<void>;
    handleToolEnd(output: string, runId: string): Promise<void>;
    handleToolError(error: Error, runId: string): Promise<void>;
    handleAgentAction(action: AgentAction, runId: string): Promise<void>;
    onLLMStart?(run: Run): void | Promise<void>;
    onLLMEnd?(run: Run): void | Promise<void>;
    onLLMError?(run: Run): void | Promise<void>;
    onChainStart?(run: Run): void | Promise<void>;
    onChainEnd?(run: Run): void | Promise<void>;
    onChainError?(run: Run): void | Promise<void>;
    onToolStart?(run: Run): void | Promise<void>;
    onToolEnd?(run: Run): void | Promise<void>;
    onToolError?(run: Run): void | Promise<void>;
    onAgentAction?(run: Run): void | Promise<void>;
}
