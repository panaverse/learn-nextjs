import { ChatPromptTemplate } from "../../prompts/chat.js";
export declare const PLANNER_SYSTEM_PROMPT_MESSAGE_TEMPLATE: string;
export declare const PLANNER_CHAT_PROMPT: ChatPromptTemplate;
export declare const DEFAULT_STEP_EXECUTOR_HUMAN_CHAT_MESSAGE_TEMPLATE = "Previous steps: {previous_steps}\n\nCurrent objective: {current_step}\n\n{agent_scratchpad}\n\nYou may extract and combine relevant data from your previous steps when responding to me.";
