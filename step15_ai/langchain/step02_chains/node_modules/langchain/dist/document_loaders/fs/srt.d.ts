import { TextLoader } from "./text.js";
export declare class SRTLoader extends TextLoader {
    constructor(filePathOrBlob: string | Blob);
    protected parse(raw: string): Promise<string[]>;
}
