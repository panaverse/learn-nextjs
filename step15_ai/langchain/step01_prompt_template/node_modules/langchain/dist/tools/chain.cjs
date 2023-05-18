"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChainTool = void 0;
const dynamic_js_1 = require("./dynamic.cjs");
class ChainTool extends dynamic_js_1.DynamicTool {
    constructor({ chain, ...rest }) {
        super({
            ...rest,
            func: async (input, runManager) => chain.run(input, runManager?.getChild()),
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chain = chain;
    }
}
exports.ChainTool = ChainTool;
