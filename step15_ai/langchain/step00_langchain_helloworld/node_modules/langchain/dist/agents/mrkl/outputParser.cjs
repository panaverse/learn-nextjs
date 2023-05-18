"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZeroShotAgentOutputParser = exports.FINAL_ANSWER_ACTION = void 0;
const types_js_1 = require("../types.cjs");
const prompt_js_1 = require("./prompt.cjs");
exports.FINAL_ANSWER_ACTION = "Final Answer:";
class ZeroShotAgentOutputParser extends types_js_1.AgentActionOutputParser {
    constructor(fields) {
        super();
        Object.defineProperty(this, "finishToolName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.finishToolName = fields?.finishToolName || exports.FINAL_ANSWER_ACTION;
    }
    async parse(text) {
        if (text.includes(this.finishToolName)) {
            const parts = text.split(this.finishToolName);
            const output = parts[parts.length - 1].trim();
            return {
                returnValues: { output },
                log: text,
            };
        }
        const match = /Action: (.*)\nAction Input: (.*)/s.exec(text);
        if (!match) {
            throw new Error(`Could not parse LLM output: ${text}`);
        }
        return {
            tool: match[1].trim(),
            toolInput: match[2].trim().replace(/^"+|"+$/g, "") ?? "",
            log: text,
        };
    }
    getFormatInstructions() {
        return prompt_js_1.FORMAT_INSTRUCTIONS;
    }
}
exports.ZeroShotAgentOutputParser = ZeroShotAgentOutputParser;
