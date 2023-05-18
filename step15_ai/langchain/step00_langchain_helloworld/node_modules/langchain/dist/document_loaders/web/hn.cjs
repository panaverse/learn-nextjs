"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HNLoader = void 0;
const document_js_1 = require("../../document.cjs");
const cheerio_js_1 = require("./cheerio.cjs");
class HNLoader extends cheerio_js_1.CheerioWebBaseLoader {
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
        if (this.webPath.includes("item")) {
            return this.loadComments($);
        }
        return this.loadResults($);
    }
    loadComments($) {
        const comments = $("tr[class='athing comtr']");
        const title = $("tr[id='pagespace']").attr("title");
        const documents = [];
        comments.each((_index, comment) => {
            const text = $(comment).text().trim();
            const metadata = { source: this.webPath, title };
            documents.push(new document_js_1.Document({ pageContent: text, metadata }));
        });
        return documents;
    }
    loadResults($) {
        const items = $("tr[class='athing']");
        const documents = [];
        items.each((_index, item) => {
            const ranking = $(item).find("span[class='rank']").text();
            const link = $(item).find("span[class='titleline'] a").attr("href");
            const title = $(item).find("span[class='titleline']").text().trim();
            const metadata = {
                source: this.webPath,
                title,
                link,
                ranking,
            };
            documents.push(new document_js_1.Document({ pageContent: title, metadata }));
        });
        return documents;
    }
}
exports.HNLoader = HNLoader;
