import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export declare class IMSDBLoader extends CheerioWebBaseLoader {
    webPath: string;
    constructor(webPath: string);
    load(): Promise<Document[]>;
}
