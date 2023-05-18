"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryDocstore = void 0;
const base_js_1 = require("./base.cjs");
class InMemoryDocstore extends base_js_1.Docstore {
    constructor(docs) {
        super();
        Object.defineProperty(this, "_docs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._docs = docs ?? new Map();
    }
    /** Method for getting count of documents in _docs */
    get count() {
        return this._docs.size;
    }
    search(search) {
        return this._docs.get(search) ?? `ID ${search} not found.`;
    }
    add(texts) {
        const keys = [...this._docs.keys()];
        const overlapping = Object.keys(texts).filter((x) => keys.includes(x));
        if (overlapping.length > 0) {
            throw new Error(`Tried to add ids that already exist: ${overlapping}`);
        }
        for (const [key, value] of Object.entries(texts)) {
            this._docs.set(key, value);
        }
    }
}
exports.InMemoryDocstore = InMemoryDocstore;
