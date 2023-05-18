"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlanOutputParser = void 0;
const output_parser_js_1 = require("../../schema/output_parser.cjs");
const prompt_js_1 = require("./prompt.cjs");
class PlanOutputParser extends output_parser_js_1.BaseOutputParser {
    constructor() {
        super();
    }
    async parse(text) {
        return {
            steps: text
                .split(/\n\d+\.\s?/)
                .slice(1)
                .map((step) => ({ text: step.replace(`<END_OF_PLAN>`, "") })),
        };
    }
    getFormatInstructions() {
        return prompt_js_1.PLANNER_SYSTEM_PROMPT_MESSAGE_TEMPLATE;
    }
}
exports.PlanOutputParser = PlanOutputParser;
