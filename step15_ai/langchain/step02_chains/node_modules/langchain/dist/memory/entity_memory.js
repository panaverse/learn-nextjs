import { BaseChatMemory } from "./chat_memory.js";
import { ENTITY_EXTRACTION_PROMPT, ENTITY_SUMMARIZATION_PROMPT, } from "./prompt.js";
import { getBufferString, getPromptInputKey, } from "./base.js";
import { LLMChain } from "../chains/llm_chain.js";
import { InMemoryEntityStore } from "./stores/entity/in_memory.js";
// Entity extractor & summarizer to memory.
export class EntityMemory extends BaseChatMemory {
    constructor(fields) {
        super({
            chatHistory: fields.chatHistory,
            returnMessages: fields.returnMessages ?? false,
            inputKey: fields.inputKey,
            outputKey: fields.outputKey,
        });
        Object.defineProperty(this, "entityExtractionChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entitySummarizationChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entityStore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entityCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "k", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3
        });
        Object.defineProperty(this, "chatHistoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
        });
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "entitiesKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "entities"
        });
        Object.defineProperty(this, "humanPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "aiPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llm = fields.llm;
        this.humanPrefix = fields.humanPrefix;
        this.aiPrefix = fields.aiPrefix;
        this.chatHistoryKey = fields.chatHistoryKey ?? this.chatHistoryKey;
        this.entitiesKey = fields.entitiesKey ?? this.entitiesKey;
        this.entityExtractionChain = new LLMChain({
            llm: this.llm,
            prompt: fields.entityExtractionPrompt ?? ENTITY_EXTRACTION_PROMPT,
        });
        this.entitySummarizationChain = new LLMChain({
            llm: this.llm,
            prompt: fields.entitySummarizationPrompt ?? ENTITY_SUMMARIZATION_PROMPT,
        });
        this.entityStore = fields.entityStore ?? new InMemoryEntityStore();
        this.entityCache = fields.entityCache ?? this.entityCache;
        this.k = fields.k ?? this.k;
    }
    get memoryKeys() {
        return [this.chatHistoryKey];
    }
    // Will always return list of memory variables.
    get memoryVariables() {
        return [this.entitiesKey, this.chatHistoryKey];
    }
    // Return history buffer.
    async loadMemoryVariables(inputs) {
        const promptInputKey = this.inputKey ?? getPromptInputKey(inputs, this.memoryVariables);
        const messages = await this.chatHistory.getMessages();
        const serializedMessages = getBufferString(messages.slice(-this.k * 2), this.humanPrefix, this.aiPrefix);
        const output = await this.entityExtractionChain.predict({
            history: serializedMessages,
            input: inputs[promptInputKey],
        });
        const entities = output.trim() === "NONE" ? [] : output.split(",").map((w) => w.trim());
        const entitySummaries = {};
        for (const entity of entities) {
            entitySummaries[entity] = await this.entityStore.get(entity, "No current information known.");
        }
        this.entityCache = [...entities];
        const buffer = this.returnMessages
            ? messages.slice(-this.k * 2)
            : serializedMessages;
        return {
            [this.chatHistoryKey]: buffer,
            [this.entitiesKey]: entitySummaries,
        };
    }
    // Save context from this conversation to buffer.
    async saveContext(inputs, outputs) {
        await super.saveContext(inputs, outputs);
        const promptInputKey = this.inputKey ?? getPromptInputKey(inputs, this.memoryVariables);
        const messages = await this.chatHistory.getMessages();
        const serializedMessages = getBufferString(messages.slice(-this.k * 2), this.humanPrefix, this.aiPrefix);
        const inputData = inputs[promptInputKey];
        for (const entity of this.entityCache) {
            const existingSummary = await this.entityStore.get(entity, "No current information known.");
            const output = await this.entitySummarizationChain.predict({
                summary: existingSummary,
                entity,
                history: serializedMessages,
                input: inputData,
            });
            if (output.trim() !== "UNCHANGED") {
                await this.entityStore.set(entity, output.trim());
            }
        }
    }
    // Clear memory contents.
    async clear() {
        await super.clear();
        await this.entityStore.clear();
    }
}
