import { ConfigurationParameters } from "openai";
import { AzureOpenAIInput } from "../types/openai-types.js";
import { Embeddings, EmbeddingsParams } from "./base.js";
export interface OpenAIEmbeddingsParams extends EmbeddingsParams {
    /** Model name to use */
    modelName: string;
    /**
     * Timeout to use when making requests to OpenAI.
     */
    timeout?: number;
    /**
     * The maximum number of documents to embed in a single request. This is
     * limited by the OpenAI API to a maximum of 2048.
     */
    batchSize?: number;
    /**
     * Whether to strip new lines from the input text. This is recommended by
     * OpenAI, but may not be suitable for all use cases.
     */
    stripNewLines?: boolean;
}
export declare class OpenAIEmbeddings extends Embeddings implements OpenAIEmbeddingsParams, AzureOpenAIInput {
    modelName: string;
    batchSize: number;
    stripNewLines: boolean;
    timeout?: number;
    azureOpenAIApiVersion?: string;
    azureOpenAIApiKey?: string;
    azureOpenAIApiInstanceName?: string;
    azureOpenAIApiDeploymentName?: string;
    private client;
    private clientConfig;
    constructor(fields?: Partial<OpenAIEmbeddingsParams> & Partial<AzureOpenAIInput> & {
        verbose?: boolean;
        openAIApiKey?: string;
    }, configuration?: ConfigurationParameters);
    embedDocuments(texts: string[]): Promise<number[][]>;
    embedQuery(text: string): Promise<number[]>;
    private embeddingWithRetry;
}
