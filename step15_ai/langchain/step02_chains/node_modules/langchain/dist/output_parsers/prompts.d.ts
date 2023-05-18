import { PromptTemplate } from "../prompts/prompt.js";
export declare const NAIVE_FIX_TEMPLATE = "Instructions:\n--------------\n{instructions}\n--------------\nCompletion:\n--------------\n{completion}\n--------------\n\nAbove, the Completion did not satisfy the constraints given in the Instructions.\nError:\n--------------\n{error}\n--------------\n\nPlease try again. Please only respond with an answer that satisfies the constraints laid out in the Instructions:";
export declare const NAIVE_FIX_PROMPT: PromptTemplate;
