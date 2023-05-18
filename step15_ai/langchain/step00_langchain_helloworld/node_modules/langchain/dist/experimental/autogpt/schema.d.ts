import { StructuredTool } from "../../tools/base.js";
export type ObjectTool = StructuredTool;
export declare const FINISH_NAME = "finish";
export interface AutoGPTAction {
    name: string;
    args: Record<string, any>;
}
