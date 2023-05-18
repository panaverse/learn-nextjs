import { Configuration, OpenAIApi, ConfigurationParameters, CreateModerationResponseResultsInner } from "openai";
import { BaseChain, ChainInputs } from "./base.js";
import { ChainValues } from "../schema/index.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export interface OpenAIModerationChainInput extends ChainInputs, AsyncCallerParams {
    openAIApiKey?: string;
    openAIOrganization?: string;
    throwError?: boolean;
    configuration?: ConfigurationParameters;
}
export declare class OpenAIModerationChain extends BaseChain implements OpenAIModerationChainInput {
    inputKey: string;
    outputKey: string;
    openAIApiKey?: string;
    openAIOrganization?: string;
    clientConfig: Configuration;
    client: OpenAIApi;
    throwError: boolean;
    caller: AsyncCaller;
    constructor(fields?: OpenAIModerationChainInput);
    _moderate(text: string, results: CreateModerationResponseResultsInner): string;
    _call(values: ChainValues): Promise<ChainValues>;
    _chainType(): string;
    get inputKeys(): string[];
    get outputKeys(): string[];
}
