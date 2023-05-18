import { z } from "zod";
import { CallbackManagerForToolRun, Callbacks } from "../callbacks/manager.js";
import { BaseLangChain, BaseLangChainParams } from "../base_language/index.js";
export interface ToolParams extends BaseLangChainParams {
}
/**
 * Base class for Tools that accept input of any shape defined by a Zod schema.
 */
export declare abstract class StructuredTool<T extends z.ZodObject<any, any, any, any> = z.ZodObject<any, any, any, any>> extends BaseLangChain {
    abstract schema: T | z.ZodEffects<T>;
    constructor(fields?: ToolParams);
    protected abstract _call(arg: z.output<T>, runManager?: CallbackManagerForToolRun): Promise<string>;
    call(arg: (z.output<T> extends string ? string : never) | z.input<T>, callbacks?: Callbacks): Promise<string>;
    abstract name: string;
    abstract description: string;
    returnDirect: boolean;
}
/**
 * Base class for Tools that accept input as a string.
 */
export declare abstract class Tool extends StructuredTool {
    schema: z.ZodEffects<z.ZodObject<{
        input: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        input?: string | undefined;
    }, {
        input?: string | undefined;
    }>, string | undefined, {
        input?: string | undefined;
    }>;
    constructor(verbose?: boolean, callbacks?: Callbacks);
    call(arg: string | undefined | z.input<this["schema"]>, callbacks?: Callbacks): Promise<string>;
}
