"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DynamicTool = void 0;
const base_js_1 = require("./base.cjs");
/**
 * A tool that can be created dynamically from a function, name, and description.
 */
class DynamicTool extends base_js_1.Tool {
    constructor(fields) {
        super(fields.verbose, fields.callbacks);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "func", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = fields.name;
        this.description = fields.description;
        this.func = fields.func;
        this.returnDirect = fields.returnDirect ?? this.returnDirect;
    }
    /** @ignore */
    async _call(input, runManager) {
        return this.func(input, runManager);
    }
}
exports.DynamicTool = DynamicTool;
