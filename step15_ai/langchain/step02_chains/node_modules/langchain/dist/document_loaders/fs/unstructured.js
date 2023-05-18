import { DirectoryLoader, UnknownHandling, } from "./directory.js";
import { getEnv } from "../../util/env.js";
import { Document } from "../../document.js";
import { BaseDocumentLoader } from "../base.js";
const UNSTRUCTURED_API_FILETYPES = [
    ".txt",
    ".text",
    ".pdf",
    ".docx",
    ".doc",
    ".jpg",
    ".jpeg",
    ".eml",
    ".html",
    ".md",
    ".pptx",
    ".ppt",
    ".msg",
];
export class UnstructuredLoader extends BaseDocumentLoader {
    constructor(filePathOrLegacyApiUrl, optionsOrLegacyFilePath = {}) {
        super();
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "https://api.unstructured.io/general/v0/general"
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "strategy", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Temporary shim to avoid breaking existing users
        // Remove when API keys are enforced by Unstructured and existing code will break anyway
        const isLegacySyntax = typeof optionsOrLegacyFilePath === "string";
        if (isLegacySyntax) {
            this.filePath = optionsOrLegacyFilePath;
            this.apiUrl = filePathOrLegacyApiUrl;
        }
        else {
            this.filePath = filePathOrLegacyApiUrl;
            this.apiKey = optionsOrLegacyFilePath.apiKey;
            this.apiUrl = optionsOrLegacyFilePath.apiUrl ?? this.apiUrl;
            this.strategy = optionsOrLegacyFilePath.strategy ?? "hi_res";
        }
    }
    async _partition() {
        const { readFile, basename } = await this.imports();
        const buffer = await readFile(this.filePath);
        const fileName = basename(this.filePath);
        // I'm aware this reads the file into memory first, but we have lots of work
        // to do on then consuming Documents in a streaming fashion anyway, so not
        // worried about this for now.
        const formData = new FormData();
        formData.append("files", new Blob([buffer]), fileName);
        const headers = {
            "UNSTRUCTURED-API-KEY": this.apiKey ?? "",
            strategy: this.strategy,
        };
        const response = await fetch(this.apiUrl, {
            method: "POST",
            body: formData,
            headers,
        });
        if (!response.ok) {
            throw new Error(`Failed to partition file ${this.filePath} with error ${response.status} and message ${await response.text()}`);
        }
        const elements = await response.json();
        if (!Array.isArray(elements)) {
            throw new Error(`Expected partitioning request to return an array, but got ${elements}`);
        }
        return elements.filter((el) => typeof el.text === "string");
    }
    async load() {
        const elements = await this._partition();
        const documents = [];
        for (const element of elements) {
            const { metadata, text } = element;
            documents.push(new Document({
                pageContent: text,
                metadata: {
                    ...metadata,
                    category: element.type,
                },
            }));
        }
        return documents;
    }
    async imports() {
        try {
            const { readFile } = await import("node:fs/promises");
            const { basename } = await import("node:path");
            return { readFile, basename };
        }
        catch (e) {
            console.error(e);
            throw new Error(`Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
export class UnstructuredDirectoryLoader extends DirectoryLoader {
    constructor(directoryPathOrLegacyApiUrl, optionsOrLegacyDirectoryPath, legacyOptionRecursive = true, legacyOptionUnknown = UnknownHandling.Warn) {
        let directoryPath;
        let options;
        // Temporary shim to avoid breaking existing users
        // Remove when API keys are enforced by Unstructured and existing code will break anyway
        const isLegacySyntax = typeof optionsOrLegacyDirectoryPath === "string";
        if (isLegacySyntax) {
            directoryPath = optionsOrLegacyDirectoryPath;
            options = {
                apiUrl: directoryPathOrLegacyApiUrl,
                recursive: legacyOptionRecursive,
                unknown: legacyOptionUnknown,
            };
        }
        else {
            directoryPath = directoryPathOrLegacyApiUrl;
            options = optionsOrLegacyDirectoryPath;
        }
        const loader = (p) => new UnstructuredLoader(p, options);
        const loaders = UNSTRUCTURED_API_FILETYPES.reduce((loadersObject, filetype) => {
            // eslint-disable-next-line no-param-reassign
            loadersObject[filetype] = loader;
            return loadersObject;
        }, {});
        super(directoryPath, loaders, options.recursive, options.unknown);
    }
}
export { UnknownHandling };
