import { ApifyClient, } from "apify-client";
import { BaseDocumentLoader } from "../base.js";
export class ApifyDatasetLoader extends BaseDocumentLoader {
    constructor(datasetId, config) {
        super();
        Object.defineProperty(this, "apifyClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datasetId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "datasetMappingFunction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apifyApiToken = ApifyDatasetLoader._getApifyApiToken(config.clientOptions);
        this.apifyClient = new ApifyClient({
            ...config.clientOptions,
            token: apifyApiToken,
        });
        this.datasetId = datasetId;
        this.datasetMappingFunction = config.datasetMappingFunction;
    }
    static _getApifyApiToken(config) {
        return (config?.token ??
            // eslint-disable-next-line no-process-env
            (typeof process !== "undefined" ? process.env.APIFY_API_TOKEN : undefined));
    }
    async load() {
        const datasetItems = (await this.apifyClient.dataset(this.datasetId).listItems({ clean: true })).items;
        return datasetItems.map(this.datasetMappingFunction);
    }
    /**
     * Create an ApifyDatasetLoader by calling an Actor on the Apify platform and waiting for its results to be ready.
     * @param actorId The ID or name of the Actor on the Apify platform.
     * @param input The input object of the Actor that you're trying to run.
     * @param options Options specifying settings for the Actor run.
     * @param options.datasetMappingFunction A function that takes a single object (an Apify dataset item) and converts it to an instance of the Document class.
     * @returns An instance of `ApifyDatasetLoader` with the results from the Actor run.
     */
    static async fromActorCall(actorId, input, config) {
        const apifyApiToken = ApifyDatasetLoader._getApifyApiToken(config.clientOptions);
        const apifyClient = new ApifyClient({ token: apifyApiToken });
        const actorCall = await apifyClient
            .actor(actorId)
            .call(input, config.callOptions ?? {});
        return new ApifyDatasetLoader(actorCall.defaultDatasetId, {
            datasetMappingFunction: config.datasetMappingFunction,
            clientOptions: { ...config.clientOptions, token: apifyApiToken },
        });
    }
}
