import { BaseDocumentCompressor } from "./document_compressors/index.js";
import { Document } from "../document.js";
import { BaseRetriever } from "../schema/index.js";
export interface ContextualCompressionRetrieverArgs {
    baseCompressor: BaseDocumentCompressor;
    baseRetriever: BaseRetriever;
}
export declare class ContextualCompressionRetriever extends BaseRetriever {
    baseCompressor: BaseDocumentCompressor;
    baseRetriever: BaseRetriever;
    constructor({ baseCompressor, baseRetriever, }: ContextualCompressionRetrieverArgs);
    getRelevantDocuments(query: string): Promise<Document[]>;
}
