import { BaseCache } from "../schema/index.js";
import { getCacheKey } from "./base.js";
export class RedisCache extends BaseCache {
    constructor(redisClient) {
        super();
        Object.defineProperty(this, "redisClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redisClient = redisClient;
    }
    async lookup(prompt, llmKey) {
        let idx = 0;
        let key = getCacheKey(prompt, llmKey, String(idx));
        let value = await this.redisClient.get(key);
        const generations = [];
        while (value) {
            if (!value) {
                break;
            }
            generations.push({ text: value });
            idx += 1;
            key = getCacheKey(prompt, llmKey, String(idx));
            value = await this.redisClient.get(key);
        }
        return generations.length > 0 ? generations : null;
    }
    async update(prompt, llmKey, value) {
        for (let i = 0; i < value.length; i += 1) {
            const key = getCacheKey(prompt, llmKey, String(i));
            await this.redisClient.set(key, value[i].text);
        }
    }
}
