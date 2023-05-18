"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseChain = void 0;
const index_js_1 = require("../schema/index.cjs");
const manager_js_1 = require("../callbacks/manager.cjs");
const index_js_2 = require("../base_language/index.cjs");
/**
 * Base interface that all chains must implement.
 */
class BaseChain extends index_js_2.BaseLangChain {
    constructor(fields, 
    /** @deprecated */
    verbose, 
    /** @deprecated */
    callbacks) {
        if (arguments.length === 1 &&
            typeof fields === "object" &&
            !("saveContext" in fields)) {
            // fields is not a BaseMemory
            const { memory, callbackManager, ...rest } = fields;
            super({ ...rest, callbacks: callbackManager ?? rest.callbacks });
            this.memory = memory;
        }
        else {
            // fields is a BaseMemory
            super({ verbose, callbacks });
            this.memory = fields;
        }
    }
    /**
     * Return a json-like object representing this chain.
     */
    serialize() {
        throw new Error("Method not implemented.");
    }
    async run(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input, callbacks) {
        const isKeylessInput = this.inputKeys.length <= 1;
        if (!isKeylessInput) {
            throw new Error(`Chain ${this._chainType()} expects multiple inputs, cannot use 'run' `);
        }
        const values = this.inputKeys.length ? { [this.inputKeys[0]]: input } : {};
        const returnValues = await this.call(values, callbacks);
        const keys = Object.keys(returnValues);
        if (keys.length === 1) {
            return returnValues[keys[0]];
        }
        throw new Error("return values have multiple keys, `run` only supported when one key currently");
    }
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    async call(values, callbacks) {
        const fullValues = { ...values };
        if (!(this.memory == null)) {
            const newValues = await this.memory.loadMemoryVariables(values);
            for (const [key, value] of Object.entries(newValues)) {
                fullValues[key] = value;
            }
        }
        const callbackManager_ = await manager_js_1.CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleChainStart({ name: this._chainType() }, fullValues);
        let outputValues;
        try {
            outputValues = await this._call(fullValues, runManager);
        }
        catch (e) {
            await runManager?.handleChainError(e);
            throw e;
        }
        if (!(this.memory == null)) {
            await this.memory.saveContext(values, outputValues);
        }
        await runManager?.handleChainEnd(outputValues);
        // add the runManager's currentRunId to the outputValues
        Object.defineProperty(outputValues, index_js_1.RUN_KEY, {
            value: runManager ? { runId: runManager?.runId } : undefined,
            configurable: true,
        });
        return outputValues;
    }
    /**
     * Call the chain on all inputs in the list
     */
    async apply(inputs, callbacks) {
        return Promise.all(inputs.map(async (i, idx) => this.call(i, callbacks?.[idx])));
    }
    /**
     * Load a chain from a json-like object describing it.
     */
    static async deserialize(data, values = {}) {
        switch (data._type) {
            case "llm_chain": {
                const { LLMChain } = await import("./llm_chain.js");
                return LLMChain.deserialize(data);
            }
            case "sequential_chain": {
                const { SequentialChain } = await import("./sequential_chain.js");
                return SequentialChain.deserialize(data);
            }
            case "simple_sequential_chain": {
                const { SimpleSequentialChain } = await import("./sequential_chain.js");
                return SimpleSequentialChain.deserialize(data);
            }
            case "stuff_documents_chain": {
                const { StuffDocumentsChain } = await import("./combine_docs_chain.js");
                return StuffDocumentsChain.deserialize(data);
            }
            case "map_reduce_documents_chain": {
                const { MapReduceDocumentsChain } = await import("./combine_docs_chain.js");
                return MapReduceDocumentsChain.deserialize(data);
            }
            case "refine_documents_chain": {
                const { RefineDocumentsChain } = await import("./combine_docs_chain.js");
                return RefineDocumentsChain.deserialize(data);
            }
            case "vector_db_qa": {
                const { VectorDBQAChain } = await import("./vector_db_qa.js");
                return VectorDBQAChain.deserialize(data, values);
            }
            default:
                throw new Error(`Invalid prompt type in config: ${data._type}`);
        }
    }
}
exports.BaseChain = BaseChain;
