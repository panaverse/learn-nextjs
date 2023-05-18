import { z } from "zod";
import { BaseFileStore } from "../schema/index.js";
import { StructuredTool, ToolParams } from "./base.js";
interface ReadFileParams extends ToolParams {
    store: BaseFileStore;
}
export declare class ReadFileTool extends StructuredTool {
    schema: z.ZodObject<{
        file_path: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        file_path: string;
    }, {
        file_path: string;
    }>;
    name: string;
    description: string;
    store: BaseFileStore;
    constructor({ store, ...rest }: ReadFileParams);
    _call({ file_path }: z.infer<typeof this.schema>): Promise<string>;
}
interface WriteFileParams extends ToolParams {
    store: BaseFileStore;
}
export declare class WriteFileTool extends StructuredTool {
    schema: z.ZodObject<{
        file_path: z.ZodString;
        text: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        text: string;
        file_path: string;
    }, {
        text: string;
        file_path: string;
    }>;
    name: string;
    description: string;
    store: BaseFileStore;
    constructor({ store, ...rest }: WriteFileParams);
    _call({ file_path, text }: z.infer<typeof this.schema>): Promise<string>;
}
export {};
