import { AxiosRequestConfig } from "axios";
import { BaseLanguageModel } from "../base_language/index.js";
import { Tool, ToolParams } from "./base.js";
import { CallbackManager, CallbackManagerForToolRun } from "../callbacks/manager.js";
import { Embeddings } from "../embeddings/base.js";
export declare const parseInputs: (inputs: string) => [string, string];
export declare const getText: (html: string, baseUrl: string, summary: boolean) => string;
type Headers = Record<string, any>;
export interface WebBrowserArgs extends ToolParams {
    model: BaseLanguageModel;
    embeddings: Embeddings;
    headers?: Headers;
    axiosConfig?: Omit<AxiosRequestConfig, "url">;
    /** @deprecated */
    callbackManager?: CallbackManager;
}
export declare class WebBrowser extends Tool {
    private model;
    private embeddings;
    private headers;
    private axiosConfig;
    constructor({ model, headers, embeddings, verbose, callbacks, callbackManager, axiosConfig, }: WebBrowserArgs);
    /** @ignore */
    _call(inputs: string, runManager?: CallbackManagerForToolRun): Promise<string>;
    name: string;
    description: string;
}
export {};
