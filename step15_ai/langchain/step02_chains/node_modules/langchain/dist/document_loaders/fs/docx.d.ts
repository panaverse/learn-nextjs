/// <reference types="node" resolution-mode="require"/>
import { Document } from "../../document.js";
import { BufferLoader } from "./buffer.js";
export declare class DocxLoader extends BufferLoader {
    constructor(filePathOrBlob: string | Blob);
    parse(raw: Buffer, metadata: Document["metadata"]): Promise<Document[]>;
}
