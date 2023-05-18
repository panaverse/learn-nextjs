import { Document } from "../../document.js";
import { RemoteRetriever, RemoteRetrieverParams, RemoteRetrieverValues } from "./base.js";
export interface RemoteLangChainRetrieverParams extends RemoteRetrieverParams {
    /**
     * The key in the JSON body to put the query in
     */
    inputKey?: string;
    /**
     * The key in the JSON response to get the response from
     */
    responseKey?: string;
    /**
     * The key in the JSON response to get the page content from
     */
    pageContentKey?: string;
    /**
     * The key in the JSON response to get the metadata from
     */
    metadataKey?: string;
}
export declare class RemoteLangChainRetriever extends RemoteRetriever implements RemoteLangChainRetrieverParams {
    inputKey: string;
    responseKey: string;
    pageContentKey: string;
    metadataKey: string;
    constructor({ inputKey, responseKey, pageContentKey, metadataKey, ...rest }: RemoteLangChainRetrieverParams);
    createJsonBody(query: string): RemoteRetrieverValues;
    processJsonResponse(json: RemoteRetrieverValues): Document[];
}
