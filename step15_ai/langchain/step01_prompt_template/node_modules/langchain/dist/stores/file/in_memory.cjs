"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryFileStore = void 0;
const index_js_1 = require("../../schema/index.cjs");
class InMemoryFileStore extends index_js_1.BaseFileStore {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "files", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
    }
    async readFile(path) {
        const contents = this.files.get(path);
        if (contents === undefined) {
            throw new Error(`File not found: ${path}`);
        }
        return contents;
    }
    async writeFile(path, contents) {
        this.files.set(path, contents);
    }
}
exports.InMemoryFileStore = InMemoryFileStore;
