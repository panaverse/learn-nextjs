import { InMemoryCache } from "../cache/index.js";
import { AIChatMessage, RUN_KEY, } from "../schema/index.js";
import { BaseLanguageModel, } from "../base_language/index.js";
import { CallbackManager, } from "../callbacks/manager.js";
import { getBufferString } from "../memory/base.js";
/**
 * LLM Wrapper. Provides an {@link call} (an {@link generate}) function that takes in a prompt (or prompts) and returns a string.
 */
export class BaseLLM extends BaseLanguageModel {
    constructor({ cache, concurrency, ...rest }) {
        super(concurrency ? { maxConcurrency: concurrency, ...rest } : rest);
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        if (typeof cache === "object") {
            this.cache = cache;
        }
        else if (cache) {
            this.cache = InMemoryCache.global();
        }
        else {
            this.cache = undefined;
        }
    }
    async generatePrompt(promptValues, options, callbacks) {
        const prompts = promptValues.map((promptValue) => promptValue.toString());
        return this.generate(prompts, options, callbacks);
    }
    /**
     * Get the parameters used to invoke the model
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams() {
        return {};
    }
    /** @ignore */
    async _generateUncached(prompts, options, callbacks) {
        const callbackManager_ = await CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
        const invocationParams = { invocation_params: this?.invocationParams() };
        const runManager = await callbackManager_?.handleLLMStart({ name: this._llmType() }, prompts, undefined, undefined, invocationParams);
        let output;
        try {
            output = await this._generate(prompts, options, runManager);
        }
        catch (err) {
            await runManager?.handleLLMError(err);
            throw err;
        }
        await runManager?.handleLLMEnd(output);
        // This defines RUN_KEY as a non-enumerable property on the output object
        // so that it is not serialized when the output is stringified, and so that
        // it isnt included when listing the keys of the output object.
        Object.defineProperty(output, RUN_KEY, {
            value: runManager ? { runId: runManager?.runId } : undefined,
            configurable: true,
        });
        return output;
    }
    /**
     * Run the LLM on the given propmts an input, handling caching.
     */
    async generate(prompts, options, callbacks) {
        if (!Array.isArray(prompts)) {
            throw new Error("Argument 'prompts' is expected to be a string[]");
        }
        let parsedOptions;
        if (Array.isArray(options)) {
            parsedOptions = { stop: options };
        }
        else if (options?.timeout && !options.signal) {
            parsedOptions = {
                ...options,
                signal: AbortSignal.timeout(options.timeout),
            };
        }
        else {
            parsedOptions = options ?? {};
        }
        if (!this.cache) {
            return this._generateUncached(prompts, parsedOptions, callbacks);
        }
        const { cache } = this;
        const params = this.serialize();
        params.stop = parsedOptions.stop ?? params.stop;
        const llmStringKey = `${Object.entries(params).sort()}`;
        const missingPromptIndices = [];
        const generations = await Promise.all(prompts.map(async (prompt, index) => {
            const result = await cache.lookup(prompt, llmStringKey);
            if (!result) {
                missingPromptIndices.push(index);
            }
            return result;
        }));
        let llmOutput = {};
        if (missingPromptIndices.length > 0) {
            const results = await this._generateUncached(missingPromptIndices.map((i) => prompts[i]), parsedOptions, callbacks);
            await Promise.all(results.generations.map(async (generation, index) => {
                const promptIndex = missingPromptIndices[index];
                generations[promptIndex] = generation;
                return cache.update(prompts[promptIndex], llmStringKey, generation);
            }));
            llmOutput = results.llmOutput ?? {};
        }
        return { generations, llmOutput };
    }
    /**
     * Convenience wrapper for {@link generate} that takes in a single string prompt and returns a single string output.
     */
    async call(prompt, options, callbacks) {
        const { generations } = await this.generate([prompt], options ?? {}, callbacks);
        return generations[0][0].text;
    }
    async predict(text, options, callbacks) {
        return this.call(text, options, callbacks);
    }
    async predictMessages(messages, options, callbacks) {
        const text = getBufferString(messages);
        const prediction = await this.call(text, options, callbacks);
        return new AIChatMessage(prediction);
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
    _modelType() {
        return "base_llm";
    }
    /**
     * Load an LLM from a json-like object describing it.
     */
    static async deserialize(data) {
        const { _type, _model, ...rest } = data;
        if (_model && _model !== "base_llm") {
            throw new Error(`Cannot load LLM with model ${_model}`);
        }
        const Cls = {
            openai: (await import("./openai.js")).OpenAI,
        }[_type];
        if (Cls === undefined) {
            throw new Error(`Cannot load  LLM with type ${_type}`);
        }
        return new Cls(rest);
    }
}
/**
 * LLM class that provides a simpler interface to subclass than {@link BaseLLM}.
 *
 * Requires only implementing a simpler {@link _call} method instead of {@link _generate}.
 *
 * @augments BaseLLM
 */
export class LLM extends BaseLLM {
    async _generate(prompts, options, runManager) {
        const generations = await Promise.all(prompts.map((prompt) => this._call(prompt, options, runManager).then((text) => [{ text }])));
        return { generations };
    }
}
