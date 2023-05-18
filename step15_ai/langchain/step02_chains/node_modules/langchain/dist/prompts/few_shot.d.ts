import { BaseStringPromptTemplate, BasePromptTemplateInput, BaseExampleSelector } from "./base.js";
import { TemplateFormat } from "./template.js";
import { PromptTemplate } from "./prompt.js";
import { SerializedFewShotTemplate } from "./serde.js";
import { Example, InputValues, PartialValues } from "../schema/index.js";
export interface FewShotPromptTemplateInput extends BasePromptTemplateInput {
    /**
     * Examples to format into the prompt. Exactly one of this or
     * {@link exampleSelector} must be
     * provided.
     */
    examples?: Example[];
    /**
     * An {@link BaseExampleSelector} Examples to format into the prompt. Exactly one of this or
     * {@link examples} must be
     * provided.
     */
    exampleSelector?: BaseExampleSelector;
    /**
     * An {@link PromptTemplate} used to format a single example.
     */
    examplePrompt: PromptTemplate;
    /**
     * String separator used to join the prefix, the examples, and suffix.
     */
    exampleSeparator?: string;
    /**
     * A prompt template string to put before the examples.
     *
     * @defaultValue `""`
     */
    prefix?: string;
    /**
     * A prompt template string to put after the examples.
     */
    suffix?: string;
    /**
     * The format of the prompt template. Options are: 'f-string', 'jinja-2'
     */
    templateFormat?: TemplateFormat;
    /**
     * Whether or not to try validating the template on initialization.
     */
    validateTemplate?: boolean;
}
/**
 * Prompt template that contains few-shot examples.
 * @augments BasePromptTemplate
 * @augments FewShotPromptTemplateInput
 */
export declare class FewShotPromptTemplate extends BaseStringPromptTemplate implements FewShotPromptTemplateInput {
    examples?: InputValues[];
    exampleSelector?: BaseExampleSelector | undefined;
    examplePrompt: PromptTemplate;
    suffix: string;
    exampleSeparator: string;
    prefix: string;
    templateFormat: TemplateFormat;
    validateTemplate: boolean;
    constructor(input: FewShotPromptTemplateInput);
    _getPromptType(): "few_shot";
    private getExamples;
    partial(values: PartialValues): Promise<FewShotPromptTemplate>;
    format(values: InputValues): Promise<string>;
    serialize(): SerializedFewShotTemplate;
    static deserialize(data: SerializedFewShotTemplate): Promise<FewShotPromptTemplate>;
}
