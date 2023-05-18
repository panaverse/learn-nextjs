import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
import { UnknownHandling } from "../fs/directory.js";
export interface GithubRepoLoaderParams {
    branch?: string;
    recursive?: boolean;
    unknown?: UnknownHandling;
    accessToken?: string;
    ignoreFiles?: (string | RegExp)[];
}
export declare class GithubRepoLoader extends BaseDocumentLoader implements GithubRepoLoaderParams {
    private readonly owner;
    private readonly repo;
    private readonly initialPath;
    private headers;
    branch: string;
    recursive: boolean;
    unknown: UnknownHandling;
    accessToken?: string;
    ignoreFiles: (string | RegExp)[];
    constructor(githubUrl: string, { accessToken, branch, recursive, unknown, ignoreFiles, }?: GithubRepoLoaderParams);
    private extractOwnerAndRepoAndPath;
    load(): Promise<Document[]>;
    private shouldIgnore;
    private processDirectory;
    private fetchRepoFiles;
    private fetchFileContent;
    private handleError;
}
