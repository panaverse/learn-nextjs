import { BaseOutputParser } from "../schema/output_parser.js";
/**
 * Class to parse the output of an LLM call into a dictionary.
 * @augments BaseOutputParser
 */
export declare class RegexParser extends BaseOutputParser<Record<string, string>> {
    regex: string | RegExp;
    outputKeys: string[];
    defaultOutputKey?: string;
    constructor(regex: string | RegExp, outputKeys: string[], defaultOutputKey?: string);
    _type(): string;
    parse(text: string): Promise<Record<string, string>>;
    getFormatInstructions(): string;
}
