import { BaseRetriever } from "../../schema/index.js";
import { AsyncCaller, AsyncCallerParams } from "../../util/async_caller.js";
import { Document } from "../../document.js";
export type RemoteRetrieverAuth = false | {
    bearer: string;
};
export type RemoteRetrieverValues = Record<string, any>;
export interface RemoteRetrieverParams extends AsyncCallerParams {
    /**
     * The URL of the remote retriever server
     */
    url: string;
    /**
     * The authentication method to use, currently implemented is
     * - false: no authentication
     * - { bearer: string }: Bearer token authentication
     */
    auth: RemoteRetrieverAuth;
}
export declare abstract class RemoteRetriever extends BaseRetriever implements RemoteRetrieverParams {
    url: string;
    auth: RemoteRetrieverAuth;
    headers: Record<string, string>;
    asyncCaller: AsyncCaller;
    constructor({ url, auth, ...rest }: RemoteRetrieverParams);
    abstract createJsonBody(query: string): RemoteRetrieverValues;
    abstract processJsonResponse(json: RemoteRetrieverValues): Document[];
    getRelevantDocuments(query: string): Promise<Document[]>;
}
