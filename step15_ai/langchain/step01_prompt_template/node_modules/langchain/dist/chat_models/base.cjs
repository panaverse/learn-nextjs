"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleChatModel = exports.BaseChatModel = void 0;
const index_js_1 = require("../schema/index.cjs");
const index_js_2 = require("../base_language/index.cjs");
const manager_js_1 = require("../callbacks/manager.cjs");
class BaseChatModel extends index_js_2.BaseLanguageModel {
    constructor(fields) {
        super(fields);
    }
    async generate(messages, options, callbacks) {
        const generations = [];
        const llmOutputs = [];
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
        const callbackManager_ = await manager_js_1.CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
        const invocationParams = { invocation_params: this?.invocationParams() };
        const runManager = await callbackManager_?.handleChatModelStart({ name: this._llmType() }, messages, undefined, undefined, invocationParams);
        try {
            const results = await Promise.all(messages.map((messageList) => this._generate(messageList, parsedOptions, runManager)));
            for (const result of results) {
                if (result.llmOutput) {
                    llmOutputs.push(result.llmOutput);
                }
                generations.push(result.generations);
            }
        }
        catch (err) {
            await runManager?.handleLLMError(err);
            throw err;
        }
        const output = {
            generations,
            llmOutput: llmOutputs.length
                ? this._combineLLMOutput?.(...llmOutputs)
                : undefined,
        };
        await runManager?.handleLLMEnd(output);
        Object.defineProperty(output, index_js_1.RUN_KEY, {
            value: runManager ? { runId: runManager?.runId } : undefined,
            configurable: true,
        });
        return output;
    }
    /**
     * Get the parameters used to invoke the model
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invocationParams() {
        return {};
    }
    _modelType() {
        return "base_chat_model";
    }
    async generatePrompt(promptValues, options, callbacks) {
        const promptMessages = promptValues.map((promptValue) => promptValue.toChatMessages());
        return this.generate(promptMessages, options, callbacks);
    }
    async call(messages, options, callbacks) {
        const result = await this.generate([messages], options, callbacks);
        const generations = result.generations;
        return generations[0][0].message;
    }
    async callPrompt(promptValue, options, callbacks) {
        const promptMessages = promptValue.toChatMessages();
        return this.call(promptMessages, options, callbacks);
    }
    async predictMessages(messages, options, callbacks) {
        return this.call(messages, options, callbacks);
    }
    async predict(text, options, callbacks) {
        const message = new index_js_1.HumanChatMessage(text);
        const result = await this.call([message], options, callbacks);
        return result.text;
    }
}
exports.BaseChatModel = BaseChatModel;
class SimpleChatModel extends BaseChatModel {
    async _generate(messages, options, runManager) {
        const text = await this._call(messages, options, runManager);
        const message = new index_js_1.AIChatMessage(text);
        return {
            generations: [
                {
                    text: message.text,
                    message,
                },
            ],
        };
    }
}
exports.SimpleChatModel = SimpleChatModel;
