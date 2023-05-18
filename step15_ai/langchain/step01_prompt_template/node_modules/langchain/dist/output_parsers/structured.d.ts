import { z } from "zod";
import { BaseOutputParser, FormatInstructionsOptions } from "../schema/output_parser.js";
export type JsonMarkdownStructuredOutputParserInput = {
    interpolationDepth?: number;
};
export interface JsonMarkdownFormatInstructionsOptions extends FormatInstructionsOptions {
    interpolationDepth?: number;
}
export declare class StructuredOutputParser<T extends z.ZodTypeAny> extends BaseOutputParser<z.infer<T>> {
    schema: T;
    constructor(schema: T);
    static fromZodSchema<T extends z.ZodTypeAny>(schema: T): StructuredOutputParser<T>;
    static fromNamesAndDescriptions<S extends {
        [key: string]: string;
    }>(schemas: S): StructuredOutputParser<z.ZodObject<{
        [k: string]: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        [x: string]: string;
    }, {
        [x: string]: string;
    }>>;
    getFormatInstructions(): string;
    parse(text: string): Promise<z.infer<T>>;
}
export declare class JsonMarkdownStructuredOutputParser<T extends z.ZodTypeAny> extends StructuredOutputParser<T> {
    getFormatInstructions(options?: JsonMarkdownFormatInstructionsOptions): string;
    private _schemaToInstruction;
}
