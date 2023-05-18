import { ConfigurationParameters, CreateCompletionRequest, CreateCompletionResponse } from "openai";
import { AzureOpenAIInput, OpenAICallOptions, OpenAIInput } from "../types/openai-types.js";
import type { StreamingAxiosConfiguration } from "../util/axios-types.js";
import { BaseLLM, BaseLLMParams } from "./base.js";
import { LLMResult } from "../schema/index.js";
import { CallbackManagerForLLMRun } from "../callbacks/manager.js";
export { OpenAICallOptions, AzureOpenAIInput, OpenAIInput };
/**
 * Wrapper around OpenAI large language models.
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
 * https://platform.openai.com/docs/api-reference/completions/create |
 * `openai.createCompletion`} can be passed through {@link modelKwargs}, even
 * if not explicitly available on this class.
 */
export declare class OpenAI extends BaseLLM implements OpenAIInput, AzureOpenAIInput {
    CallOptions: OpenAICallOptions;
    get callKeys(): (keyof OpenAICallOptions)[];
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
    presencePenalty: number;
    n: number;
    bestOf: number;
    logitBias?: Record<string, number>;
    modelName: string;
    modelKwargs?: OpenAIInput["modelKwargs"];
    batchSize: number;
    timeout?: number;
    stop?: string[];
    streaming: boolean;
    azureOpenAIApiVersion?: string;
    azureOpenAIApiKey?: string;
    azureOpenAIApiInstanceName?: string;
    azureOpenAIApiDeploymentName?: string;
    private client;
    private clientConfig;
    constructor(fields?: Partial<OpenAIInput> & Partial<AzureOpenAIInput> & BaseLLMParams & {
        openAIApiKey?: string;
    }, configuration?: ConfigurationParameters);
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(): CreateCompletionRequest;
    _identifyingParams(): {
        apiKey?: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>) | undefined;
        organization?: string | undefined;
        username?: string | undefined;
        password?: string | undefined;
        accessToken?: string | Promise<string> | ((name?: string | undefined, scopes?: string[] | undefined) => string) | ((name?: string | undefined, scopes?: string[] | undefined) => Promise<string>) | undefined;
        basePath?: string | undefined;
        baseOptions?: any;
        formDataCtor?: (new () => any) | undefined;
        model: string;
        prompt?: import("openai").CreateCompletionRequestPrompt | null | undefined;
        suffix?: string | null | undefined;
        max_tokens?: number | null | undefined;
        temperature?: number | null | undefined;
        top_p?: number | null | undefined;
        n?: number | null | undefined;
        stream?: boolean | null | undefined;
        logprobs?: number | null | undefined;
        echo?: boolean | null | undefined;
        stop?: import("openai").CreateCompletionRequestStop | null | undefined;
        presence_penalty?: number | null | undefined;
        frequency_penalty?: number | null | undefined;
        best_of?: number | null | undefined;
        logit_bias?: object | null | undefined;
        user?: string | undefined;
        model_name: string;
    };
    /**
     * Get the identifying parameters for the model
     */
    identifyingParams(): {
        apiKey?: string | Promise<string> | ((name: string) => string) | ((name: string) => Promise<string>) | undefined;
        organization?: string | undefined;
        username?: string | undefined;
        password?: string | undefined;
        accessToken?: string | Promise<string> | ((name?: string | undefined, scopes?: string[] | undefined) => string) | ((name?: string | undefined, scopes?: string[] | undefined) => Promise<string>) | undefined;
        basePath?: string | undefined;
        baseOptions?: any;
        formDataCtor?: (new () => any) | undefined;
        model: string;
        prompt?: import("openai").CreateCompletionRequestPrompt | null | undefined;
        suffix?: string | null | undefined;
        max_tokens?: number | null | undefined;
        temperature?: number | null | undefined;
        top_p?: number | null | undefined;
        n?: number | null | undefined;
        stream?: boolean | null | undefined;
        logprobs?: number | null | undefined;
        echo?: boolean | null | undefined;
        stop?: import("openai").CreateCompletionRequestStop | null | undefined;
        presence_penalty?: number | null | undefined;
        frequency_penalty?: number | null | undefined;
        best_of?: number | null | undefined;
        logit_bias?: object | null | undefined;
        user?: string | undefined;
        model_name: string;
    };
    /**
     * Call out to OpenAI's endpoint with k unique prompts
     *
     * @param [prompts] - The prompts to pass into the model.
     * @param [options] - Optional list of stop words to use when generating.
     * @param [runManager] - Optional callback manager to use when generating.
     *
     * @returns The full LLM output.
     *
     * @example
     * ```ts
     * import { OpenAI } from "langchain/llms/openai";
     * const openai = new OpenAI();
     * const response = await openai.generate(["Tell me a joke."]);
     * ```
     */
    _generate(prompts: string[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<LLMResult>;
    /** @ignore */
    completionWithRetry(request: CreateCompletionRequest, options?: StreamingAxiosConfiguration): Promise<CreateCompletionResponse>;
    _llmType(): string;
}
/**
 * PromptLayer wrapper to OpenAI
 * @augments OpenAI
 */
export declare class PromptLayerOpenAI extends OpenAI {
    promptLayerApiKey?: string;
    plTags?: string[];
    constructor(fields?: ConstructorParameters<typeof OpenAI>[0] & {
        promptLayerApiKey?: string;
        plTags?: string[];
    });
    completionWithRetry(request: CreateCompletionRequest, options?: StreamingAxiosConfiguration): Promise<CreateCompletionResponse>;
}
export { OpenAIChat, PromptLayerOpenAIChat } from "./openai-chat.js";
