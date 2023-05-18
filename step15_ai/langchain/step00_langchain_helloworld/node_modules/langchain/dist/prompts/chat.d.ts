import { BaseChatMessage, BasePromptValue, InputValues, PartialValues } from "../schema/index.js";
import { BasePromptTemplate, BasePromptTemplateInput, BaseStringPromptTemplate } from "./base.js";
import { SerializedChatPromptTemplate, SerializedMessagePromptTemplate } from "./serde.js";
export declare abstract class BaseMessagePromptTemplate {
    abstract inputVariables: string[];
    abstract formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
    serialize(): SerializedMessagePromptTemplate;
}
export declare class ChatPromptValue extends BasePromptValue {
    messages: BaseChatMessage[];
    constructor(messages: BaseChatMessage[]);
    toString(): string;
    toChatMessages(): BaseChatMessage[];
}
export declare class MessagesPlaceholder extends BaseMessagePromptTemplate {
    variableName: string;
    constructor(variableName: string);
    get inputVariables(): string[];
    formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
}
export declare abstract class BaseMessageStringPromptTemplate extends BaseMessagePromptTemplate {
    prompt: BaseStringPromptTemplate;
    protected constructor(prompt: BaseStringPromptTemplate);
    get inputVariables(): string[];
    abstract format(values: InputValues): Promise<BaseChatMessage>;
    formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
}
export declare abstract class BaseChatPromptTemplate extends BasePromptTemplate {
    constructor(input: BasePromptTemplateInput);
    abstract formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
    format(values: InputValues): Promise<string>;
    formatPromptValue(values: InputValues): Promise<BasePromptValue>;
}
export declare class ChatMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    role: string;
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate, role: string);
    static fromTemplate(template: string, role: string): ChatMessagePromptTemplate;
}
export declare class HumanMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): HumanMessagePromptTemplate;
}
export declare class AIMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): AIMessagePromptTemplate;
}
export declare class SystemMessagePromptTemplate extends BaseMessageStringPromptTemplate {
    format(values: InputValues): Promise<BaseChatMessage>;
    constructor(prompt: BaseStringPromptTemplate);
    static fromTemplate(template: string): SystemMessagePromptTemplate;
}
export interface ChatPromptTemplateInput extends BasePromptTemplateInput {
    /**
     * The prompt messages
     */
    promptMessages: BaseMessagePromptTemplate[];
    /**
     * Whether to try validating the template on initialization
     *
     * @defaultValue `true`
     */
    validateTemplate?: boolean;
}
export declare class ChatPromptTemplate extends BaseChatPromptTemplate implements ChatPromptTemplateInput {
    promptMessages: BaseMessagePromptTemplate[];
    validateTemplate: boolean;
    constructor(input: ChatPromptTemplateInput);
    _getPromptType(): "chat";
    formatMessages(values: InputValues): Promise<BaseChatMessage[]>;
    serialize(): SerializedChatPromptTemplate;
    partial(values: PartialValues): Promise<ChatPromptTemplate>;
    static fromPromptMessages(promptMessages: (BaseMessagePromptTemplate | ChatPromptTemplate)[]): ChatPromptTemplate;
}
