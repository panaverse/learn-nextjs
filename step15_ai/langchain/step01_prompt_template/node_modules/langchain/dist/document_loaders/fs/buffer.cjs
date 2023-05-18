"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BufferLoader = void 0;
const env_js_1 = require("../../util/env.cjs");
const base_js_1 = require("../base.cjs");
class BufferLoader extends base_js_1.BaseDocumentLoader {
    constructor(filePathOrBlob) {
        super();
        Object.defineProperty(this, "filePathOrBlob", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePathOrBlob
        });
    }
    async load() {
        let buffer;
        let metadata;
        if (typeof this.filePathOrBlob === "string") {
            const { readFile } = await BufferLoader.imports();
            buffer = await readFile(this.filePathOrBlob);
            metadata = { source: this.filePathOrBlob };
        }
        else {
            buffer = await this.filePathOrBlob
                .arrayBuffer()
                .then((ab) => Buffer.from(ab));
            metadata = { source: "blob", blobType: this.filePathOrBlob.type };
        }
        return this.parse(buffer, metadata);
    }
    static async imports() {
        try {
            const { readFile } = await import("node:fs/promises");
            return { readFile };
        }
        catch (e) {
            console.error(e);
            throw new Error(`Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${(0, env_js_1.getEnv)()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
exports.BufferLoader = BufferLoader;
