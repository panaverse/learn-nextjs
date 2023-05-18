"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCreationChain = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
/** Chain to generate tasks. */
class TaskCreationChain extends llm_chain_js_1.LLMChain {
    static fromLLM(fields) {
        const taskCreationTemplate = `You are an task creation AI that uses the result of an execution agent` +
            ` to create new tasks with the following objective: {objective},` +
            ` The last completed task has the result: {result}.` +
            ` This result was based on this task description: {task_description}.` +
            ` These are incomplete tasks: {incomplete_tasks}.` +
            ` Based on the result, create new tasks to be completed` +
            ` by the AI system that do not overlap with incomplete tasks.` +
            ` Return the tasks as an array.`;
        const prompt = new prompt_js_1.PromptTemplate({
            template: taskCreationTemplate,
            inputVariables: [
                "result",
                "task_description",
                "incomplete_tasks",
                "objective",
            ],
        });
        return new TaskCreationChain({ prompt, ...fields });
    }
}
exports.TaskCreationChain = TaskCreationChain;
