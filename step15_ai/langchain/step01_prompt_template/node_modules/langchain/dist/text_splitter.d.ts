import type * as tiktoken from "js-tiktoken";
import { Document } from "./document.js";
export interface TextSplitterParams {
    chunkSize: number;
    chunkOverlap: number;
}
export declare abstract class TextSplitter implements TextSplitterParams {
    chunkSize: number;
    chunkOverlap: number;
    constructor(fields?: Partial<TextSplitterParams>);
    abstract splitText(text: string): Promise<string[]>;
    createDocuments(texts: string[], metadatas?: Record<string, any>[]): Promise<Document[]>;
    splitDocuments(documents: Document[]): Promise<Document[]>;
    private joinDocs;
    mergeSplits(splits: string[], separator: string): string[];
}
export interface CharacterTextSplitterParams extends TextSplitterParams {
    separator: string;
}
export declare class CharacterTextSplitter extends TextSplitter implements CharacterTextSplitterParams {
    separator: string;
    constructor(fields?: Partial<CharacterTextSplitterParams>);
    splitText(text: string): Promise<string[]>;
}
export interface RecursiveCharacterTextSplitterParams extends TextSplitterParams {
    separators: string[];
}
export declare class RecursiveCharacterTextSplitter extends TextSplitter implements RecursiveCharacterTextSplitterParams {
    separators: string[];
    constructor(fields?: Partial<RecursiveCharacterTextSplitterParams>);
    splitText(text: string): Promise<string[]>;
}
export interface TokenTextSplitterParams extends TextSplitterParams {
    encodingName: tiktoken.TiktokenEncoding;
    allowedSpecial: "all" | Array<string>;
    disallowedSpecial: "all" | Array<string>;
}
/**
 * Implementation of splitter which looks at tokens.
 */
export declare class TokenTextSplitter extends TextSplitter implements TokenTextSplitterParams {
    encodingName: tiktoken.TiktokenEncoding;
    allowedSpecial: "all" | Array<string>;
    disallowedSpecial: "all" | Array<string>;
    private tokenizer;
    constructor(fields?: Partial<TokenTextSplitterParams>);
    splitText(text: string): Promise<string[]>;
}
export type MarkdownTextSplitterParams = TextSplitterParams;
export declare class MarkdownTextSplitter extends RecursiveCharacterTextSplitter implements MarkdownTextSplitterParams {
    separators: string[];
    constructor(fields?: Partial<MarkdownTextSplitterParams>);
}
