import { Tool } from "./base.js";
export type Json = string | number | boolean | null | {
    [key: string]: Json;
} | Json[];
export type JsonObject = {
    [key: string]: Json;
};
export declare class JsonSpec {
    obj: JsonObject;
    maxValueLength: number;
    constructor(obj: JsonObject, max_value_length?: number);
    getKeys(input: string): string;
    getValue(input: string): string;
}
export declare class JsonListKeysTool extends Tool {
    jsonSpec: JsonSpec;
    name: string;
    constructor(jsonSpec: JsonSpec);
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
export declare class JsonGetValueTool extends Tool {
    jsonSpec: JsonSpec;
    name: string;
    constructor(jsonSpec: JsonSpec);
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
