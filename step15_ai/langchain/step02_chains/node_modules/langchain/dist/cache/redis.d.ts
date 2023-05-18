import type { createCluster, createClient } from "redis";
import { BaseCache, Generation } from "../schema/index.js";
type RedisClientType = ReturnType<typeof createClient> | ReturnType<typeof createCluster>;
export declare class RedisCache extends BaseCache {
    private redisClient;
    constructor(redisClient: RedisClientType);
    lookup(prompt: string, llmKey: string): Promise<Generation[] | null>;
    update(prompt: string, llmKey: string, value: Generation[]): Promise<void>;
}
export {};
