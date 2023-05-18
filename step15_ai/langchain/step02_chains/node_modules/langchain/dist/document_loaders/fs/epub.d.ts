import type { EPub } from "epub2";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export declare class EPubLoader extends BaseDocumentLoader {
    filePath: string;
    private splitChapters;
    constructor(filePath: string, { splitChapters }?: {
        splitChapters?: boolean | undefined;
    });
    protected parse(epub: EPub): Promise<{
        pageContent: string;
        metadata?: object;
    }[]>;
    load(): Promise<Document[]>;
}
