"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROMPT_TEMPLATE = void 0;
const PROMPT_TEMPLATE = (noOutputStr) => `Given the following question and context, extract any part of the context *AS IS* that is relevant to answer the question. If none of the context is relevant return ${noOutputStr}.

Remember, *DO NOT* edit the extracted parts of the context.

> Question: {question}
> Context:
>>>
{context}
>>>
Extracted relevant parts:`;
exports.PROMPT_TEMPLATE = PROMPT_TEMPLATE;
