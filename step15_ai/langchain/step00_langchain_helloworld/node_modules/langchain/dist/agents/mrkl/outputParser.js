import { AgentActionOutputParser } from "../types.js";
import { FORMAT_INSTRUCTIONS } from "./prompt.js";
export const FINAL_ANSWER_ACTION = "Final Answer:";
export class ZeroShotAgentOutputParser extends AgentActionOutputParser {
    constructor(fields) {
        super();
        Object.defineProperty(this, "finishToolName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.finishToolName = fields?.finishToolName || FINAL_ANSWER_ACTION;
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
        return FORMAT_INSTRUCTIONS;
    }
}
