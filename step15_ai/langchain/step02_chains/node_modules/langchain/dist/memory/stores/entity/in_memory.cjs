"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryEntityStore = void 0;
const index_js_1 = require("../../../schema/index.cjs");
class InMemoryEntityStore extends index_js_1.BaseEntityStore {
    constructor() {
        super();
        Object.defineProperty(this, "store", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.store = Object.create(null);
    }
    async get(key, defaultValue) {
        return key in this.store ? this.store[key] : defaultValue;
    }
    async set(key, value) {
        this.store[key] = value;
    }
    async delete(key) {
        delete this.store[key];
    }
    async exists(key) {
        return key in this.store;
    }
    async clear() {
        this.store = Object.create(null);
    }
}
exports.InMemoryEntityStore = InMemoryEntityStore;
