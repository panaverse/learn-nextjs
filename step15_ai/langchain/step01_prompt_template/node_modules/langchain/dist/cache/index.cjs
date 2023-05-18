"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCache = void 0;
const base_js_1 = require("./base.cjs");
const index_js_1 = require("../schema/index.cjs");
const GLOBAL_MAP = new Map();
class InMemoryCache extends index_js_1.BaseCache {
    constructor(map) {
        super();
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cache = map ?? new Map();
    }
    lookup(prompt, llmKey) {
        return Promise.resolve(this.cache.get((0, base_js_1.getCacheKey)(prompt, llmKey)) ?? null);
    }
    async update(prompt, llmKey, value) {
        this.cache.set((0, base_js_1.getCacheKey)(prompt, llmKey), value);
    }
    static global() {
        return new InMemoryCache(GLOBAL_MAP);
    }
}
exports.InMemoryCache = InMemoryCache;
