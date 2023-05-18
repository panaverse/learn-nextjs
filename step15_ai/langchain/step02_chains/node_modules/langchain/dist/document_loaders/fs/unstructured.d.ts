/// <reference types="node" resolution-mode="require"/>
/// <reference types="node" resolution-mode="require"/>
import type { basename as BasenameT } from "node:path";
import type { readFile as ReadFileT } from "node:fs/promises";
import { DirectoryLoader, UnknownHandling } from "./directory.js";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
type Element = {
    type: string;
    text: string;
    metadata: {
        [key: string]: unknown;
    };
};
type UnstructuredLoaderOptions = {
    apiKey?: string;
    apiUrl?: string;
    strategy?: string;
};
type UnstructuredDirectoryLoaderOptions = UnstructuredLoaderOptions & {
    recursive?: boolean;
    unknown?: UnknownHandling;
    strategy?: string;
};
export declare class UnstructuredLoader extends BaseDocumentLoader {
    filePath: string;
    private apiUrl;
    private apiKey?;
    private strategy;
    constructor(filePathOrLegacyApiUrl: string, optionsOrLegacyFilePath?: UnstructuredLoaderOptions | string);
    _partition(): Promise<Element[]>;
    load(): Promise<Document[]>;
    imports(): Promise<{
        readFile: typeof ReadFileT;
        basename: typeof BasenameT;
    }>;
}
export declare class UnstructuredDirectoryLoader extends DirectoryLoader {
    constructor(directoryPathOrLegacyApiUrl: string, optionsOrLegacyDirectoryPath: UnstructuredDirectoryLoaderOptions | string, legacyOptionRecursive?: boolean, legacyOptionUnknown?: UnknownHandling);
}
export { UnknownHandling };
