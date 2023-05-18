import { Tool } from "./base.js";
export interface AIPluginToolParams {
    name: string;
    description: string;
    apiSpec: string;
}
export declare class AIPluginTool extends Tool implements AIPluginToolParams {
    private _name;
    private _description;
    apiSpec: string;
    get name(): string;
    get description(): string;
    constructor(params: AIPluginToolParams);
    /** @ignore */
    _call(_input: string): Promise<string>;
    static fromPluginUrl(url: string): Promise<AIPluginTool>;
}
