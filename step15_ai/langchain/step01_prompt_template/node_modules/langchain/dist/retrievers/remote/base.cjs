"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoteRetriever = void 0;
const index_js_1 = require("../../schema/index.cjs");
const async_caller_js_1 = require("../../util/async_caller.cjs");
class RemoteRetriever extends index_js_1.BaseRetriever {
    constructor({ url, auth, ...rest }) {
        super();
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "auth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "asyncCaller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.url = url;
        this.auth = auth;
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...(this.auth && this.auth.bearer
                ? { Authorization: `Bearer ${this.auth.bearer}` }
                : {}),
        };
        this.asyncCaller = new async_caller_js_1.AsyncCaller(rest);
    }
    async getRelevantDocuments(query) {
        const body = this.createJsonBody(query);
        const response = await this.asyncCaller.call(() => fetch(this.url, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        }));
        if (!response.ok) {
            throw new Error(`Failed to retrieve documents from ${this.url}: ${response.status} ${response.statusText}`);
        }
        const json = await response.json();
        return this.processJsonResponse(json);
    }
}
exports.RemoteRetriever = RemoteRetriever;
