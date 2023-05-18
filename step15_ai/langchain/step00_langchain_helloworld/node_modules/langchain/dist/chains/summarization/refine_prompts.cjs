"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFINE_PROMPT = void 0;
const prompt_js_1 = require("../../prompts/prompt.cjs");
const refinePromptTemplate = `Your job is to produce a final summary
We have provided an existing summary up to a certain point: "{existing_answer}"
We have the opportunity to refine the existing summary
(only if needed) with some more context below.
------------
"{text}"
------------

Given the new context, refine the original summary
If the context isn't useful, return the original summary.

REFINED SUMMARY:`;
exports.REFINE_PROMPT = new prompt_js_1.PromptTemplate({
    template: refinePromptTemplate,
    inputVariables: ["existing_answer", "text"],
});
