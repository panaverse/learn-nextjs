import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
export declare class CollegeConfidentialLoader extends CheerioWebBaseLoader {
    constructor(webPath: string);
    load(): Promise<Document[]>;
}
