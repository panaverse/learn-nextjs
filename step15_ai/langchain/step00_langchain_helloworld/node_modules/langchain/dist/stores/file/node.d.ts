import { BaseFileStore } from "../../schema/index.js";
export declare class NodeFileStore extends BaseFileStore {
    basePath: string;
    constructor(basePath?: string);
    readFile(path: string): Promise<string>;
    writeFile(path: string, contents: string): Promise<void>;
}
