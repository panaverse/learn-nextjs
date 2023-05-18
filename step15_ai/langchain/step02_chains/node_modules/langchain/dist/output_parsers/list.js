import { BaseOutputParser, OutputParserException, } from "../schema/output_parser.js";
/**
 * Class to parse the output of an LLM call to a list.
 * @augments BaseOutputParser
 */
export class ListOutputParser extends BaseOutputParser {
}
/**
 * Class to parse the output of an LLM call as a comma-separated list.
 * @augments ListOutputParser
 */
export class CommaSeparatedListOutputParser extends ListOutputParser {
    async parse(text) {
        try {
            return text
                .trim()
                .split(",")
                .map((s) => s.trim());
        }
        catch (e) {
            throw new OutputParserException(`Could not parse output: ${text}`, text);
        }
    }
    getFormatInstructions() {
        return `Your response should be a list of comma separated values, eg: \`foo, bar, baz\``;
    }
}
/**
 * Class to parse the output of an LLM call to a list with a specific length and separator.
 * @augments ListOutputParser
 */
export class CustomListOutputParser extends ListOutputParser {
    constructor({ length, separator }) {
        super();
        Object.defineProperty(this, "length", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "separator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.length = length;
        this.separator = separator || ",";
    }
    async parse(text) {
        try {
            const items = text
                .trim()
                .split(this.separator)
                .map((s) => s.trim());
            if (this.length !== undefined && items.length !== this.length) {
                throw new OutputParserException(`Incorrect number of items. Expected ${this.length}, got ${items.length}.`);
            }
            return items;
        }
        catch (e) {
            if (Object.getPrototypeOf(e) === OutputParserException.prototype) {
                throw e;
            }
            throw new OutputParserException(`Could not parse output: ${text}`);
        }
    }
    getFormatInstructions() {
        return `Your response should be a list of ${this.length} items separated by "${this.separator}" (eg: \`foo${this.separator} bar${this.separator} baz\`)`;
    }
}
