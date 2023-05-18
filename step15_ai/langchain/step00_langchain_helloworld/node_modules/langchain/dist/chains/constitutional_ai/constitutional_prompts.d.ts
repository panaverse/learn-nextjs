import { FewShotPromptTemplate } from "../../prompts/few_shot.js";
import { PromptTemplate } from "../../prompts/prompt.js";
export declare const critiqueExample: PromptTemplate;
export declare const examples: {
    input_prompt: string;
    output_from_model: string;
    critique_request: string;
    critique: string;
    revision_request: string;
    revision: string;
}[];
export declare const CRITIQUE_PROMPT: FewShotPromptTemplate;
export declare const REVISION_PROMPT: FewShotPromptTemplate;
