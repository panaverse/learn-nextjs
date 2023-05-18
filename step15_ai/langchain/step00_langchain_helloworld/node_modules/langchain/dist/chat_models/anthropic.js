import { AI_PROMPT, HUMAN_PROMPT, Client as AnthropicApi, } from "@anthropic-ai/sdk";
import { BaseChatModel } from "./base.js";
import { AIChatMessage, } from "../schema/index.js";
function getAnthropicPromptFromMessage(type) {
    switch (type) {
        case "ai":
            return AI_PROMPT;
        case "human":
            return HUMAN_PROMPT;
        case "system":
            return "";
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
const DEFAULT_STOP_SEQUENCES = [HUMAN_PROMPT];
/**
 * Wrapper around Anthropic large language models.
 *
 * To use you should have the `@anthropic-ai/sdk` package installed, with the
 * `ANTHROPIC_API_KEY` environment variable set.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://console.anthropic.com/docs/api/reference |
 * `anthropic.complete`} can be passed through {@link invocationKwargs},
 * even if not explicitly available on this class.
 *
 */
export class ChatAnthropic extends BaseChatModel {
    get callKeys() {
        return ["stop", "signal", "options"];
    }
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topK", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: -1
        });
        Object.defineProperty(this, "maxTokensToSample", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 2048
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "claude-v1"
        });
        Object.defineProperty(this, "invocationKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stopSequences", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "streaming", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        // Used for non-streaming requests
        Object.defineProperty(this, "batchClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Used for streaming requests
        Object.defineProperty(this, "streamingClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.apiKey =
            fields?.anthropicApiKey ??
                (typeof process !== "undefined"
                    ? // eslint-disable-next-line no-process-env
                        process.env?.ANTHROPIC_API_KEY
                    : undefined);
        if (!this.apiKey) {
            throw new Error("Anthropic API key not found");
        }
        this.modelName = fields?.modelName ?? this.modelName;
        this.invocationKwargs = fields?.invocationKwargs ?? {};
        this.temperature = fields?.temperature ?? this.temperature;
        this.topK = fields?.topK ?? this.topK;
        this.topP = fields?.topP ?? this.topP;
        this.maxTokensToSample =
            fields?.maxTokensToSample ?? this.maxTokensToSample;
        this.stopSequences = fields?.stopSequences ?? this.stopSequences;
        this.streaming = fields?.streaming ?? false;
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams() {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_k: this.topK,
            top_p: this.topP,
            stop_sequences: this.stopSequences ?? DEFAULT_STOP_SEQUENCES,
            max_tokens_to_sample: this.maxTokensToSample,
            stream: this.streaming,
            ...this.invocationKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
        };
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
        };
    }
    formatMessagesAsPrompt(messages) {
        return (messages
            .map((message) => {
            const messagePrompt = getAnthropicPromptFromMessage(message._getType());
            return `${messagePrompt} ${message.text}`;
        })
            .join("") + AI_PROMPT);
    }
    /** @ignore */
    async _generate(messages, options, runManager) {
        if (this.stopSequences && options.stop) {
            throw new Error(`"stopSequence" parameter found in input and default params`);
        }
        const params = this.invocationParams();
        params.stop_sequences = options.stop
            ? options.stop.concat(DEFAULT_STOP_SEQUENCES)
            : params.stop_sequences;
        const response = await this.completionWithRetry({
            ...params,
            prompt: this.formatMessagesAsPrompt(messages),
        }, { signal: options.signal }, runManager);
        const generations = response.completion
            .split(AI_PROMPT)
            .map((message) => ({
            text: message,
            message: new AIChatMessage(message),
        }));
        return {
            generations,
        };
    }
    /** @ignore */
    async completionWithRetry(request, options, runManager) {
        if (!this.apiKey) {
            throw new Error("Missing Anthropic API key.");
        }
        let makeCompletionRequest;
        if (request.stream) {
            if (!this.streamingClient) {
                this.streamingClient = new AnthropicApi(this.apiKey);
            }
            makeCompletionRequest = async () => {
                let currentCompletion = "";
                return (this.streamingClient
                    .completeStream(request, {
                    onUpdate: (data) => {
                        if (data.stop_reason) {
                            return;
                        }
                        const part = data.completion;
                        if (part) {
                            const delta = part.slice(currentCompletion.length);
                            currentCompletion += delta ?? "";
                            // eslint-disable-next-line no-void
                            void runManager?.handleLLMNewToken(delta ?? "");
                        }
                    },
                    signal: options.signal,
                })
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    .catch((e) => {
                    // Anthropic doesn't actually throw JavaScript error objects at the moment.
                    // We convert the error so the async caller can recognize it correctly.
                    if (e?.name === "AbortError") {
                        throw new Error(`${e.name}: ${e.message}`);
                    }
                    throw e;
                }));
            };
        }
        else {
            if (!this.batchClient) {
                this.batchClient = new AnthropicApi(this.apiKey);
            }
            makeCompletionRequest = async () => this.batchClient
                .complete(request, {
                signal: options.signal,
            })
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .catch((e) => {
                console.log(e);
                // Anthropic doesn't actually throw JavaScript error objects at the moment.
                // We convert the error so the async caller can recognize it correctly.
                if (e?.type === "aborted") {
                    throw new Error(`${e.name}: ${e.message}`);
                }
                throw e;
            });
        }
        return this.caller.call(makeCompletionRequest);
    }
    _llmType() {
        return "anthropic";
    }
    /** @ignore */
    _combineLLMOutput() {
        return [];
    }
}
