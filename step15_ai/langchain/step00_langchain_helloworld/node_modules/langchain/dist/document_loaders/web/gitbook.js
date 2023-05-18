import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export class GitbookLoader extends CheerioWebBaseLoader {
    constructor(webPath, params = {}) {
        super(webPath);
        Object.defineProperty(this, "webPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: webPath
        });
        Object.defineProperty(this, "shouldLoadAllPaths", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.shouldLoadAllPaths =
            params.shouldLoadAllPaths ?? this.shouldLoadAllPaths;
    }
    async load() {
        const $ = await this.scrape();
        if (this.shouldLoadAllPaths === true) {
            return this.loadAllPaths($);
        }
        return this.loadPath($);
    }
    loadPath($, url) {
        const pageContent = $("main *")
            .contents()
            .toArray()
            .map((element) => element.type === "text" ? $(element).text().trim() : null)
            .filter((text) => text)
            .join("\n");
        const title = $("main h1").first().text().trim();
        return [
            new Document({
                pageContent,
                metadata: { source: url ?? this.webPath, title },
            }),
        ];
    }
    async loadAllPaths($) {
        const relative_paths = $("nav a")
            .toArray()
            .map((element) => $(element).attr("href"))
            .filter((text) => text && text[0] === "/");
        const documents = [];
        for (const path of relative_paths) {
            const url = this.webPath + path;
            console.log(`Fetching text from ${url}`);
            const html = await GitbookLoader._scrape(url, this.caller, this.timeout);
            documents.push(...this.loadPath(html, url));
        }
        console.log(`Fetched ${documents.length} documents.`);
        return documents;
    }
}
