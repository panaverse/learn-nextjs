import { LLMChain } from "../../chains/llm_chain.js";
import { RouterChain } from "./multi_route.js";
export class LLMRouterChain extends RouterChain {
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
        const llmChain = new LLMChain({ llm, prompt });
        return new LLMRouterChain({ ...options, llmChain });
    }
}
