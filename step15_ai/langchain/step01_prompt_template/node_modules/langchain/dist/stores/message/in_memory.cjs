"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessageHistory = void 0;
const index_js_1 = require("../../schema/index.cjs");
class ChatMessageHistory extends index_js_1.BaseListChatMessageHistory {
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
exports.ChatMessageHistory = ChatMessageHistory;
