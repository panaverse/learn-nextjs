"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntityStore = exports.BaseFileStore = exports.BaseCache = exports.BaseListChatMessageHistory = exports.BaseChatMessageHistory = exports.BaseRetriever = exports.BasePromptValue = exports.ChatMessage = exports.SystemChatMessage = exports.AIChatMessage = exports.HumanChatMessage = exports.BaseChatMessage = exports.RUN_KEY = void 0;
exports.RUN_KEY = "__run";
class BaseChatMessage {
    constructor(text) {
        /** The text of the message. */
        Object.defineProperty(this, "text", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /** The name of the message sender in a multi-user chat. */
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.text = text;
    }
    toJSON() {
        return {
            type: this._getType(),
            data: {
                content: this.text,
                role: "role" in this ? this.role : undefined,
            },
        };
    }
}
exports.BaseChatMessage = BaseChatMessage;
class HumanChatMessage extends BaseChatMessage {
    _getType() {
        return "human";
    }
}
exports.HumanChatMessage = HumanChatMessage;
class AIChatMessage extends BaseChatMessage {
    _getType() {
        return "ai";
    }
}
exports.AIChatMessage = AIChatMessage;
class SystemChatMessage extends BaseChatMessage {
    _getType() {
        return "system";
    }
}
exports.SystemChatMessage = SystemChatMessage;
class ChatMessage extends BaseChatMessage {
    constructor(text, role) {
        super(text);
        Object.defineProperty(this, "role", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.role = role;
    }
    _getType() {
        return "generic";
    }
}
exports.ChatMessage = ChatMessage;
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
class BasePromptValue {
}
exports.BasePromptValue = BasePromptValue;
/**
 * Base Index class. All indexes should extend this class.
 */
class BaseRetriever {
}
exports.BaseRetriever = BaseRetriever;
class BaseChatMessageHistory {
}
exports.BaseChatMessageHistory = BaseChatMessageHistory;
class BaseListChatMessageHistory {
    addUserMessage(message) {
        return this.addMessage(new HumanChatMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIChatMessage(message));
    }
}
exports.BaseListChatMessageHistory = BaseListChatMessageHistory;
class BaseCache {
}
exports.BaseCache = BaseCache;
class BaseFileStore {
}
exports.BaseFileStore = BaseFileStore;
class BaseEntityStore {
}
exports.BaseEntityStore = BaseEntityStore;
