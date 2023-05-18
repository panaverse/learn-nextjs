"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaywrightWebBaseLoader = void 0;
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
class PlaywrightWebBaseLoader extends base_js_1.BaseDocumentLoader {
    constructor(webPath, options) {
        super();
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.options = options ?? undefined;
    }
    static async _scrape(url, options) {
        const { chromium } = await PlaywrightWebBaseLoader.imports();
        const browser = await chromium.launch({
            headless: true,
            ...options?.launchOptions,
        });
        const page = await browser.newPage();
        await page.goto(url, {
            timeout: 180000,
            waitUntil: "domcontentloaded",
            ...options?.gotoOptions,
        });
        const bodyHTML = options?.evaluate
            ? await options?.evaluate(page, browser)
            : await page.content();
        await browser.close();
        return bodyHTML;
    }
    async scrape() {
        return PlaywrightWebBaseLoader._scrape(this.webPath, this.options);
    }
    async load() {
        const text = await this.scrape();
        const metadata = { source: this.webPath };
        return [new document_js_1.Document({ pageContent: text, metadata })];
    }
    static async imports() {
        try {
            const { chromium } = await import("playwright");
            return { chromium };
        }
        catch (e) {
            console.error(e);
            throw new Error("Please install playwright as a dependency with, e.g. `yarn add playwright`");
        }
    }
}
exports.PlaywrightWebBaseLoader = PlaywrightWebBaseLoader;
