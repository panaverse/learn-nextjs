import { BaseChatMemory } from "./chat_memory.js";
import { getBufferString, getInputValue, } from "./base.js";
import { AsyncCaller } from "../util/async_caller.js";
export class MotorheadMemory extends BaseChatMemory {
    constructor(fields) {
        const { sessionId, motorheadURL, memoryKey, timeout, returnMessages, inputKey, outputKey, chatHistory, ...rest } = fields;
        super({ returnMessages, inputKey, outputKey, chatHistory });
        Object.defineProperty(this, "motorheadURL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "localhost:8080"
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 3000
        });
        Object.defineProperty(this, "memoryKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "history"
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new AsyncCaller(rest);
        this.sessionId = sessionId;
        this.motorheadURL = motorheadURL ?? this.motorheadURL;
        this.memoryKey = memoryKey ?? this.memoryKey;
        this.timeout = timeout ?? this.timeout;
    }
    get memoryKeys() {
        return [this.memoryKey];
    }
    async init() {
        const res = await this.caller.call(fetch, `${this.motorheadURL}/sessions/${this.sessionId}/memory`, {
            signal: this.timeout ? AbortSignal.timeout(this.timeout) : undefined,
            headers: {
                "Content-Type": "application/json",
            },
        });
        const { messages = [], context = "NONE" } = await res.json();
        await Promise.all(messages.reverse().map(async (message) => {
            if (message.role === "AI") {
                await this.chatHistory.addAIChatMessage(message.content);
            }
            else {
                await this.chatHistory.addUserMessage(message.content);
            }
        }));
        if (context && context !== "NONE") {
            this.context = context;
        }
    }
    async loadMemoryVariables(_values) {
        const messages = await this.chatHistory.getMessages();
        if (this.returnMessages) {
            const result = {
                [this.memoryKey]: messages,
            };
            return result;
        }
        const result = {
            [this.memoryKey]: getBufferString(messages),
        };
        return result;
    }
    async saveContext(inputValues, outputValues) {
        const input = getInputValue(inputValues, this.inputKey);
        const output = getInputValue(outputValues, this.outputKey);
        await Promise.all([
            this.caller.call(fetch, `${this.motorheadURL}/sessions/${this.sessionId}/memory`, {
                signal: this.timeout ? AbortSignal.timeout(this.timeout) : undefined,
                method: "POST",
                body: JSON.stringify({
                    messages: [
                        { role: "Human", content: `${input}` },
                        { role: "AI", content: `${output}` },
                    ],
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }),
            super.saveContext(inputValues, outputValues),
        ]);
    }
}
