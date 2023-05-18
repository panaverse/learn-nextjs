"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Replicate = void 0;
const base_js_1 = require("./base.cjs");
class Replicate extends base_js_1.LLM {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "input", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const apiKey = fields?.apiKey ??
            // eslint-disable-next-line no-process-env
            (typeof process !== "undefined" && process.env?.REPLICATE_API_KEY);
        if (!apiKey) {
            throw new Error("Please set the REPLICATE_API_KEY environment variable");
        }
        this.apiKey = apiKey;
        this.model = fields.model;
        this.input = fields.input ?? {};
    }
    _llmType() {
        return "replicate";
    }
    /** @ignore */
    async _call(prompt, options) {
        const imports = await Replicate.imports();
        const replicate = new imports.Replicate({
            userAgent: "langchain",
            auth: this.apiKey,
        });
        const output = await this.caller.callWithOptions({ signal: options.signal }, () => replicate.run(this.model, {
            wait: true,
            input: {
                ...this.input,
                prompt,
            },
        }));
        // Note this is a little odd, but the output format is not consistent
        // across models, so it makes some amount of sense.
        return String(output);
    }
    /** @ignore */
    static async imports() {
        try {
            const { default: Replicate } = await import("replicate");
            return { Replicate };
        }
        catch (e) {
            throw new Error("Please install replicate as a dependency with, e.g. `yarn add replicate`");
        }
    }
}
exports.Replicate = Replicate;
