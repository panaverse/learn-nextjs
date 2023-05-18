import { BaseChatMessage, BasePromptValue, LLMResult } from "../schema/index.js";
import { CallbackManager, Callbacks } from "../callbacks/manager.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export type SerializedLLM = {
    _model: string;
    _type: string;
} & Record<string, any>;
export interface BaseLangChainParams {
    verbose?: boolean;
    callbacks?: Callbacks;
}
/**
 * Base class for language models, chains, tools.
 */
export declare abstract class BaseLangChain implements BaseLangChainParams {
    /**
     * Whether to print out response text.
     */
    verbose: boolean;
    callbacks?: Callbacks;
    constructor(params: BaseLangChainParams);
}
/**
 * Base interface for language model parameters.
 * A subclass of {@link BaseLanguageModel} should have a constructor that
 * takes in a parameter that extends this interface.
 */
export interface BaseLanguageModelParams extends AsyncCallerParams, BaseLangChainParams {
    /**
     * @deprecated Use `callbacks` instead
     */
    callbackManager?: CallbackManager;
}
export interface BaseLanguageModelCallOptions {
    /**
     * Stop tokens to use for this call.
     * If not provided, the default stop tokens for the model will be used.
     */
    stop?: string[];
    /**
     * Timeout for this call in milliseconds.
     */
    timeout?: number;
    /**
     * Abort signal for this call.
     * If provided, the call will be aborted when the signal is aborted.
     */
    signal?: AbortSignal;
}
/**
 * Base class for language models.
 */
export declare abstract class BaseLanguageModel extends BaseLangChain implements BaseLanguageModelParams {
    CallOptions: BaseLanguageModelCallOptions;
    /**
     * Keys that the language model accepts as call options.
     */
    get callKeys(): string[];
    /**
     * The async caller should be used by subclasses to make any async calls,
     * which will thus benefit from the concurrency and retry logic.
     */
    caller: AsyncCaller;
    constructor(params: BaseLanguageModelParams);
    abstract generatePrompt(promptValues: BasePromptValue[], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<LLMResult>;
    abstract predict(text: string, options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<string>;
    abstract predictMessages(messages: BaseChatMessage[], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<BaseChatMessage>;
    abstract _modelType(): string;
    abstract _llmType(): string;
    private _encoding?;
    getNumTokens(text: string): Promise<number>;
    /**
     * Get the identifying parameters of the LLM.
     */
    _identifyingParams(): Record<string, any>;
    /**
     * Return a json-like object representing this LLM.
     */
    serialize(): SerializedLLM;
    /**
     * Load an LLM from a json-like object describing it.
     */
    static deserialize(data: SerializedLLM): Promise<BaseLanguageModel>;
}
