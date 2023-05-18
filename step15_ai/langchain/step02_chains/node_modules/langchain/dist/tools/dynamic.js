import { Tool } from "./base.js";
/**
 * A tool that can be created dynamically from a function, name, and description.
 */
export class DynamicTool extends Tool {
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
