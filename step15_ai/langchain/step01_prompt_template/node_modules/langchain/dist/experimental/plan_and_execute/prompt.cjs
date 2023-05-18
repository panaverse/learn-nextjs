"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE = exports.PLANNER_CHAT_PROMPT = exports.PLANNER_SYSTEM_PROMPT_MESSAGE_TEMPLATE = void 0;
const chat_js_1 = require("../../prompts/chat.cjs");
exports.PLANNER_SYSTEM_PROMPT_MESSAGE_TEMPLATE = [
    `Let's first understand the problem and devise a plan to solve the problem.`,
    `Please output the plan starting with the header "Plan:"`,
    `and then followed by a numbered list of steps.`,
    `Please make the plan the minimum number of steps required`,
    `to answer the query or complete the task accurately and precisely.`,
    `Your steps should be general, and should not require a specific method to solve a step. If the task is a question,`,
    `the final step in the plan must be the following: "Given the above steps taken,`,
    `please respond to the original query."`,
    `At the end of your plan, say "<END_OF_PLAN>"`,
].join(" ");
exports.PLANNER_CHAT_PROMPT = 
/* #__PURE__ */ chat_js_1.ChatPromptTemplate.fromPromptMessages([
    /* #__PURE__ */ chat_js_1.SystemMessagePromptTemplate.fromTemplate(exports.PLANNER_SYSTEM_PROMPT_MESSAGE_TEMPLATE),
    /* #__PURE__ */ chat_js_1.HumanMessagePromptTemplate.fromTemplate(`{input}`),
]);
exports.DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE = `Previous steps: {previous_steps}

Current objective: {current_step}

{agent_scratchpad}

You may extract and combine relevant data from your previous steps when responding to me.`;
