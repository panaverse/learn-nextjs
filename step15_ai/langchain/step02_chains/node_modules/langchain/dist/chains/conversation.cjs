"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationChain = exports.DEFAULT_TEMPLATE = void 0;
const llm_chain_js_1 = require("./llm_chain.cjs");
const prompt_js_1 = require("../prompts/prompt.cjs");
const buffer_memory_js_1 = require("../memory/buffer_memory.cjs");
exports.DEFAULT_TEMPLATE = `The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

Current conversation:
{history}
Human: {input}
AI:`;
class ConversationChain extends llm_chain_js_1.LLMChain {
    constructor({ prompt, outputKey, memory, ...rest }) {
        super({
            prompt: prompt ??
                new prompt_js_1.PromptTemplate({
                    template: exports.DEFAULT_TEMPLATE,
                    inputVariables: ["history", "input"],
                }),
            outputKey: outputKey ?? "response",
            memory: memory ?? new buffer_memory_js_1.BufferMemory(),
            ...rest,
        });
    }
}
exports.ConversationChain = ConversationChain;
