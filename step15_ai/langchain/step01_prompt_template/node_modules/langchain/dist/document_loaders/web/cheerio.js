import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import { AsyncCaller } from "../../util/async_caller.js";
export class CheerioWebBaseLoader extends BaseDocumentLoader {
    constructor(webPath, fields) {
        super();
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
        Object.defineProperty(this, "timeout", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selector", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { timeout, selector, ...rest } = fields ?? {};
        this.timeout = timeout ?? 10000;
        this.caller = new AsyncCaller(rest);
        this.selector = selector ?? "body";
    }
    static async _scrape(url, caller, timeout) {
        const { load } = await CheerioWebBaseLoader.imports();
        const response = await caller.call(fetch, url, {
            signal: timeout ? AbortSignal.timeout(timeout) : undefined,
        });
        const html = await response.text();
        return load(html);
    }
    async scrape() {
        return CheerioWebBaseLoader._scrape(this.webPath, this.caller, this.timeout);
    }
    async load() {
        const $ = await this.scrape();
        const text = $(this.selector).text();
        const metadata = { source: this.webPath };
        return [new Document({ pageContent: text, metadata })];
    }
    static async imports() {
        try {
            const { load } = await import("cheerio");
            return { load };
        }
        catch (e) {
            console.error(e);
            throw new Error("Please install cheerio as a dependency with, e.g. `yarn add cheerio`");
        }
    }
}
