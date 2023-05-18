"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tool = exports.StructuredTool = void 0;
const zod_1 = require("zod");
const manager_js_1 = require("../callbacks/manager.cjs");
const index_js_1 = require("../base_language/index.cjs");
/**
 * Base class for Tools that accept input of any shape defined by a Zod schema.
 */
class StructuredTool extends index_js_1.BaseLangChain {
    constructor(fields) {
        super(fields ?? {});
        Object.defineProperty(this, "returnDirect", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async call(arg, callbacks) {
        const parsed = await this.schema.parseAsync(arg);
        const callbackManager_ = await manager_js_1.CallbackManager.configure(callbacks, this.callbacks, { verbose: this.verbose });
        const runManager = await callbackManager_?.handleToolStart({ name: this.name }, typeof parsed === "string" ? parsed : JSON.stringify(parsed));
        let result;
        try {
            result = await this._call(parsed, runManager);
        }
        catch (e) {
            await runManager?.handleToolError(e);
            throw e;
        }
        await runManager?.handleToolEnd(result);
        return result;
    }
}
exports.StructuredTool = StructuredTool;
/**
 * Base class for Tools that accept input as a string.
 */
class Tool extends StructuredTool {
    constructor(verbose, callbacks) {
        super({ verbose, callbacks });
        Object.defineProperty(this, "schema", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: zod_1.z
                .object({ input: zod_1.z.string().optional() })
                .transform((obj) => obj.input)
        });
    }
    call(arg, callbacks) {
        return super.call(typeof arg === "string" || !arg ? { input: arg } : arg, callbacks);
    }
}
exports.Tool = Tool;
