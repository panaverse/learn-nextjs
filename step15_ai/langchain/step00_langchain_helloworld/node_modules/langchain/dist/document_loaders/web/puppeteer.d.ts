import type { launch, WaitForOptions, Page, Browser, PuppeteerLaunchOptions } from "puppeteer";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import type { DocumentLoader } from "../base.js";
export { Page, Browser };
export type PuppeteerGotoOptions = WaitForOptions & {
    referer?: string;
    referrerPolicy?: string;
};
export type PuppeteerEvaluate = (page: Page, browser: Browser) => Promise<string>;
export type PuppeteerWebBaseLoaderOptions = {
    launchOptions?: PuppeteerLaunchOptions;
    gotoOptions?: PuppeteerGotoOptions;
    evaluate?: PuppeteerEvaluate;
};
export declare class PuppeteerWebBaseLoader extends BaseDocumentLoader implements DocumentLoader {
    webPath: string;
    options: PuppeteerWebBaseLoaderOptions | undefined;
    constructor(webPath: string, options?: PuppeteerWebBaseLoaderOptions);
    static _scrape(url: string, options?: PuppeteerWebBaseLoaderOptions): Promise<string>;
    scrape(): Promise<string>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        launch: typeof launch;
    }>;
}
