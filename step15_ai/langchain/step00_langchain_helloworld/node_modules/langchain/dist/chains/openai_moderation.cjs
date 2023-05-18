"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenAIModerationChain = void 0;
const openai_1 = require("openai");
const base_js_1 = require("./base.cjs");
const axios_fetch_adapter_js_1 = __importDefault(require("../util/axios-fetch-adapter.cjs"));
const async_caller_js_1 = require("../util/async_caller.cjs");
class OpenAIModerationChain extends base_js_1.BaseChain {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "inputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "input"
        });
        Object.defineProperty(this, "outputKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "output"
        });
        Object.defineProperty(this, "openAIApiKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "openAIOrganization", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "clientConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "throwError", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "caller", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.throwError = fields?.throwError ?? false;
        this.openAIApiKey =
            fields?.openAIApiKey ??
                // eslint-disable-next-line no-process-env
                (typeof process !== "undefined" ? process.env.OPENAI_API_KEY : undefined);
        if (!this.openAIApiKey) {
            throw new Error("OpenAI API key not found");
        }
        this.openAIOrganization = fields?.openAIOrganization;
        this.clientConfig = new openai_1.Configuration({
            ...fields?.configuration,
            apiKey: this.openAIApiKey,
            organization: this.openAIOrganization,
            baseOptions: {
                adapter: axios_fetch_adapter_js_1.default,
                ...fields?.configuration?.baseOptions,
            },
        });
        this.client = new openai_1.OpenAIApi(this.clientConfig);
        this.caller = new async_caller_js_1.AsyncCaller(fields ?? {});
    }
    _moderate(text, results) {
        if (results.flagged) {
            const errorStr = "Text was found that violates OpenAI's content policy.";
            if (this.throwError) {
                throw new Error(errorStr);
            }
            else {
                return errorStr;
            }
        }
        return text;
    }
    async _call(values) {
        const text = values[this.inputKey];
        const moderationRequest = {
            input: text,
        };
        let mod;
        try {
            mod = await this.caller.call(() => this.client.createModeration(moderationRequest));
        }
        catch (error) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (error instanceof Error) {
                throw error;
            }
            else {
                throw new Error(error);
            }
        }
        const output = this._moderate(text, mod.data.results[0]);
        return {
            [this.outputKey]: output,
        };
    }
    _chainType() {
        return "moderation_chain";
    }
    get inputKeys() {
        return [this.inputKey];
    }
    get outputKeys() {
        return [this.outputKey];
    }
}
exports.OpenAIModerationChain = OpenAIModerationChain;
