/// <reference path="../../../src/types/pdf-parse.d.ts" />
/// <reference types="node" resolution-mode="require"/>
import { Document } from "../../document.js";
import { BufferLoader } from "./buffer.js";
export declare class PDFLoader extends BufferLoader {
    private splitPages;
    private pdfjs;
    constructor(filePathOrBlob: string | Blob, { splitPages, pdfjs }?: {
        splitPages?: boolean | undefined;
        pdfjs?: typeof PDFLoaderImports | undefined;
    });
    parse(raw: Buffer, metadata: Document["metadata"]): Promise<Document[]>;
}
declare function PDFLoaderImports(): Promise<{
    getDocument: typeof import("pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js").getDocument;
    version: string;
}>;
export {};
