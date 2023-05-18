"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseTracer = void 0;
const base_js_1 = require("../base.cjs");
class BaseTracer extends base_js_1.BaseCallbackHandler {
    constructor() {
        super();
        Object.defineProperty(this, "runMap", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    copy() {
        return this;
    }
    _addChildRun(parentRun, childRun) {
        parentRun.child_runs.push(childRun);
    }
    _startTrace(run) {
        if (run.parent_run_id !== undefined) {
            const parentRun = this.runMap.get(run.parent_run_id);
            if (parentRun) {
                this._addChildRun(parentRun, run);
            }
        }
        this.runMap.set(run.id, run);
    }
    async _endTrace(run) {
        const parentRun = run.parent_run_id !== undefined && this.runMap.get(run.parent_run_id);
        if (parentRun) {
            parentRun.child_execution_order = Math.max(parentRun.child_execution_order, run.child_execution_order);
        }
        else {
            await this.persistRun(run);
        }
        this.runMap.delete(run.id);
    }
    _getExecutionOrder(parentRunId) {
        const parentRun = parentRunId !== undefined && this.runMap.get(parentRunId);
        // If a run has no parent then execution order is 1
        if (!parentRun) {
            return 1;
        }
        return parentRun.child_execution_order + 1;
    }
    async handleLLMStart(llm, prompts, runId, parentRunId, extraParams) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const run = {
            id: runId,
            name: llm.name,
            parent_run_id: parentRunId,
            start_time: Date.now(),
            end_time: 0,
            serialized: llm,
            inputs: { prompts },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: extraParams,
        };
        this._startTrace(run);
        await this.onLLMStart?.(run);
    }
    async handleChatModelStart(llm, messages, runId, parentRunId, extraParams) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const run = {
            id: runId,
            name: llm.name,
            parent_run_id: parentRunId,
            start_time: Date.now(),
            end_time: 0,
            serialized: llm,
            inputs: { messages },
            execution_order,
            child_runs: [],
            child_execution_order: execution_order,
            run_type: "llm",
            extra: extraParams,
        };
        this._startTrace(run);
        await this.onLLMStart?.(run);
    }
    async handleLLMEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.outputs = output;
        await this.onLLMEnd?.(run);
        await this._endTrace(run);
    }
    async handleLLMError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "llm") {
            throw new Error("No LLM run to end.");
        }
        run.end_time = Date.now();
        run.error = error.message;
        await this.onLLMError?.(run);
        await this._endTrace(run);
    }
    async handleChainStart(chain, inputs, runId, parentRunId) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const run = {
            id: runId,
            name: chain.name,
            parent_run_id: parentRunId,
            start_time: Date.now(),
            end_time: 0,
            serialized: chain,
            inputs,
            execution_order,
            child_execution_order: execution_order,
            run_type: "chain",
            child_runs: [],
        };
        this._startTrace(run);
        await this.onChainStart?.(run);
    }
    async handleChainEnd(outputs, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.outputs = outputs;
        await this.onChainEnd?.(run);
        await this._endTrace(run);
    }
    async handleChainError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            throw new Error("No chain run to end.");
        }
        run.end_time = Date.now();
        run.error = error.message;
        await this.onChainError?.(run);
        await this._endTrace(run);
    }
    async handleToolStart(tool, input, runId, parentRunId) {
        const execution_order = this._getExecutionOrder(parentRunId);
        const run = {
            id: runId,
            name: tool.name,
            parent_run_id: parentRunId,
            start_time: Date.now(),
            end_time: 0,
            serialized: tool,
            inputs: { input },
            execution_order,
            child_execution_order: execution_order,
            run_type: "tool",
            child_runs: [],
        };
        this._startTrace(run);
        await this.onToolStart?.(run);
    }
    async handleToolEnd(output, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.outputs = { output };
        await this.onToolEnd?.(run);
        await this._endTrace(run);
    }
    async handleToolError(error, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "tool") {
            throw new Error("No tool run to end");
        }
        run.end_time = Date.now();
        run.error = error.message;
        await this.onToolError?.(run);
        await this._endTrace(run);
    }
    async handleAgentAction(action, runId) {
        const run = this.runMap.get(runId);
        if (!run || run?.run_type !== "chain") {
            return;
        }
        const agentRun = run;
        agentRun.actions = agentRun.actions || [];
        agentRun.actions.push(action);
        await this.onAgentAction?.(run);
    }
}
exports.BaseTracer = BaseTracer;
