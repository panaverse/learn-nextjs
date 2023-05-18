import { Document } from "../../document.js";
import { CheerioWebBaseLoader } from "./cheerio.js";
interface GitbookLoaderParams {
    shouldLoadAllPaths?: boolean;
}
export declare class GitbookLoader extends CheerioWebBaseLoader {
    webPath: string;
    shouldLoadAllPaths: boolean;
    constructor(webPath: string, params?: GitbookLoaderParams);
    load(): Promise<Document[]>;
    private loadPath;
    private loadAllPaths;
}
export {};
