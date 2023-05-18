"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAgentOutputParser = exports.FINAL_ANSWER_ACTION = void 0;
const types_js_1 = require("../types.cjs");
const prompt_js_1 = require("./prompt.cjs");
exports.FINAL_ANSWER_ACTION = "Final Answer:";
class ChatAgentOutputParser extends types_js_1.AgentActionOutputParser {
    async parse(text) {
        if (text.includes(exports.FINAL_ANSWER_ACTION) || !text.includes(`"action":`)) {
            const parts = text.split(exports.FINAL_ANSWER_ACTION);
            const output = parts[parts.length - 1].trim();
            return { returnValues: { output }, log: text };
        }
        const action = text.includes("```")
            ? text.trim().split(/```(?:json)?/)[1]
            : text.trim();
        try {
            const response = JSON.parse(action.trim());
            return {
                tool: response.action,
                toolInput: response.action_input,
                log: text,
            };
        }
        catch {
            throw new Error(`Unable to parse JSON response from chat agent.\n\n${text}`);
        }
    }
    getFormatInstructions() {
        return prompt_js_1.FORMAT_INSTRUCTIONS;
    }
}
exports.ChatAgentOutputParser = ChatAgentOutputParser;
