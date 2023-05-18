import { DynamicTool } from "./dynamic.js";
export class ChainTool extends DynamicTool {
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
