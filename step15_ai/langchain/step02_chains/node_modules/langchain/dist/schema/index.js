export const RUN_KEY = "__run";
export class BaseChatMessage {
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
export class HumanChatMessage extends BaseChatMessage {
    _getType() {
        return "human";
    }
}
export class AIChatMessage extends BaseChatMessage {
    _getType() {
        return "ai";
    }
}
export class SystemChatMessage extends BaseChatMessage {
    _getType() {
        return "system";
    }
}
export class ChatMessage extends BaseChatMessage {
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
/**
 * Base PromptValue class. All prompt values should extend this class.
 */
export class BasePromptValue {
}
/**
 * Base Index class. All indexes should extend this class.
 */
export class BaseRetriever {
}
export class BaseChatMessageHistory {
}
export class BaseListChatMessageHistory {
    addUserMessage(message) {
        return this.addMessage(new HumanChatMessage(message));
    }
    addAIChatMessage(message) {
        return this.addMessage(new AIChatMessage(message));
    }
}
export class BaseCache {
}
export class BaseFileStore {
}
export class BaseEntityStore {
}
