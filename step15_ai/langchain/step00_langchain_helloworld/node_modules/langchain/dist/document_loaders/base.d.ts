import { TextSplitter } from "../text_splitter.js";
import { Document } from "../document.js";
export interface DocumentLoader {
    load(): Promise<Document[]>;
    loadAndSplit(textSplitter?: TextSplitter): Promise<Document[]>;
}
export declare abstract class BaseDocumentLoader implements DocumentLoader {
    abstract load(): Promise<Document[]>;
    loadAndSplit(splitter?: TextSplitter): Promise<Document[]>;
}
