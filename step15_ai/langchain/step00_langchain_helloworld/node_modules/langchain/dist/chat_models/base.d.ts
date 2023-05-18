import { BaseChatMessage, BasePromptValue, ChatResult, LLMResult } from "../schema/index.js";
import { BaseLanguageModel, BaseLanguageModelCallOptions, BaseLanguageModelParams } from "../base_language/index.js";
import { CallbackManagerForLLMRun, Callbacks } from "../callbacks/manager.js";
export type SerializedChatModel = {
    _model: string;
    _type: string;
} & Record<string, any>;
export type SerializedLLM = {
    _model: string;
    _type: string;
} & Record<string, any>;
export type BaseChatModelParams = BaseLanguageModelParams;
export type BaseChatModelCallOptions = BaseLanguageModelCallOptions;
export declare abstract class BaseChatModel extends BaseLanguageModel {
    CallOptions: BaseChatModelCallOptions;
    ParsedCallOptions: Omit<this["CallOptions"], "timeout">;
    constructor(fields: BaseChatModelParams);
    abstract _combineLLMOutput?(...llmOutputs: LLMResult["llmOutput"][]): LLMResult["llmOutput"];
    generate(messages: BaseChatMessage[][], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<LLMResult>;
    /**
     * Get the parameters used to invoke the model
     */
    invocationParams(): any;
    _modelType(): string;
    abstract _llmType(): string;
    generatePrompt(promptValues: BasePromptValue[], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<LLMResult>;
    abstract _generate(messages: BaseChatMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
    call(messages: BaseChatMessage[], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<BaseChatMessage>;
    callPrompt(promptValue: BasePromptValue, options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<BaseChatMessage>;
    predictMessages(messages: BaseChatMessage[], options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<BaseChatMessage>;
    predict(text: string, options?: string[] | this["CallOptions"], callbacks?: Callbacks): Promise<string>;
}
export declare abstract class SimpleChatModel extends BaseChatModel {
    abstract _call(messages: BaseChatMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<string>;
    _generate(messages: BaseChatMessage[], options: this["ParsedCallOptions"], runManager?: CallbackManagerForLLMRun): Promise<ChatResult>;
}
