import { AIChatMessage, ChatMessage, HumanChatMessage, SystemChatMessage, } from "../../schema/index.js";
export function mapV1MessageToStoredMessage(message) {
    // TODO: Remove this mapper when we deprecate the old message format.
    if (message.data !== undefined) {
        return message;
    }
    else {
        const v1Message = message;
        return {
            type: v1Message.type,
            data: {
                content: v1Message.text,
                role: v1Message.role,
            },
        };
    }
}
export function mapStoredMessagesToChatMessages(messages) {
    return messages.map((message) => {
        const storedMessage = mapV1MessageToStoredMessage(message);
        switch (storedMessage.type) {
            case "human":
                return new HumanChatMessage(storedMessage.data.content);
            case "ai":
                return new AIChatMessage(storedMessage.data.content);
            case "system":
                return new SystemChatMessage(storedMessage.data.content);
            case "chat":
                if (storedMessage.data?.additional_kwargs?.role === undefined) {
                    throw new Error("Role must be defined for chat messages");
                }
                return new ChatMessage(storedMessage.data.content, storedMessage.data.additional_kwargs.role);
            default:
                throw new Error(`Got unexpected type: ${storedMessage.type}`);
        }
    });
}
export function mapChatMessagesToStoredMessages(messages) {
    return messages.map((message) => message.toJSON());
}
