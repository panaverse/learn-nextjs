"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskExecutionChain = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
/** Chain to execute tasks. */
class TaskExecutionChain extends llm_chain_js_1.LLMChain {
    static fromLLM(fields) {
        const executionTemplate = `You are an AI who performs one task based on the following objective: ` +
            `{objective}.` +
            `Take into account these previously completed tasks: {context}.` +
            ` Your task: {task}. Response:`;
        const prompt = new prompt_js_1.PromptTemplate({
            template: executionTemplate,
            inputVariables: ["objective", "context", "task"],
        });
        return new TaskExecutionChain({ prompt, ...fields });
    }
}
exports.TaskExecutionChain = TaskExecutionChain;
