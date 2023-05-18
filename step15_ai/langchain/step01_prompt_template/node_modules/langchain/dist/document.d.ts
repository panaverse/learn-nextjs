export interface DocumentInput<Metadata extends Record<string, any> = Record<string, any>> {
    pageContent: string;
    metadata?: Metadata;
}
/**
 * Interface for interacting with a document.
 */
export declare class Document<Metadata extends Record<string, any> = Record<string, any>> implements DocumentInput {
    pageContent: string;
    metadata: Metadata;
    constructor(fields: DocumentInput<Metadata>);
}
