import { Tool } from "./base.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export type ZapierValues = Record<string, any>;
export interface ZapiterNLAWrapperParams extends AsyncCallerParams {
    apiKey?: string;
}
export declare class ZapierNLAWrapper {
    zapierNlaApiKey: string;
    zapierNlaApiBase: string;
    caller: AsyncCaller;
    constructor(params?: string | ZapiterNLAWrapperParams);
    protected _getHeaders(): Record<string, string>;
    protected _getActionRequest(actionId: string, instructions: string, params?: ZapierValues): Promise<ZapierValues>;
    /**
     * Executes an action that is identified by action_id, must be exposed
     * (enabled) by the current user (associated with the set api_key). Change
     * your exposed actions here: https://nla.zapier.com/demo/start/
     * @param actionId
     * @param instructions
     * @param params
     */
    runAction(actionId: string, instructions: string, params?: ZapierValues): Promise<ZapierValues>;
    /**
     * Same as run, but instead of actually executing the action, will
     * instead return a preview of params that have been guessed by the AI in
     * case you need to explicitly review before executing.
     * @param actionId
     * @param instructions
     * @param params
     */
    previewAction(actionId: string, instructions: string, params?: ZapierValues): Promise<ZapierValues>;
    /**
     * Returns a list of all exposed (enabled) actions associated with
     * current user (associated with the set api_key). Change your exposed
     * actions here: https://nla.zapier.com/demo/start/
     */
    listActions(): Promise<ZapierValues[]>;
    /**
     * Same as run, but returns a stringified version of the result.
     * @param actionId
     * @param instructions
     * @param params
     */
    runAsString(actionId: string, instructions: string, params?: ZapierValues): Promise<string>;
    /**
     * Same as preview, but returns a stringified version of the result.
     * @param actionId
     * @param instructions
     * @param params
     */
    previewAsString(actionId: string, instructions: string, params?: ZapierValues): Promise<string>;
    /**
     * Same as list, but returns a stringified version of the result.
     */
    listActionsAsString(): Promise<string>;
}
export declare class ZapierNLARunAction extends Tool {
    apiWrapper: ZapierNLAWrapper;
    actionId: string;
    params?: ZapierValues;
    name: string;
    description: string;
    constructor(apiWrapper: ZapierNLAWrapper, actionId: string, zapierDescription: string, paramsSchema: ZapierValues, params?: ZapierValues);
    /** @ignore */
    _call(arg: string): Promise<string>;
}
