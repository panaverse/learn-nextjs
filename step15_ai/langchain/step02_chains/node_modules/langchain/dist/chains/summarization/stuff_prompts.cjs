"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_PROMPT = void 0;
/* eslint-disable spaced-comment */
const prompt_js_1 = require("../../prompts/prompt.cjs");
const template = `Write a concise summary of the following:


"{text}"


CONCISE SUMMARY:`;
exports.DEFAULT_PROMPT = new prompt_js_1.PromptTemplate({
    template,
    inputVariables: ["text"],
});
