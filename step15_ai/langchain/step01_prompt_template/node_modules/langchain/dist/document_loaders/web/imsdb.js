import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export class IMSDBLoader extends CheerioWebBaseLoader {
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
        return [new Document({ pageContent: text, metadata })];
    }
}
