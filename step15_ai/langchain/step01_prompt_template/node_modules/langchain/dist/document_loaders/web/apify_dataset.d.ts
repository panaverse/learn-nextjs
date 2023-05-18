import { ApifyClient, ApifyClientOptions, ActorCallOptions } from "apify-client";
import { Document } from "../../document.js";
import { BaseDocumentLoader, DocumentLoader } from "../base.js";
export type ApifyDatasetMappingFunction = (item: Record<string | number, unknown>) => Document;
export declare class ApifyDatasetLoader extends BaseDocumentLoader implements DocumentLoader {
    protected apifyClient: ApifyClient;
    protected datasetId: string;
    protected datasetMappingFunction: (item: Record<string | number, unknown>) => Document;
    constructor(datasetId: string, config: {
        datasetMappingFunction: ApifyDatasetMappingFunction;
        clientOptions?: ApifyClientOptions;
    });
    private static _getApifyApiToken;
    load(): Promise<Document[]>;
    /**
     * Create an ApifyDatasetLoader by calling an Actor on the Apify platform and waiting for its results to be ready.
     * @param actorId The ID or name of the Actor on the Apify platform.
     * @param input The input object of the Actor that you're trying to run.
     * @param options Options specifying settings for the Actor run.
     * @param options.datasetMappingFunction A function that takes a single object (an Apify dataset item) and converts it to an instance of the Document class.
     * @returns An instance of `ApifyDatasetLoader` with the results from the Actor run.
     */
    static fromActorCall(actorId: string, input: Record<string | number, unknown>, config: {
        callOptions?: ActorCallOptions;
        clientOptions?: ApifyClientOptions;
        datasetMappingFunction: ApifyDatasetMappingFunction;
    }): Promise<ApifyDatasetLoader>;
}
