import { BaseMemory, getInputValue, } from "./base.js";
import { ChatMessageHistory } from "../stores/message/in_memory.js";
export class BaseChatMemory extends BaseMemory {
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
        this.chatHistory = fields?.chatHistory ?? new ChatMessageHistory();
        this.returnMessages = fields?.returnMessages ?? this.returnMessages;
        this.inputKey = fields?.inputKey ?? this.inputKey;
        this.outputKey = fields?.outputKey ?? this.outputKey;
    }
    async saveContext(inputValues, outputValues) {
        // this is purposefully done in sequence so they're saved in order
        await this.chatHistory.addUserMessage(getInputValue(inputValues, this.inputKey));
        await this.chatHistory.addAIChatMessage(getInputValue(outputValues, this.outputKey));
    }
    async clear() {
        await this.chatHistory.clear();
    }
}
