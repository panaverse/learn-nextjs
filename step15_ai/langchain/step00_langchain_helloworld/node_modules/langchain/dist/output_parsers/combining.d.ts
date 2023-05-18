import { Callbacks } from "../callbacks/manager.js";
import { BaseOutputParser } from "../schema/output_parser.js";
export type CombinedOutput = Record<string, any>;
/**
 * Class to combine multiple output parsers
 * @augments BaseOutputParser
 */
export declare class CombiningOutputParser extends BaseOutputParser {
    parsers: BaseOutputParser[];
    outputDelimiter: string;
    constructor(...parsers: BaseOutputParser[]);
    parse(input: string, callbacks?: Callbacks): Promise<CombinedOutput>;
    getFormatInstructions(): string;
}
