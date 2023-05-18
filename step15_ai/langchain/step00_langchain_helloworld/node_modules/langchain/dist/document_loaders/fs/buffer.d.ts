/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { readFile as ReadFileT } from "node:fs/promises";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
export declare abstract class BufferLoader extends BaseDocumentLoader {
    filePathOrBlob: string | Blob;
    constructor(filePathOrBlob: string | Blob);
    protected abstract parse(raw: Buffer, metadata: Document["metadata"]): Promise<Document[]>;
    load(): Promise<Document[]>;
    static imports(): Promise<{
        readFile: typeof ReadFileT;
    }>;
}
