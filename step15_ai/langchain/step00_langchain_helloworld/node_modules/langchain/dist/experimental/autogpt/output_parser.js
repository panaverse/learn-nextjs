import { BaseOutputParser } from "../../schema/output_parser.js";
export function preprocessJsonInput(inputStr) {
    // Replace single backslashes with double backslashes,
    // while leaving already escaped ones intact
    const correctedStr = inputStr.replace(/(?<!\\)\\(?!["\\/bfnrt]|u[0-9a-fA-F]{4})/g, "\\\\");
    return correctedStr;
}
export class AutoGPTOutputParser extends BaseOutputParser {
    getFormatInstructions() {
        throw new Error("Method not implemented.");
    }
    async parse(text) {
        let parsed;
        try {
            parsed = JSON.parse(text);
        }
        catch (error) {
            const preprocessedText = preprocessJsonInput(text);
            try {
                parsed = JSON.parse(preprocessedText);
            }
            catch (error) {
                return {
                    name: "ERROR",
                    args: { error: `Could not parse invalid json: ${text}` },
                };
            }
        }
        try {
            return {
                name: parsed.command.name,
                args: parsed.command.args,
            };
        }
        catch (error) {
            return {
                name: "ERROR",
                args: { error: `Incomplete command args: ${parsed}` },
            };
        }
    }
}
