import { Tool } from "./base.js";
export interface Headers {
    [key: string]: string;
}
export interface RequestTool {
    headers: Headers;
    maxOutputLength: number;
}
export declare class RequestsGetTool extends Tool implements RequestTool {
    headers: Headers;
    name: string;
    maxOutputLength: number;
    constructor(headers?: Headers, { maxOutputLength }?: {
        maxOutputLength?: number;
    });
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
export declare class RequestsPostTool extends Tool implements RequestTool {
    headers: Headers;
    name: string;
    maxOutputLength: number;
    constructor(headers?: Headers, { maxOutputLength }?: {
        maxOutputLength?: number;
    });
    /** @ignore */
    _call(input: string): Promise<string>;
    description: string;
}
