import { getEnv } from "../../util/env.js";
import { BaseDocumentLoader } from "../base.js";
export class BufferLoader extends BaseDocumentLoader {
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
            throw new Error(`Failed to load fs/promises. TextLoader available only on environment 'node'. It appears you are running environment '${getEnv()}'. See https://<link to docs> for alternatives.`);
        }
    }
}
