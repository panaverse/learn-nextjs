"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMSDBLoader = void 0;
const document_js_1 = require("../../document.cjs");
const cheerio_js_1 = require("./cheerio.cjs");
class IMSDBLoader extends cheerio_js_1.CheerioWebBaseLoader {
    constructor(webPath) {
        super(webPath);
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
    }
    async load() {
        const $ = await this.scrape();
        const text = $("td[class='scrtext']").text().trim();
        const metadata = { source: this.webPath };
        return [new document_js_1.Document({ pageContent: text, metadata })];
    }
}
exports.IMSDBLoader = IMSDBLoader;
