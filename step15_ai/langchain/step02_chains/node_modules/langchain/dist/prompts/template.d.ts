import { InputValues } from "../schema/index.js";
export type TemplateFormat = "f-string" | "jinja2";
type ParsedFStringNode = {
    type: "literal";
    text: string;
} | {
    type: "variable";
    name: string;
};
export declare const parseFString: (template: string) => ParsedFStringNode[];
export declare const interpolateFString: (template: string, values: InputValues) => string;
type Interpolator = (template: string, values: InputValues) => string;
type Parser = (template: string) => ParsedFStringNode[];
export declare const DEFAULT_FORMATTER_MAPPING: Record<TemplateFormat, Interpolator>;
export declare const DEFAULT_PARSER_MAPPING: Record<TemplateFormat, Parser>;
export declare const renderTemplate: (template: string, templateFormat: TemplateFormat, inputValues: InputValues) => string;
export declare const parseTemplate: (template: string, templateFormat: TemplateFormat) => ParsedFStringNode[];
export declare const checkValidTemplate: (template: string, templateFormat: TemplateFormat, inputVariables: string[]) => void;
export {};
