import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export interface ConfluencePagesLoaderParams {
    baseUrl: string;
    spaceKey: string;
    username: string;
    accessToken: string;
    limit?: number;
}
export interface ConfluencePage {
    id: string;
    title: string;
    body: {
        storage: {
            value: string;
        };
    };
}
export interface ConfluenceAPIResponse {
    size: number;
    results: ConfluencePage[];
}
export declare class ConfluencePagesLoader extends BaseDocumentLoader {
    readonly baseUrl: string;
    readonly spaceKey: string;
    readonly username: string;
    readonly accessToken: string;
    readonly limit: number;
    constructor({ baseUrl, spaceKey, username, accessToken, limit, }: ConfluencePagesLoaderParams);
    load(): Promise<Document[]>;
    protected fetchConfluenceData(url: string): Promise<ConfluenceAPIResponse>;
    private fetchAllPagesInSpace;
    private createDocumentFromPage;
}
