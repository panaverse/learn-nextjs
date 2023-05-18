"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskPrioritizationChain = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
/** Chain to prioritize tasks. */
class TaskPrioritizationChain extends llm_chain_js_1.LLMChain {
    static fromLLM(fields) {
        const taskPrioritizationTemplate = `You are a task prioritization AI tasked with cleaning the formatting of ` +
            `and reprioritizing the following tasks: {task_names}.` +
            ` Consider the ultimate objective of your team: {objective}.` +
            ` Do not remove any tasks. Return the result as a numbered list, like:` +
            ` #. First task` +
            ` #. Second task` +
            ` Start the task list with number {next_task_id}.`;
        const prompt = new prompt_js_1.PromptTemplate({
            template: taskPrioritizationTemplate,
            inputVariables: ["task_names", "next_task_id", "objective"],
        });
        return new TaskPrioritizationChain({ prompt, ...fields });
    }
}
exports.TaskPrioritizationChain = TaskPrioritizationChain;
