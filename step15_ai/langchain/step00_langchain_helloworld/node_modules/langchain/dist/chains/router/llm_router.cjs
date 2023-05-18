"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LLMRouterChain = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const multi_route_js_1 = require("./multi_route.cjs");
class LLMRouterChain extends multi_route_js_1.RouterChain {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llmChain = fields.llmChain;
    }
    get inputKeys() {
        return this.llmChain.inputKeys;
    }
    async _call(values, runManager) {
        return this.llmChain.predict(values, runManager?.getChild());
    }
    _chainType() {
        return "llm_router_chain";
    }
    static fromLLM(llm, prompt, options) {
        const llmChain = new llm_chain_js_1.LLMChain({ llm, prompt });
        return new LLMRouterChain({ ...options, llmChain });
    }
}
exports.LLMRouterChain = LLMRouterChain;
