"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapChatMessagesToStoredMessages = exports.mapStoredMessagesToChatMessages = exports.mapV1MessageToStoredMessage = void 0;
const index_js_1 = require("../../schema/index.cjs");
function mapV1MessageToStoredMessage(message) {
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
exports.mapV1MessageToStoredMessage = mapV1MessageToStoredMessage;
function mapStoredMessagesToChatMessages(messages) {
    return messages.map((message) => {
        const storedMessage = mapV1MessageToStoredMessage(message);
        switch (storedMessage.type) {
            case "human":
                return new index_js_1.HumanChatMessage(storedMessage.data.content);
            case "ai":
                return new index_js_1.AIChatMessage(storedMessage.data.content);
            case "system":
                return new index_js_1.SystemChatMessage(storedMessage.data.content);
            case "chat":
                if (storedMessage.data?.additional_kwargs?.role === undefined) {
                    throw new Error("Role must be defined for chat messages");
                }
                return new index_js_1.ChatMessage(storedMessage.data.content, storedMessage.data.additional_kwargs.role);
            default:
                throw new Error(`Got unexpected type: ${storedMessage.type}`);
        }
    });
}
exports.mapStoredMessagesToChatMessages = mapStoredMessagesToChatMessages;
function mapChatMessagesToStoredMessages(messages) {
    return messages.map((message) => message.toJSON());
}
exports.mapChatMessagesToStoredMessages = mapChatMessagesToStoredMessages;
