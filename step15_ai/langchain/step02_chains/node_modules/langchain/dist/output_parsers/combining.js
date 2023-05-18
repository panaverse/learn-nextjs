import { BaseOutputParser } from "../schema/output_parser.js";
/**
 * Class to combine multiple output parsers
 * @augments BaseOutputParser
 */
export class CombiningOutputParser extends BaseOutputParser {
    constructor(...parsers) {
        super();
        Object.defineProperty(this, "parsers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputDelimiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "-----"
        });
        this.parsers = parsers;
    }
    async parse(input, callbacks) {
        const inputs = input
            .trim()
            .split(new RegExp(`${this.outputDelimiter}Output \\d+${this.outputDelimiter}`))
            .slice(1);
        const ret = {};
        for (const [i, p] of this.parsers.entries()) {
            let parsed;
            try {
                let extracted = inputs[i].includes("```")
                    ? inputs[i].trim().split(/```/)[1]
                    : inputs[i].trim();
                if (extracted.endsWith(this.outputDelimiter)) {
                    extracted = extracted.slice(0, -this.outputDelimiter.length);
                }
                parsed = await p.parse(extracted, callbacks);
            }
            catch (e) {
                parsed = await p.parse(input.trim(), callbacks);
            }
            Object.assign(ret, parsed);
        }
        return ret;
    }
    getFormatInstructions() {
        return `${[
            `Return the following ${this.parsers.length} outputs, each formatted as described below. Include the delimiter characters "${this.outputDelimiter}" in your response:`,
            ...this.parsers.map((p, i) => `${this.outputDelimiter}Output ${i + 1}${this.outputDelimiter}\n${p
                .getFormatInstructions()
                .trim()}\n${this.outputDelimiter}`),
        ].join("\n\n")}\n`;
    }
}
