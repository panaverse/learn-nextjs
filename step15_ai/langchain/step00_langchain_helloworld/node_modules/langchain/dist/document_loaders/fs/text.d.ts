/// <reference types="node" resolution-mode="require"/>
import type { readFile as ReadFileT } from "node:fs/promises";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export declare class TextLoader extends BaseDocumentLoader {
    filePathOrBlob: string | Blob;
    constructor(filePathOrBlob: string | Blob);
    protected parse(raw: string): Promise<string[]>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        readFile: typeof ReadFileT;
    }>;
}
