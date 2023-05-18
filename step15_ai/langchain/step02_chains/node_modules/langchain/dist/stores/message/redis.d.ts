import { RedisClientOptions, RedisClientType, RedisModules, RedisFunctions, RedisScripts } from "redis";
import { BaseChatMessage, BaseListChatMessageHistory } from "../../schema/index.js";
export type RedisChatMessageHistoryInput = {
    sessionId: string;
    sessionTTL?: number;
    config?: RedisClientOptions;
    client?: any;
};
export declare class RedisChatMessageHistory extends BaseListChatMessageHistory {
    client: RedisClientType<RedisModules, RedisFunctions, RedisScripts>;
    private sessionId;
    private sessionTTL?;
    constructor(fields: RedisChatMessageHistoryInput);
    ensureReadiness(): Promise<boolean>;
    getMessages(): Promise<BaseChatMessage[]>;
    addMessage(message: BaseChatMessage): Promise<void>;
    clear(): Promise<void>;
}
