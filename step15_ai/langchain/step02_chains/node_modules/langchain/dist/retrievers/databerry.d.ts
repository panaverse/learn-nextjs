import { BaseRetriever } from "../schema/index.js";
import { Document } from "../document.js";
import { AsyncCaller, AsyncCallerParams } from "../util/async_caller.js";
export interface DataberryRetrieverArgs extends AsyncCallerParams {
    datastoreUrl: string;
    topK?: number;
    apiKey?: string;
}
export declare class DataberryRetriever extends BaseRetriever {
    caller: AsyncCaller;
    datastoreUrl: string;
    topK?: number;
    apiKey?: string;
    constructor({ datastoreUrl, apiKey, topK, ...rest }: DataberryRetrieverArgs);
    getRelevantDocuments(query: string): Promise<Document[]>;
}
