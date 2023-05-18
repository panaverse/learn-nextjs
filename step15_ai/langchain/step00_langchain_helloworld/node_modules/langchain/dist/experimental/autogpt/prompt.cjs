"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoGPTPrompt = void 0;
const chat_js_1 = require("../../prompts/chat.cjs");
const index_js_1 = require("../../schema/index.cjs");
const prompt_generator_js_1 = require("./prompt_generator.cjs");
class AutoGPTPrompt extends chat_js_1.BaseChatPromptTemplate {
    constructor(fields) {
        super({ inputVariables: ["goals", "memory", "messages", "user_input"] });
        Object.defineProperty(this, "aiName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "aiRole", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tokenCounter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sendTokenLimit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.aiName = fields.aiName;
        this.aiRole = fields.aiRole;
        this.tools = fields.tools;
        this.tokenCounter = fields.tokenCounter;
        this.sendTokenLimit = fields.sendTokenLimit || 4196;
    }
    _getPromptType() {
        return "autogpt";
    }
    constructFullPrompt(goals) {
        const promptStart = `Your decisions must always be made independently 
            without seeking user assistance. Play to your strengths 
            as an LLM and pursue simple strategies with no legal complications. 
            If you have completed all your tasks, 
            make sure to use the "finish" command.`;
        let fullPrompt = `You are ${this.aiName}, ${this.aiRole}\n${promptStart}\n\nGOALS:\n\n`;
        goals.forEach((goal, index) => {
            fullPrompt += `${index + 1}. ${goal}\n`;
        });
        fullPrompt += `\n\n${(0, prompt_generator_js_1.getPrompt)(this.tools)}`;
        return fullPrompt;
    }
    async formatMessages({ goals, memory, messages: previousMessages, user_input, }) {
        const basePrompt = new index_js_1.SystemChatMessage(this.constructFullPrompt(goals));
        const timePrompt = new index_js_1.SystemChatMessage(`The current time and date is ${new Date().toLocaleString()}`);
        const usedTokens = (await this.tokenCounter(basePrompt.text)) +
            (await this.tokenCounter(timePrompt.text));
        const relevantDocs = await memory.getRelevantDocuments(JSON.stringify(previousMessages.slice(-10)));
        const relevantMemory = relevantDocs.map((d) => d.pageContent);
        let relevantMemoryTokens = await relevantMemory.reduce(async (acc, doc) => (await acc) + (await this.tokenCounter(doc)), Promise.resolve(0));
        while (usedTokens + relevantMemoryTokens > 2500) {
            relevantMemory.pop();
            relevantMemoryTokens = await relevantMemory.reduce(async (acc, doc) => (await acc) + (await this.tokenCounter(doc)), Promise.resolve(0));
        }
        const contentFormat = `This reminds you of these events from your past:\n${relevantMemory.join("\n")}\n\n`;
        const memoryMessage = new index_js_1.SystemChatMessage(contentFormat);
        const usedTokensWithMemory = (await usedTokens) + (await this.tokenCounter(memoryMessage.text));
        const historicalMessages = [];
        for (const message of previousMessages.slice(-10).reverse()) {
            const messageTokens = await this.tokenCounter(message.text);
            if (usedTokensWithMemory + messageTokens > this.sendTokenLimit - 1000) {
                break;
            }
            historicalMessages.unshift(message);
        }
        const inputMessage = new index_js_1.HumanChatMessage(user_input);
        const messages = [
            basePrompt,
            timePrompt,
            memoryMessage,
            ...historicalMessages,
            inputMessage,
        ];
        return messages;
    }
    async partial(_values) {
        throw new Error("Method not implemented.");
    }
    serialize() {
        throw new Error("Method not implemented.");
    }
}
exports.AutoGPTPrompt = AutoGPTPrompt;
