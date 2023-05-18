"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseChatMemory = void 0;
const base_js_1 = require("./base.cjs");
const in_memory_js_1 = require("../stores/message/in_memory.cjs");
class BaseChatMemory extends base_js_1.BaseMemory {
    constructor(fields) {
        super();
        Object.defineProperty(this, "chatHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "returnMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chatHistory = fields?.chatHistory ?? new in_memory_js_1.ChatMessageHistory();
        this.returnMessages = fields?.returnMessages ?? this.returnMessages;
        this.inputKey = fields?.inputKey ?? this.inputKey;
        this.outputKey = fields?.outputKey ?? this.outputKey;
    }
    async saveContext(inputValues, outputValues) {
        // this is purposefully done in sequence so they're saved in order
        await this.chatHistory.addUserMessage((0, base_js_1.getInputValue)(inputValues, this.inputKey));
        await this.chatHistory.addAIChatMessage((0, base_js_1.getInputValue)(outputValues, this.outputKey));
    }
    async clear() {
        await this.chatHistory.clear();
    }
}
exports.BaseChatMemory = BaseChatMemory;
