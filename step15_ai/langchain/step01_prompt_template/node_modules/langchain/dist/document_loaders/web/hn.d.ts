import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export declare class HNLoader extends CheerioWebBaseLoader {
    webPath: string;
    constructor(webPath: string);
    load(): Promise<Document[]>;
    private loadComments;
    private loadResults;
}
