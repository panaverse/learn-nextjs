import { BaseOutputParser } from "../../schema/output_parser.js";
import { AutoGPTAction } from "./schema.js";
export declare function preprocessJsonInput(inputStr: string): string;
export declare class AutoGPTOutputParser extends BaseOutputParser<AutoGPTAction> {
    getFormatInstructions(): string;
    parse(text: string): Promise<AutoGPTAction>;
}
