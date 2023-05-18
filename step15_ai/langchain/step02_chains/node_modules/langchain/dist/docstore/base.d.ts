import { Document } from "../document.js";
export declare abstract class Docstore {
    abstract search(search: string): Document | string;
    abstract add(texts: Record<string, Document>): void;
}
