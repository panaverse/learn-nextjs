import { BaseChatMessage, BaseListChatMessageHistory } from "../../schema/index.js";
export declare class ChatMessageHistory extends BaseListChatMessageHistory {
    private messages;
    constructor(messages?: BaseChatMessage[]);
    getMessages(): Promise<BaseChatMessage[]>;
    addMessage(message: BaseChatMessage): Promise<void>;
    clear(): Promise<void>;
}
