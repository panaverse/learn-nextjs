import { TextLoader } from "./text.js";
export declare class JSONLoader extends TextLoader {
    pointers: string[];
    constructor(filePathOrBlob: string | Blob, pointers?: string | string[]);
    protected parse(raw: string): Promise<string[]>;
    /**
     * If JSON pointers are specified, return all strings below any of them
     * and exclude all other nodes expect if they match a JSON pointer (to allow to extract strings from different levels)
     *
     * If no JSON pointer is specified then return all string in the object
     */
    private extractArrayStringsFromObject;
    private getTargetedEntries;
}
export declare class JSONLinesLoader extends TextLoader {
    pointer: string;
    constructor(filePathOrBlob: string | Blob, pointer: string);
    protected parse(raw: string): Promise<string[]>;
}
