"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QA_PROMPT_SELECTOR = exports.DEFAULT_QA_PROMPT = void 0;
/* eslint-disable spaced-comment */
const prompt_js_1 = require("../../prompts/prompt.cjs");
const chat_js_1 = require("../../prompts/chat.cjs");
const conditional_js_1 = require("../../prompts/selectors/conditional.cjs");
exports.DEFAULT_QA_PROMPT = new prompt_js_1.PromptTemplate({
    template: "Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.\n\n{context}\n\nQuestion: {question}\nHelpful Answer:",
    inputVariables: ["context", "question"],
});
const system_template = `Use the following pieces of context to answer the users question. 
If you don't know the answer, just say that you don't know, don't try to make up an answer.
----------------
{context}`;
const messages = [
    /*#__PURE__*/ chat_js_1.SystemMessagePromptTemplate.fromTemplate(system_template),
    /*#__PURE__*/ chat_js_1.HumanMessagePromptTemplate.fromTemplate("{question}"),
];
const CHAT_PROMPT = 
/*#__PURE__*/ chat_js_1.ChatPromptTemplate.fromPromptMessages(messages);
exports.QA_PROMPT_SELECTOR = new conditional_js_1.ConditionalPromptSelector(exports.DEFAULT_QA_PROMPT, [[conditional_js_1.isChatModel, CHAT_PROMPT]]);
