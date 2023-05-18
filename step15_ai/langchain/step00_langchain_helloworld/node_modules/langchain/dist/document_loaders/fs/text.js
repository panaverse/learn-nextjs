import { Document } from "../../document.js";
import { getEnv } from "../../util/env.js";
import { BaseDocumentLoader } from "../base.js";
export class TextLoader extends BaseDocumentLoader {
    constructor(filePathOrBlob) {
        super();
        Object.defineProperty(this, "filePathOrBlob", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePathOrBlob
        });
    }
    async parse(raw) {
        return [raw];
    }
    async load() {
        let text;
        let metadata;
        if (typeof this.filePathOrBlob === "string") {
            const { readFile } = await TextLoader.imports();
            text = await readFile(this.filePathOrBlob, "utf8");
            metadata = { source: this.filePathOrBlob };
        }
        else {
            text = await this.filePathOrBlob.text();
            metadata = { source: "blob", blobType: this.filePathOrBlob.type };
        }
        const parsed = await this.parse(text);
        parsed.forEach((pageContent, i) => {
            if (typeof pageContent !== "string") {
                throw new Error(`Expected string, at position ${i} got ${typeof pageContent}`);
            }
        });
        return parsed.map((pageContent, i) => new Document({
            pageContent,
            metadata: parsed.length === 1
                ? metadata
                : {
                    ...metadata,
                    line: i + 1,
                },
        }));
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
