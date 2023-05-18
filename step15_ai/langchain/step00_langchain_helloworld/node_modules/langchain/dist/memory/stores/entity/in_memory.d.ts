import { BaseEntityStore } from "../../../schema/index.js";
export declare class InMemoryEntityStore extends BaseEntityStore {
    private store;
    constructor();
    get(key: string, defaultValue: string | undefined): Promise<string | undefined>;
    set(key: string, value: string | undefined): Promise<void>;
    delete(key: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    clear(): Promise<void>;
}
