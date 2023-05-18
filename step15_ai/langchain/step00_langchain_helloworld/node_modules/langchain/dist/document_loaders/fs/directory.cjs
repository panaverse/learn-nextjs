"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectoryLoader = exports.UnknownHandling = void 0;
const env_js_1 = require("../../util/env.cjs");
const base_js_1 = require("../base.cjs");
// TypeScript enums are not tree-shakeable, so doing this instead
// See https://bargsten.org/jsts/enums/
exports.UnknownHandling = {
    Ignore: "ignore",
    Warn: "warn",
    Error: "error",
};
class DirectoryLoader extends base_js_1.BaseDocumentLoader {
    constructor(directoryPath, loaders, recursive = true, unknown = exports.UnknownHandling.Warn) {
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
                        case exports.UnknownHandling.Ignore:
                            break;
                        case exports.UnknownHandling.Warn:
                            console.warn(`Unknown file type: ${file.name}`);
                            break;
                        case exports.UnknownHandling.Error:
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
            throw new Error(`Failed to load fs/promises. DirectoryLoader available only on environment 'node'. It appears you are running environment '${(0, env_js_1.getEnv)()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
exports.DirectoryLoader = DirectoryLoader;
