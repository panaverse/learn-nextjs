"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseDocumentLoader = void 0;
const text_splitter_js_1 = require("../text_splitter.cjs");
class BaseDocumentLoader {
    async loadAndSplit(splitter = new text_splitter_js_1.RecursiveCharacterTextSplitter()) {
        const docs = await this.load();
        return splitter.splitDocuments(docs);
    }
}
exports.BaseDocumentLoader = BaseDocumentLoader;
