import { Configuration, OpenAIApi, } from "openai";
import { isNode } from "../util/env.js";
import fetchAdapter from "../util/axios-fetch-adapter.js";
import { BaseChatModel } from "./base.js";
import { AIChatMessage, ChatMessage, HumanChatMessage, SystemChatMessage, } from "../schema/index.js";
import { getModelNameForTiktoken } from "../base_language/count_tokens.js";
function messageTypeToOpenAIRole(type) {
    switch (type) {
        case "system":
            return "system";
        case "ai":
            return "assistant";
        case "human":
            return "user";
        default:
            throw new Error(`Unknown message type: ${type}`);
    }
}
function openAIResponseToChatMessage(role, text) {
    switch (role) {
        case "user":
            return new HumanChatMessage(text);
        case "assistant":
            return new AIChatMessage(text);
        case "system":
            return new SystemChatMessage(text);
        default:
            return new ChatMessage(text, role ?? "unknown");
    }
}
/**
 * Wrapper around OpenAI large language models that use the Chat endpoint.
 *
 * To use you should have the `openai` package installed, with the
 * `OPENAI_API_KEY` environment variable set.
 *
 * To use with Azure you should have the `openai` package installed, with the
 * `AZURE_OPENAI_API_KEY`,
 * `AZURE_OPENAI_API_INSTANCE_NAME`,
 * `AZURE_OPENAI_API_DEPLOYMENT_NAME`
 * and `AZURE_OPENAI_API_VERSION` environment variable set.
 *
 * @remarks
 * Any parameters that are valid to be passed to {@link
 * https://platform.openai.com/docs/api-reference/chat/create |
 * `openai.createCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */
