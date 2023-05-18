import { BaseRetriever } from "../schema/index.js";
import { Document } from "../document.js";
export interface MetalRetrieverFields {
    client: import("@getmetal/metal-sdk").default;
}
export declare class MetalRetriever extends BaseRetriever {
    private client;
    constructor(fields: MetalRetrieverFields);
    getRelevantDocuments(query: string): Promise<Document[]>;
}
