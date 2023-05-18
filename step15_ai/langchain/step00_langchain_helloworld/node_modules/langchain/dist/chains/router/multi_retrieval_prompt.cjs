"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE = exports.MULTI_RETRIEVAL_ROUTER_TEMPLATE = void 0;
exports.MULTI_RETRIEVAL_ROUTER_TEMPLATE = `Given a query to a question answering system, select the system best suited for the input. You will be given the names of the available systems and a description of what questions the system is best suited for. You may also revise the original input if you think that revising it will ultimately lead to a better response.

<< FORMATTING >>
Return a markdown code snippet with a JSON object formatted to look like:
\`\`\`json
{{{{
    "destination": string \\ name of the question answering system to use or "DEFAULT"
    "next_inputs": string \\ a potentially modified version of the original input
}}}}
\`\`\`

REMEMBER: "destination" MUST be one of the candidate prompt names specified below OR it can be "DEFAULT" if the input is not well suited for any of the candidate prompts.
REMEMBER: "next_inputs" can just be the original input if you don't think any modifications are needed.

<< CANDIDATE PROMPTS >>
{destinations}

<< INPUT >>
{{input}}

<< OUTPUT >>
`;
const STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE = (formatting) => `Given a query to a question answering system, select the system best suited for the input. You will be given the names of the available systems and a description of what questions the system is best suited for. You may also revise the original input if you think that revising it will ultimately lead to a better response.

<< FORMATTING >>
${formatting}

REMEMBER: "destination" MUST be one of the candidate prompt names specified below OR it can be "DEFAULT" if the input is not well suited for any of the candidate prompts.
REMEMBER: "next_inputs.query" can just be the original input if you don't think any modifications are needed.

<< CANDIDATE PROMPTS >>
{destinations}

<< INPUT >>
{{input}}

<< OUTPUT >>
`;
exports.STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE = STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE;
