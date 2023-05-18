import { BaseStringPromptTemplate, BasePromptTemplateInput } from "./base.js";
import { TemplateFormat } from "./template.js";
import { SerializedPromptTemplate } from "./serde.js";
import { InputValues, PartialValues } from "../schema/index.js";
/**
 * Inputs to create a {@link PromptTemplate}
 * @augments BasePromptTemplateInput
 */
export interface PromptTemplateInput extends BasePromptTemplateInput {
    /**
     * The prompt template
     */
    template: string;
    /**
     * The format of the prompt template. Options are 'f-string', 'jinja-2'
     *
     * @defaultValue 'f-string'
     */
    templateFormat?: TemplateFormat;
    /**
     * Whether or not to try validating the template on initialization
     *
     * @defaultValue `true`
     */
    validateTemplate?: boolean;
}
/**
 * Schema to represent a basic prompt for an LLM.
 * @augments BasePromptTemplate
 * @augments PromptTemplateInput
 *
 * @example
 * ```ts
 * import { PromptTemplate } from "langchain/prompts";
 *
 * const prompt = new PromptTemplate({
 *   inputVariables: ["foo"],
 *   template: "Say {foo}",
 * });
 * ```
 */
export declare class PromptTemplate extends BaseStringPromptTemplate implements PromptTemplateInput {
    template: string;
    templateFormat: TemplateFormat;
    validateTemplate: boolean;
    constructor(input: PromptTemplateInput);
    _getPromptType(): "prompt";
    format(values: InputValues): Promise<string>;
    /**
     * Take examples in list format with prefix and suffix to create a prompt.
     *
     * Intendend to be used a a way to dynamically create a prompt from examples.
     *
     * @param examples - List of examples to use in the prompt.
     * @param suffix - String to go after the list of examples. Should generally set up the user's input.
     * @param inputVariables - A list of variable names the final prompt template will expect
     * @param exampleSeparator - The separator to use in between examples
     * @param prefix - String that should go before any examples. Generally includes examples.
     *
     * @returns The final prompt template generated.
     */
    static fromExamples(examples: string[], suffix: string, inputVariables: string[], exampleSeparator?: string, prefix?: string): PromptTemplate;
    /**
     * Load prompt template from a template f-string
     */
    static fromTemplate(template: string, { templateFormat, ...rest }?: Omit<PromptTemplateInput, "template" | "inputVariables">): PromptTemplate;
    partial(values: PartialValues): Promise<PromptTemplate>;
    serialize(): SerializedPromptTemplate;
    static deserialize(data: SerializedPromptTemplate): Promise<PromptTemplate>;
}
