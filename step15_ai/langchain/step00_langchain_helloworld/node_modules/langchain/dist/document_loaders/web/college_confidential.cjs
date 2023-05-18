"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollegeConfidentialLoader = void 0;
const document_js_1 = require("../../document.cjs");
const cheerio_js_1 = require("./cheerio.cjs");
class CollegeConfidentialLoader extends cheerio_js_1.CheerioWebBaseLoader {
    constructor(webPath) {
        super(webPath);
    }
    async load() {
        const $ = await this.scrape();
        const text = $("main[class='skin-handler']").text();
        const metadata = { source: this.webPath };
        return [new document_js_1.Document({ pageContent: text, metadata })];
    }
}
exports.CollegeConfidentialLoader = CollegeConfidentialLoader;
