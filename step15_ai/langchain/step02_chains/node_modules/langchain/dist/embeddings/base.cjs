"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Embeddings = void 0;
const async_caller_js_1 = require("../util/async_caller.cjs");
class Embeddings {
    constructor(params) {
        /**
         * The async caller should be used by subclasses to make any async calls,
         * which will thus benefit from the concurrency and retry logic.
         */
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.caller = new async_caller_js_1.AsyncCaller(params ?? {});
    }
}
exports.Embeddings = Embeddings;
