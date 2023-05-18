import { Document } from "../document.js";
export declare const RUN_KEY = "__run";
export type Example = Record<string, string>;
export type InputValues = Record<string, any>;
export type PartialValues = Record<string, string | (() => Promise<string>) | (() => string)>;
/**
 * Output of a single generation.
 */
export interface Generation {
    /**
     * Generated text output
     */
    text: string;
    /**
     * Raw generation info response from the provider.
     * May include things like reason for finishing (e.g. in {@link OpenAI})
     */
    generationInfo?: Record<string, any>;
}
/**
 * Contains all relevant information returned by an LLM.
 */
export type LLMResult = {
    /**
     * List of the things generated. Each input could have multiple {@link Generation | generations}, hence this is a list of lists.
     */
    generations: Generation[][];
    /**
     * Dictionary of arbitrary LLM-provider specific output.
     */
    llmOutput?: Record<string, any>;
    /**
     * Dictionary of run metadata
     */
    [RUN_KEY]?: Record<string, any>;
};
export interface StoredMessageData {
    content: string;
    role: string | undefined;
    additional_kwargs?: Record<string, any>;
}
export interface StoredMessage {
    type: string;
    data: StoredMessageData;
}
export type MessageType = "human" | "ai" | "generic" | "system";
export declare abstract class BaseChatMessage {
    /** The text of the message. */
    text: string;
    /** The name of the message sender in a multi-user chat. */
    name?: string;
    /** The type of the message. */
    abstract _getType(): MessageType;
    constructor(text: string);
    toJSON(): StoredMessage;
}
export declare class HumanChatMessage extends BaseChatMessage {
    _getType(): MessageType;
}
export declare class AIChatMessage extends BaseChatMessage {
    _getType(): MessageType;
}
export declare class SystemChatMessage extends BaseChatMessage {
    _getType(): MessageType;
}
export declare class ChatMessage extends BaseChatMessage {
    role: string;
    constructor(text: string, role: string);
    _getType(): MessageType;
}
export interface ChatGeneration extends Generation {
    message: BaseChatMessage;
}
export interface ChatResult {
    generations: ChatGeneration[];
    llmOutput?: Record<string, any>;
}
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
export declare abstract class BasePromptValue {
    abstract toString(): string;
    abstract toChatMessages(): BaseChatMessage[];
}
export type AgentAction = {
    tool: string;
    toolInput: string;
    log: string;
};
export type AgentFinish = {
    returnValues: Record<string, any>;
    log: string;
};
export type AgentStep = {
    action: AgentAction;
    observation: string;
};
export type ChainValues = Record<string, any>;
export type RunInputs = Record<string, any>;
export type RunOutputs = Record<string, any>;
/**
 * Base Index class. All indexes should extend this class.
 */
export declare abstract class BaseRetriever {
    abstract getRelevantDocuments(query: string): Promise<Document[]>;
}
export declare abstract class BaseChatMessageHistory {
    abstract getMessages(): Promise<BaseChatMessage[]>;
    abstract addUserMessage(message: string): Promise<void>;
    abstract addAIChatMessage(message: string): Promise<void>;
    abstract clear(): Promise<void>;
}
export declare abstract class BaseListChatMessageHistory {
    protected abstract addMessage(message: BaseChatMessage): Promise<void>;
    addUserMessage(message: string): Promise<void>;
    addAIChatMessage(message: string): Promise<void>;
}
export declare abstract class BaseCache<T = Generation[]> {
    abstract lookup(prompt: string, llmKey: string): Promise<T | null>;
    abstract update(prompt: string, llmKey: string, value: T): Promise<void>;
}
export declare abstract class BaseFileStore {
    abstract readFile(path: string): Promise<string>;
    abstract writeFile(path: string, contents: string): Promise<void>;
}
export declare abstract class BaseEntityStore {
    abstract get(key: string, defaultValue?: string): Promise<string | undefined>;
    abstract set(key: string, value?: string): Promise<void>;
    abstract delete(key: string): Promise<void>;
    abstract exists(key: string): Promise<boolean>;
    abstract clear(): Promise<void>;
}
