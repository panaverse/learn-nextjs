import { BaseMemory } from "../memory/base.js";
import { ChainValues } from "../schema/index.js";
import { CallbackManagerForChainRun, CallbackManager, Callbacks } from "../callbacks/manager.js";
import { SerializedBaseChain } from "./serde.js";
import { BaseLangChain, BaseLangChainParams } from "../base_language/index.js";
export type LoadValues = Record<string, any>;
export interface ChainInputs extends BaseLangChainParams {
    memory?: BaseMemory;
    /**
     * @deprecated Use `callbacks` instead
     */
    callbackManager?: CallbackManager;
}
/**
 * Base interface that all chains must implement.
 */
export declare abstract class BaseChain extends BaseLangChain implements ChainInputs {
    memory?: BaseMemory;
    constructor(fields?: BaseMemory | ChainInputs, 
    /** @deprecated */
    verbose?: boolean, 
    /** @deprecated */
    callbacks?: Callbacks);
    /**
     * Run the core logic of this chain and return the output
     */
    abstract _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    /**
     * Return the string type key uniquely identifying this class of chain.
     */
    abstract _chainType(): string;
    /**
     * Return a json-like object representing this chain.
     */
    serialize(): SerializedBaseChain;
    abstract get inputKeys(): string[];
    abstract get outputKeys(): string[];
    run(input: any, callbacks?: Callbacks): Promise<string>;
    /**
     * Run the core logic of this chain and add to output if desired.
     *
     * Wraps _call and handles memory.
     */
    call(values: ChainValues, callbacks?: Callbacks): Promise<ChainValues>;
    /**
     * Call the chain on all inputs in the list
     */
    apply(inputs: ChainValues[], callbacks?: Callbacks[]): Promise<ChainValues>;
    /**
     * Load a chain from a json-like object describing it.
     */
    static deserialize(data: SerializedBaseChain, values?: LoadValues): Promise<BaseChain>;
}
