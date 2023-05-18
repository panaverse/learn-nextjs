import { z } from "zod";
import { JsonMarkdownStructuredOutputParser } from "./structured.js";
export type RouterOutputParserInput = {
    defaultDestination?: string;
    interpolationDepth?: number;
};
export declare class RouterOutputParser<Y extends z.ZodTypeAny> extends JsonMarkdownStructuredOutputParser<Y> {
    defaultDestination: string;
    constructor(schema: Y, options?: RouterOutputParserInput);
    parse(text: string): Promise<z.infer<Y>>;
}
