"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisChatMessageHistory = void 0;
const redis_1 = require("redis");
const index_js_1 = require("../../schema/index.cjs");
const utils_js_1 = require("./utils.cjs");
class RedisChatMessageHistory extends index_js_1.BaseListChatMessageHistory {
    constructor(fields) {
        const { sessionId, sessionTTL, config, client } = fields;
        super();
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "sessionTTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = (client ?? (0, redis_1.createClient)(config ?? {}));
        this.sessionId = sessionId;
        this.sessionTTL = sessionTTL;
    }
    async ensureReadiness() {
        if (!this.client.isReady) {
            await this.client.connect();
        }
        return true;
    }
    async getMessages() {
        await this.ensureReadiness();
        const rawStoredMessages = await this.client.lRange(this.sessionId, 0, -1);
        const orderedMessages = rawStoredMessages
            .reverse()
            .map((message) => JSON.parse(message));
        const previousMessages = orderedMessages
            .map((item) => ({
            type: item.type,
            data: {
                role: item.role,
                content: item.text,
            },
        }))
            .filter((x) => x.type !== undefined && x.data.content !== undefined);
        return (0, utils_js_1.mapStoredMessagesToChatMessages)(previousMessages);
    }
    async addMessage(message) {
        await this.ensureReadiness();
        const messageToAdd = (0, utils_js_1.mapChatMessagesToStoredMessages)([message]);
        await this.client.lPush(this.sessionId, JSON.stringify(messageToAdd[0]));
        if (this.sessionTTL) {
            await this.client.expire(this.sessionId, this.sessionTTL);
        }
    }
    async clear() {
        await this.ensureReadiness();
        await this.client.del(this.sessionId);
    }
}
exports.RedisChatMessageHistory = RedisChatMessageHistory;
