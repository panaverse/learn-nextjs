import { Generation, BaseCache } from "../schema/index.js";
export declare class InMemoryCache<T = Generation[]> extends BaseCache<T> {
    private cache;
    constructor(map?: Map<string, T>);
    lookup(prompt: string, llmKey: string): Promise<T | null>;
    update(prompt: string, llmKey: string, value: T): Promise<void>;
    static global(): InMemoryCache;
}
