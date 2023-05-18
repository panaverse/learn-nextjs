import { AsyncCaller } from "../util/async_caller.js";
export class Embeddings {
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
        this.caller = new AsyncCaller(params ?? {});
    }
}
