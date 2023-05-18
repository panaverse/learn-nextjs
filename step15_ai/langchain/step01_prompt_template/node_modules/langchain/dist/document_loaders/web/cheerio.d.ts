import type { CheerioAPI, load as LoadT, SelectorType } from "cheerio";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import type { DocumentLoader } from "../base.js";
import { AsyncCaller, AsyncCallerParams } from "../../util/async_caller.js";
export interface WebBaseLoaderParams extends AsyncCallerParams {
    /**
     * The timeout in milliseconds for the fetch request. Defaults to 10s.
     */
    timeout?: number;
    /**
     * The selector to use to extract the text from the document. Defaults to
     * "body".
     */
    selector?: SelectorType;
}
export declare class CheerioWebBaseLoader extends BaseDocumentLoader implements DocumentLoader {
    webPath: string;
    timeout: number;
    caller: AsyncCaller;
    selector?: SelectorType;
    constructor(webPath: string, fields?: WebBaseLoaderParams);
    static _scrape(url: string, caller: AsyncCaller, timeout: number | undefined): Promise<CheerioAPI>;
    scrape(): Promise<CheerioAPI>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        load: typeof LoadT;
    }>;
}
