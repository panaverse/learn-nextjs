import { JsonMarkdownStructuredOutputParser } from "./structured.js";
import { OutputParserException } from "../schema/output_parser.js";
export class RouterOutputParser extends JsonMarkdownStructuredOutputParser {
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
            throw new OutputParserException(`Failed to parse. Text: "${text}". Error: ${e}`, text);
        }
    }
}
