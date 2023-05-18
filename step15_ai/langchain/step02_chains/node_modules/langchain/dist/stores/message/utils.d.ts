import { BaseChatMessage, StoredMessage } from "../../schema/index.js";
interface StoredMessageV1 {
    type: string;
    role: string | undefined;
    text: string;
}
export declare function mapV1MessageToStoredMessage(message: StoredMessage | StoredMessageV1): StoredMessage;
export declare function mapStoredMessagesToChatMessages(messages: StoredMessage[]): BaseChatMessage[];
export declare function mapChatMessagesToStoredMessages(messages: BaseChatMessage[]): StoredMessage[];
export {};
