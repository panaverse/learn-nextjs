import { getEnv } from "../../util/env.js";
import { BaseDocumentLoader } from "../base.js";
// TypeScript enums are not tree-shakeable, so doing this instead
// See https://bargsten.org/jsts/enums/
export const UnknownHandling = {
    Ignore: "ignore",
    Warn: "warn",
    Error: "error",
};
export class DirectoryLoader extends BaseDocumentLoader {
    constructor(directoryPath, loaders, recursive = true, unknown = UnknownHandling.Warn) {
        super();
        Object.defineProperty(this, "directoryPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: directoryPath
        });
        Object.defineProperty(this, "loaders", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: loaders
        });
        Object.defineProperty(this, "recursive", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: recursive
        });
        Object.defineProperty(this, "unknown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: unknown
        });
        if (Object.keys(loaders).length === 0) {
            throw new Error("Must provide at least one loader");
        }
        for (const extension in loaders) {
            if (Object.hasOwn(loaders, extension)) {
                if (extension[0] !== ".") {
                    throw new Error(`Extension must start with a dot: ${extension}`);
                }
            }
        }
    }
    async load() {
        const { readdir, extname, resolve } = await DirectoryLoader.imports();
        const files = await readdir(this.directoryPath, { withFileTypes: true });
        const documents = [];
        for (const file of files) {
            const fullPath = resolve(this.directoryPath, file.name);
            if (file.isDirectory()) {
                if (this.recursive) {
                    const loader = new DirectoryLoader(fullPath, this.loaders, this.recursive, this.unknown);
                    documents.push(...(await loader.load()));
                }
            }
            else {
                // I'm aware some things won't be files,
                // but they will be caught by the "unknown" handling below.
                const loaderFactory = this.loaders[extname(file.name)];
                if (loaderFactory) {
                    const loader = loaderFactory(fullPath);
                    documents.push(...(await loader.load()));
                }
                else {
                    switch (this.unknown) {
                        case UnknownHandling.Ignore:
                            break;
                        case UnknownHandling.Warn:
                            console.warn(`Unknown file type: ${file.name}`);
                            break;
                        case UnknownHandling.Error:
                            throw new Error(`Unknown file type: ${file.name}`);
                        default:
                            throw new Error(`Unknown unknown handling: ${this.unknown}`);
                    }
                }
            }
        }
        return documents;
    }
    static async imports() {
        try {
            const { extname, resolve } = await import("node:path");
            const { readdir } = await import("node:fs/promises");
            return { readdir, extname, resolve };
        }
        catch (e) {
            console.error(e);
            throw new Error(`Failed to load fs/promises. DirectoryLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