export class ChatOpenAI extends BaseChatModel {
    get callKeys() {
        return ["stop", "signal", "timeout", "options"];
    }
    constructor(fields, configuration) {
        super(fields ?? {});
        Object.defineProperty(this, "temperature", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "topP", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "frequencyPenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "presencePenalty", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "n", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 1
        });
        Object.defineProperty(this, "logitBias", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "gpt-3.5-turbo"
        });
        Object.defineProperty(this, "modelKwargs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stop", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeout", {
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
        Object.defineProperty(this, "maxTokens", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiInstanceName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "azureOpenAIApiDeploymentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = fields?.openAIApiKey ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.OPENAI_API_KEY
                : undefined);
        const azureApiKey = fields?.azureOpenAIApiKey ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_KEY
                : undefined);
        if (!azureApiKey && !apiKey) {
            throw new Error("(Azure) OpenAI API key not found");
        }
        const azureApiInstanceName = fields?.azureOpenAIApiInstanceName ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_INSTANCE_NAME
                : undefined);
        const azureApiDeploymentName = fields?.azureOpenAIApiDeploymentName ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_DEPLOYMENT_NAME
                : undefined);
        const azureApiVersion = fields?.azureOpenAIApiVersion ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_VERSION
                : undefined);
        this.modelName = fields?.modelName ?? this.modelName;
        this.modelKwargs = fields?.modelKwargs ?? {};
        this.timeout = fields?.timeout;
        this.temperature = fields?.temperature ?? this.temperature;
        this.topP = fields?.topP ?? this.topP;
        this.frequencyPenalty = fields?.frequencyPenalty ?? this.frequencyPenalty;
        this.presencePenalty = fields?.presencePenalty ?? this.presencePenalty;
        this.maxTokens = fields?.maxTokens;
        this.n = fields?.n ?? this.n;
        this.logitBias = fields?.logitBias;
        this.stop = fields?.stop;
        this.streaming = fields?.streaming ?? false;
        this.azureOpenAIApiVersion = azureApiVersion;
        this.azureOpenAIApiKey = azureApiKey;
        this.azureOpenAIApiInstanceName = azureApiInstanceName;
        this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
        if (this.streaming && this.n > 1) {
            throw new Error("Cannot stream results when n > 1");
        }
        if (this.azureOpenAIApiKey) {
            if (!this.azureOpenAIApiInstanceName) {
                throw new Error("Azure OpenAI API instance name not found");
            }
            if (!this.azureOpenAIApiDeploymentName) {
                throw new Error("Azure OpenAI API deployment name not found");
            }
            if (!this.azureOpenAIApiVersion) {
                throw new Error("Azure OpenAI API version not found");
            }
        }
        this.clientConfig = {
            apiKey,
            ...configuration,
        };
    }
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams() {
        return {
            model: this.modelName,
            temperature: this.temperature,
            top_p: this.topP,
            frequency_penalty: this.frequencyPenalty,
            presence_penalty: this.presencePenalty,
            max_tokens: this.maxTokens === -1 ? undefined : this.maxTokens,
            n: this.n,
            logit_bias: this.logitBias,
            stop: this.stop,
            stream: this.streaming,
            ...this.modelKwargs,
        };
    }
    /** @ignore */
    _identifyingParams() {
        return {
            model_name: this.modelName,
            ...this.invocationParams(),
            ...this.clientConfig,
        };
    }
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams() {
        return this._identifyingParams();
    }
    /** @ignore */
    async _generate(messages, options, runManager) {
        const tokenUsage = {};
        if (this.stop && options?.stop) {
            throw new Error("Stop found in input and default params");
        }
        const params = this.invocationParams();
        params.stop = options?.stop ?? params.stop;
        const messagesMapped = messages.map((message) => ({
            role: messageTypeToOpenAIRole(message._getType()),
            content: message.text,
            name: message.name,
        }));
        const data = params.stream
            ? await new Promise((resolve, reject) => {
                let response;
                let rejected = false;
                let resolved = false;
                this.completionWithRetry({
                    ...params,
                    messages: messagesMapped,
                }, {
                    signal: options?.signal,
                    ...options?.options,
                    adapter: fetchAdapter,
                    responseType: "stream",
                    onmessage: (event) => {
                        if (event.data?.trim?.() === "[DONE]") {
                            if (resolved) {
                                return;
                            }
                            resolved = true;
                            resolve(response);
                        }
                        else {
                            const message = JSON.parse(event.data);
                            // on the first message set the response properties
                            if (!response) {
                                response = {
                                    id: message.id,
                                    object: message.object,
                                    created: message.created,
                                    model: message.model,
                                    choices: [],
                                };
                            }
                            // on all messages, update choice
                            for (const part of message.choices) {
                                if (part != null) {
                                    let choice = response.choices.find((c) => c.index === part.index);
                                    if (!choice) {
                                        choice = {
                                            index: part.index,
                                            finish_reason: part.finish_reason ?? undefined,
                                        };
                                        response.choices[part.index] = choice;
                                    }
                                    if (!choice.message) {
                                        choice.message = {
                                            role: part.delta
                                                ?.role,
                                            content: part.delta?.content ?? "",
                                        };
                                    }
                                    choice.message.content += part.delta?.content ?? "";
                                    // TODO this should pass part.index to the callback
                                    // when that's supported there
                                    // eslint-disable-next-line no-void
                                    void runManager?.handleLLMNewToken(part.delta?.content ?? "");
                                }
                            }
                            // when all messages are finished, resolve
                            if (!resolved &&
                                message.choices.every((c) => c.finish_reason != null)) {
                                resolved = true;
                                resolve(response);
                            }
                        }
                    },
                }).catch((error) => {
                    if (!rejected) {
                        rejected = true;
                        reject(error);
                    }
                });
            })
            : await this.completionWithRetry({
                ...params,
                messages: messagesMapped,
            }, {
                signal: options?.signal,
                ...options?.options,
            });
        const { completion_tokens: completionTokens, prompt_tokens: promptTokens, total_tokens: totalTokens, } = data.usage ?? {};
        if (completionTokens) {
            tokenUsage.completionTokens =
                (tokenUsage.completionTokens ?? 0) + completionTokens;
        }
        if (promptTokens) {
            tokenUsage.promptTokens = (tokenUsage.promptTokens ?? 0) + promptTokens;
        }
        if (totalTokens) {
            tokenUsage.totalTokens = (tokenUsage.totalTokens ?? 0) + totalTokens;
        }
        const generations = [];
        for (const part of data.choices) {
            const role = part.message?.role ?? undefined;
            const text = part.message?.content ?? "";
            generations.push({
                text,
                message: openAIResponseToChatMessage(role, text),
            });
        }
        return {
            generations,
            llmOutput: { tokenUsage },
        };
    }
    async getNumTokensFromMessages(messages) {
        let totalCount = 0;
        let tokensPerMessage = 0;
        let tokensPerName = 0;
        // From: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_format_inputs_to_ChatGPT_models.ipynb
        if (getModelNameForTiktoken(this.modelName) === "gpt-3.5-turbo") {
            tokensPerMessage = 4;
            tokensPerName = -1;
        }
        else if (getModelNameForTiktoken(this.modelName).startsWith("gpt-4")) {
            tokensPerMessage = 3;
            tokensPerName = 1;
        }
        const countPerMessage = await Promise.all(messages.map(async (message) => {
            const textCount = await this.getNumTokens(message.text);
            const roleCount = await this.getNumTokens(messageTypeToOpenAIRole(message._getType()));
            const nameCount = message.name !== undefined
                ? tokensPerName + (await this.getNumTokens(message.name))
                : 0;
            const count = textCount + tokensPerMessage + roleCount + nameCount;
            totalCount += count;
            return count;
        }));
        totalCount += 3; // every reply is primed with <|start|>assistant<|message|>
        return { totalCount, countPerMessage };
    }
    /** @ignore */
    async completionWithRetry(request, options) {
        if (!this.client) {
            const endpoint = this.azureOpenAIApiKey
                ? `https://${this.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.azureOpenAIApiDeploymentName}`
                : this.clientConfig.basePath;
            const clientConfig = new Configuration({
                ...this.clientConfig,
                basePath: endpoint,
                baseOptions: {
                    timeout: this.timeout,
                    ...this.clientConfig.baseOptions,
                },
            });
            this.client = new OpenAIApi(clientConfig);
        }
        const axiosOptions = {
            adapter: isNode() ? undefined : fetchAdapter,
            ...this.clientConfig.baseOptions,
            ...options,
        };
        if (this.azureOpenAIApiKey) {
            axiosOptions.headers = {
                "api-key": this.azureOpenAIApiKey,
                ...axiosOptions.headers,
            };
            axiosOptions.params = {
                "api-version": this.azureOpenAIApiVersion,
                ...axiosOptions.params,
            };
        }
        return this.caller
            .call(this.client.createChatCompletion.bind(this.client), request, axiosOptions)
            .then((res) => res.data);
    }
    _llmType() {
        return "openai";
    }
    /** @ignore */
    _combineLLMOutput(...llmOutputs) {
        return llmOutputs.reduce((acc, llmOutput) => {
            if (llmOutput && llmOutput.tokenUsage) {
                acc.tokenUsage.completionTokens +=
                    llmOutput.tokenUsage.completionTokens ?? 0;
                acc.tokenUsage.promptTokens += llmOutput.tokenUsage.promptTokens ?? 0;
                acc.tokenUsage.totalTokens += llmOutput.tokenUsage.totalTokens ?? 0;
            }
            return acc;
        }, {
            tokenUsage: {
                completionTokens: 0,
                promptTokens: 0,
                totalTokens: 0,
            },
        });
    }
}
