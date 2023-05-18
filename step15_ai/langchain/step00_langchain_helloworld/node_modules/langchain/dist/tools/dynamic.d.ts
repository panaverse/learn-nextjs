import { CallbackManagerForToolRun, Callbacks } from "../callbacks/manager.js";
import { Tool } from "./base.js";
export interface DynamicToolInput {
    name: string;
    description: string;
    func: (input: string, runManager?: CallbackManagerForToolRun) => Promise<string>;
    returnDirect?: boolean;
    verbose?: boolean;
    callbacks?: Callbacks;
}
/**
 * A tool that can be created dynamically from a function, name, and description.
 */
export declare class DynamicTool extends Tool {
    name: string;
    description: string;
    func: DynamicToolInput["func"];
    constructor(fields: DynamicToolInput);
    /** @ignore */
    _call(input: string, runManager?: CallbackManagerForToolRun): Promise<string>;
}
