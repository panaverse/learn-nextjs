/// <reference types="node" resolution-mode="require"/>
import * as fsDefault from "node:fs";
import { BaseDocumentLoader } from "../base.js";
import { UnstructuredLoader as UnstructuredLoaderDefault } from "../fs/unstructured.js";
export interface S3LoaderParams {
    bucket: string;
    key: string;
    unstructuredAPIURL: string;
    s3Config?: S3Config;
    fs?: typeof fsDefault;
    UnstructuredLoader?: typeof UnstructuredLoaderDefault;
}
interface S3Config {
    region?: string;
    accessKeyId?: string;
    secretAccessKey?: string;
}
export declare class S3Loader extends BaseDocumentLoader {
    private bucket;
    private key;
    private unstructuredAPIURL;
    private s3Config;
    private _fs;
    private _UnstructuredLoader;
    constructor({ bucket, key, unstructuredAPIURL, s3Config, fs, UnstructuredLoader, }: S3LoaderParams);
    load(): Promise<import("../../document.js").Document<Record<string, any>>[]>;
}
export {};
