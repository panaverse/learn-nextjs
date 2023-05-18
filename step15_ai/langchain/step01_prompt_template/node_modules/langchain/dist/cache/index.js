import { getCacheKey } from "./base.js";
import { BaseCache } from "../schema/index.js";
const GLOBAL_MAP = new Map();
export class InMemoryCache extends BaseCache {
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
        return Promise.resolve(this.cache.get(getCacheKey(prompt, llmKey)) ?? null);
    }
    async update(prompt, llmKey, value) {
        this.cache.set(getCacheKey(prompt, llmKey), value);
    }
    static global() {
        return new InMemoryCache(GLOBAL_MAP);
    }
}
