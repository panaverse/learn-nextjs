import { Document } from "../document.js";
import { Docstore } from "./base.js";
export declare class InMemoryDocstore extends Docstore {
    _docs: Map<string, Document>;
    constructor(docs?: Map<string, Document>);
    /** Method for getting count of documents in _docs */
    get count(): number;
    search(search: string): Document | string;
    add(texts: Record<string, Document>): void;
}
