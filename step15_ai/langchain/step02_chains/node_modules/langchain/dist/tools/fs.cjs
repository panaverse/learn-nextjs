"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteFileTool = exports.ReadFileTool = void 0;
const zod_1 = require("zod");
const base_js_1 = require("./base.cjs");
class ReadFileTool extends base_js_1.StructuredTool {
    constructor({ store, ...rest }) {
        super(rest);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: zod_1.z.object({
                file_path: zod_1.z.string().describe("name of file"),
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
exports.ReadFileTool = ReadFileTool;
class WriteFileTool extends base_js_1.StructuredTool {
    constructor({ store, ...rest }) {
        super(rest);
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: zod_1.z.object({
                file_path: zod_1.z.string().describe("name of file"),
                text: zod_1.z.string().describe("text to write to file"),
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
exports.WriteFileTool = WriteFileTool;
