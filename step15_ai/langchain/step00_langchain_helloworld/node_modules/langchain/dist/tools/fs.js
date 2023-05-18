import { z } from "zod";
import { StructuredTool } from "./base.js";
export class ReadFileTool extends StructuredTool {
    constructor({ store, ...rest }) {
        super(rest);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: z.object({
                file_path: z.string().describe("name of file"),
            })
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "read_file"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Read file from disk"
        });
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.store = store;
    }
    async _call({ file_path }) {
        return await this.store.readFile(file_path);
    }
}
export class WriteFileTool extends StructuredTool {
    constructor({ store, ...rest }) {
        super(rest);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: z.object({
                file_path: z.string().describe("name of file"),
                text: z.string().describe("text to write to file"),
            })
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "write_file"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "Write file from disk"
        });
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.store = store;
    }
    async _call({ file_path, text }) {
        await this.store.writeFile(file_path, text);
        return "File written to successfully.";
    }
}
