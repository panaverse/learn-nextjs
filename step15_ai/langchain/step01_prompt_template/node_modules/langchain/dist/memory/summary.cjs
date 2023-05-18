"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationSummaryMemory = void 0;
const llm_chain_js_1 = require("../chains/llm_chain.cjs");
const index_js_1 = require("../schema/index.cjs");
const base_js_1 = require("./base.cjs");
const chat_memory_js_1 = require("./chat_memory.cjs");
const prompt_js_1 = require("./prompt.cjs");
class ConversationSummaryMemory extends chat_memory_js_1.BaseChatMemory {
    constructor(fields) {
        const { returnMessages, inputKey, outputKey, chatHistory, humanPrefix, aiPrefix, llm, prompt, summaryChatMessageClass, } = fields;
        super({ returnMessages, inputKey, outputKey, chatHistory });
        Object.defineProperty(this, "buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: ""
        });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
        });
        Object.defineProperty(this, "humanPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Human"
        });
        Object.defineProperty(this, "aiPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "AI"
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "prompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: prompt_js_1.SUMMARY_PROMPT
        });
        Object.defineProperty(this, "summaryChatMessageClass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: index_js_1.SystemChatMessage
        });
        this.memoryKey = fields?.memoryKey ?? this.memoryKey;
        this.humanPrefix = humanPrefix ?? this.humanPrefix;
        this.aiPrefix = aiPrefix ?? this.aiPrefix;
        this.llm = llm;
        this.prompt = prompt ?? this.prompt;
        this.summaryChatMessageClass =
            summaryChatMessageClass ?? this.summaryChatMessageClass;
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    async predictNewSummary(messages, existingSummary) {
        const newLines = (0, base_js_1.getBufferString)(messages, this.humanPrefix, this.aiPrefix);
        const chain = new llm_chain_js_1.LLMChain({ llm: this.llm, prompt: this.prompt });
        return await chain.predict({
            summary: existingSummary,
            new_lines: newLines,
        });
    }
    async loadMemoryVariables(_) {
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: [new this.summaryChatMessageClass(this.buffer)],
            };
            return result;
        }
        const result = { [this.memoryKey]: this.buffer };
        return result;
    }
    async saveContext(inputValues, outputValues) {
        await super.saveContext(inputValues, outputValues);
        const messages = await this.chatHistory.getMessages();
        this.buffer = await this.predictNewSummary(messages.slice(-2), this.buffer);
    }
    async clear() {
        await super.clear();
        this.buffer = "";
    }
}
exports.ConversationSummaryMemory = ConversationSummaryMemory;
