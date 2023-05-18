"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterOutputParser = void 0;
const structured_js_1 = require("./structured.cjs");
const output_parser_js_1 = require("../schema/output_parser.cjs");
class RouterOutputParser extends structured_js_1.JsonMarkdownStructuredOutputParser {
    constructor(schema, options) {
        super(schema);
        Object.defineProperty(this, "defaultDestination", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "DEFAULT"
        });
        this.defaultDestination =
            options?.defaultDestination ?? this.defaultDestination;
    }
    async parse(text) {
        try {
            const parsedText = await super.parse(text);
            if (parsedText.destination?.toLowerCase() ===
                this.defaultDestination.toLowerCase()) {
                parsedText.destination = null;
            }
            return parsedText;
        }
        catch (e) {
            throw new output_parser_js_1.OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
    }
}
exports.RouterOutputParser = RouterOutputParser;
