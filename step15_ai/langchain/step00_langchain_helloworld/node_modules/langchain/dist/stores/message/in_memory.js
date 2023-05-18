import { BaseListChatMessageHistory, } from "../../schema/index.js";
export class ChatMessageHistory extends BaseListChatMessageHistory {
    constructor(messages) {
        super();
        Object.defineProperty(this, "messages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.messages = messages ?? [];
    }
    async getMessages() {
        return this.messages;
    }
    async addMessage(message) {
        this.messages.push(message);
    }
    async clear() {
        this.messages = [];
    }
}
