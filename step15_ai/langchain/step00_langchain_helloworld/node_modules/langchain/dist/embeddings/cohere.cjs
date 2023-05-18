"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CohereEmbeddings = void 0;
const chunk_js_1 = require("../util/chunk.cjs");
const base_js_1 = require("./base.cjs");
/**
 * A class for generating embeddings using the Cohere API.
 */
class CohereEmbeddings extends base_js_1.Embeddings {
    /**
     * Constructor for the CohereEmbeddings class.
     * @param fields - An optional object with properties to configure the instance.
     */
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "modelName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "small"
        });
        Object.defineProperty(this, "batchSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 48
        });
        Object.defineProperty(this, "apiKey", {
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
        const apiKey = fields?.apiKey ||
            (typeof process !== "undefined"
                ? // eslint-disable-next-line no-process-env
                    process.env?.COHERE_API_KEY
                : undefined);
        if (!apiKey) {
            throw new Error("Cohere API key not found");
        }
        this.modelName = fields?.modelName ?? this.modelName;
        this.batchSize = fields?.batchSize ?? this.batchSize;
        this.apiKey = apiKey;
    }
    /**
     * Generates embeddings for an array of texts.
     * @param texts - An array of strings to generate embeddings for.
     * @returns A Promise that resolves to an array of embeddings.
     */
    async embedDocuments(texts) {
        await this.maybeInitClient();
        const subPrompts = (0, chunk_js_1.chunkArray)(texts, this.batchSize);
        const embeddings = [];
        for (let i = 0; i < subPrompts.length; i += 1) {
            const input = subPrompts[i];
            const { body } = await this.embeddingWithRetry({
                model: this.modelName,
                texts: input,
            });
            for (let j = 0; j < input.length; j += 1) {
                embeddings.push(body.embeddings[j]);
            }
        }
        return embeddings;
    }
    /**
     * Generates an embedding for a single text.
     * @param text - A string to generate an embedding for.
     * @returns A Promise that resolves to an array of numbers representing the embedding.
     */
    async embedQuery(text) {
        await this.maybeInitClient();
        const { body } = await this.embeddingWithRetry({
            model: this.modelName,
            texts: [text],
        });
        return body.embeddings[0];
    }
    /**
     * Generates embeddings with retry capabilities.
     * @param request - An object containing the request parameters for generating embeddings.
     * @returns A Promise that resolves to the API response.
     */
    async embeddingWithRetry(request) {
        await this.maybeInitClient();
        return this.caller.call(this.client.embed.bind(this.client), request);
    }
    /**
     * Initializes the Cohere client if it hasn't been initialized already.
     */
    async maybeInitClient() {
        if (!this.client) {
            const { cohere } = await CohereEmbeddings.imports();
            this.client = cohere;
            this.client.init(this.apiKey);
        }
    }
    /** @ignore */
    static async imports() {
        try {
            const { default: cohere } = await import("cohere-ai");
            return { cohere };
        }
        catch (e) {
            throw new Error("Please install cohere-ai as a dependency with, e.g. `yarn add cohere-ai`");
        }
    }
}
exports.CohereEmbeddings = CohereEmbeddings;
