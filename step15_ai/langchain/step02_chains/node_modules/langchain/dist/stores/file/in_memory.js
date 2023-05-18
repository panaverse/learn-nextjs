import { BaseFileStore } from "../../schema/index.js";
export class InMemoryFileStore extends BaseFileStore {
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
