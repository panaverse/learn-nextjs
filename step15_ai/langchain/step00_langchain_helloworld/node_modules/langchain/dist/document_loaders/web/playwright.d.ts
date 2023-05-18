import type { LaunchOptions, Page, Browser } from "playwright";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import type { DocumentLoader } from "../base.js";
export { Page, Browser };
export type PlaywrightGotoOptions = {
    referer?: string;
    timeout?: number;
    waitUntil?: "load" | "domcontentloaded" | "networkidle" | "commit";
};
export type PlaywrightEvaluate = (page: Page, browser: Browser) => Promise<string>;
export type PlaywrightWebBaseLoaderOptions = {
    launchOptions?: LaunchOptions;
    gotoOptions?: PlaywrightGotoOptions;
    evaluate?: PlaywrightEvaluate;
};
export declare class PlaywrightWebBaseLoader extends BaseDocumentLoader implements DocumentLoader {
    webPath: string;
    options: PlaywrightWebBaseLoaderOptions | undefined;
    constructor(webPath: string, options?: PlaywrightWebBaseLoaderOptions);
    static _scrape(url: string, options?: PlaywrightWebBaseLoaderOptions): Promise<string>;
    scrape(): Promise<string>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        chromium: typeof import("playwright").chromium;
    }>;
}
