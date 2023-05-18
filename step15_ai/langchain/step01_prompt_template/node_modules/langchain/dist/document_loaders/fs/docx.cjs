"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocxLoader = void 0;
const document_js_1 = require("../../document.cjs");
const buffer_js_1 = require("./buffer.cjs");
class DocxLoader extends buffer_js_1.BufferLoader {
    constructor(filePathOrBlob) {
        super(filePathOrBlob);
    }
    async parse(raw, metadata) {
        const { extractRawText } = await DocxLoaderImports();
        const docx = await extractRawText({
            buffer: raw,
        });
        if (!docx.value)
            return [];
        return [
            new document_js_1.Document({
                pageContent: docx.value,
                metadata,
            }),
        ];
    }
}
exports.DocxLoader = DocxLoader;
async function DocxLoaderImports() {
    try {
        const { default: mod } = await import("mammoth");
        const { extractRawText } = mod;
        return { extractRawText };
    }
    catch (e) {
        console.error(e);
        throw new Error("Failed to load mammoth. Please install it with eg. `npm install mammoth`.");
    }
}
