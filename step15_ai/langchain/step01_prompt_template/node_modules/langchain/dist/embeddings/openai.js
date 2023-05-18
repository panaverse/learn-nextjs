import { Configuration, OpenAIApi, } from "openai";
import { isNode } from "../util/env.js";
import fetchAdapter from "../util/axios-fetch-adapter.js";
import { chunkArray } from "../util/chunk.js";
import { Embeddings } from "./base.js";
export class OpenAIEmbeddings extends Embeddings {
    constructor(fields, configuration) {
        super(fields ?? {});
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "text-embedding-ada-002"
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 512
        });
        Object.defineProperty(this, "stripNewLines", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: true
        });
        Object.defineProperty(this, "timeout", {
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
        const azureApiDeploymentName = (fields?.azureOpenAIApiEmbeddingsDeploymentName ||
            fields?.azureOpenAIApiDeploymentName) ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_EMBEDDINGS_DEPLOYMENT_NAME ||
                        // eslint-disable-next-line no-process-env
                        process.env?.AZURE_OPENAI_API_DEPLOYMENT_NAME
                : undefined);
        const azureApiVersion = fields?.azureOpenAIApiVersion ??
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.AZURE_OPENAI_API_VERSION
                : undefined);
        this.modelName = fields?.modelName ?? this.modelName;
        this.batchSize = fields?.batchSize ?? this.batchSize;
        this.stripNewLines = fields?.stripNewLines ?? this.stripNewLines;
        this.timeout = fields?.timeout;
        this.azureOpenAIApiVersion = azureApiVersion;
        this.azureOpenAIApiKey = azureApiKey;
        this.azureOpenAIApiInstanceName = azureApiInstanceName;
        this.azureOpenAIApiDeploymentName = azureApiDeploymentName;
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
    async embedDocuments(texts) {
        const subPrompts = chunkArray(this.stripNewLines ? texts.map((t) => t.replaceAll("\n", " ")) : texts, this.batchSize);
        const embeddings = [];
        for (let i = 0; i < subPrompts.length; i += 1) {
            const input = subPrompts[i];
            const { data } = await this.embeddingWithRetry({
                model: this.modelName,
                input,
            });
            for (let j = 0; j < input.length; j += 1) {
                embeddings.push(data.data[j].embedding);
            }
        }
        return embeddings;
    }
    async embedQuery(text) {
        const { data } = await this.embeddingWithRetry({
            model: this.modelName,
            input: this.stripNewLines ? text.replaceAll("\n", " ") : text,
        });
        return data.data[0].embedding;
    }
    async embeddingWithRetry(request) {
        if (!this.client) {
            const endpoint = this.azureOpenAIApiKey
                ? `https://${this.azureOpenAIApiInstanceName}.openai.azure.com/openai/deployments/${this.azureOpenAIApiDeploymentName}`
                : this.clientConfig.basePath;
            const clientConfig = new Configuration({
                ...this.clientConfig,
                basePath: endpoint,
                baseOptions: {
                    timeout: this.timeout,
                    adapter: isNode() ? undefined : fetchAdapter,
                    ...this.clientConfig.baseOptions,
                },
            });
            this.client = new OpenAIApi(clientConfig);
        }
        const axiosOptions = {};
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
        return this.caller.call(this.client.createEmbedding.bind(this.client), request, axiosOptions);
    }
}
