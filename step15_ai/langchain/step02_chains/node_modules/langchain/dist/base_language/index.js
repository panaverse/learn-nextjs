import { AsyncCaller } from "../util/async_caller.js";
import { getModelNameForTiktoken } from "./count_tokens.js";
import { encodingForModel } from "../util/tiktoken.js";
const getVerbosity = () => false;
/**
 * Base class for language models, chains, tools.
 */
export class BaseLangChain {
    constructor(params) {
        /**
         * Whether to print out response text.
         */
        Object.defineProperty(this, "verbose", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "callbacks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.verbose = params.verbose ?? getVerbosity();
        this.callbacks = params.callbacks;
    }
}
/**
 * Base class for language models.
 */
export class BaseLanguageModel extends BaseLangChain {
    /**
     * Keys that the language model accepts as call options.
     */
    get callKeys() {
        return ["stop", "timeout", "signal"];
    }
    constructor(params) {
        super({
            verbose: params.verbose,
            callbacks: params.callbacks ?? params.callbackManager,
        });
        /**
         * The async caller should be used by subclasses to make any async calls,
         * which will thus benefit from the concurrency and retry logic.
         */
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_encoding", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new AsyncCaller(params ?? {});
    }
    async getNumTokens(text) {
        // fallback to approximate calculation if tiktoken is not available
        let numTokens = Math.ceil(text.length / 4);
        if (!this._encoding) {
            try {
                this._encoding = await encodingForModel("modelName" in this
                    ? getModelNameForTiktoken(this.modelName)
                    : "gpt2");
            }
            catch (error) {
                console.warn("Failed to calculate number of tokens, falling back to approximate count", error);
            }
        }
        if (this._encoding) {
            numTokens = this._encoding.encode(text).length;
        }
        return numTokens;
    }
    /**
     * Get the identifying parameters of the LLM.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _identifyingParams() {
        return {};
    }
    /**
     * Return a json-like object representing this LLM.
     */
    serialize() {
        return {
            ...this._identifyingParams(),
            _type: this._llmType(),
            _model: this._modelType(),
        };
    }
    /**
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_chat_model") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await import("../chat_models/openai.js")).ChatOpenAI,
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
}
