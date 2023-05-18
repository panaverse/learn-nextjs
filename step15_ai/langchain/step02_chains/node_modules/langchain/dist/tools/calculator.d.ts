import { Tool } from "./base.js";
export declare class Calculator extends Tool {
    name: string;
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
