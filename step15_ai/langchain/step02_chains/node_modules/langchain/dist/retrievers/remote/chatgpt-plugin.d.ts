import { Document } from "../../document.js";
import { RemoteRetriever, RemoteRetrieverParams, RemoteRetrieverValues } from "./base.js";
export interface ChatGPTPluginRetrieverFilter {
    document_id?: string;
    source?: string;
    source_id?: string;
    author?: string;
    start_date?: string;
    end_date?: string;
}
export interface ChatGPTPluginRetrieverParams extends RemoteRetrieverParams {
    /**
     * The number of results to request from the ChatGPTRetrievalPlugin server
     */
    topK?: number;
    /**
     * The filter to use when querying the ChatGPTRetrievalPlugin server
     */
    filter?: ChatGPTPluginRetrieverFilter;
}
export declare class ChatGPTPluginRetriever extends RemoteRetriever implements ChatGPTPluginRetrieverParams {
    topK: number;
    filter?: ChatGPTPluginRetrieverFilter;
    constructor({ topK, filter, ...rest }: ChatGPTPluginRetrieverParams);
    createJsonBody(query: string): RemoteRetrieverValues;
    processJsonResponse(json: RemoteRetrieverValues): Document[];
}
