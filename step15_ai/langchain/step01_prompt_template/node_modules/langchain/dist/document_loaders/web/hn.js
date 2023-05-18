import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export class HNLoader extends CheerioWebBaseLoader {
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
            documents.push(new Document({ pageContent: text, metadata }));
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
            documents.push(new Document({ pageContent: title, metadata }));
        });
        return documents;
    }
}
