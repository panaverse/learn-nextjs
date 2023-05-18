import { Configuration, OpenAIApi, } from "openai";
import { BaseChain } from "./base.js";
import fetchAdapter from "../util/axios-fetch-adapter.js";
import { AsyncCaller } from "../util/async_caller.js";
export class OpenAIModerationChain extends BaseChain {
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
        this.clientConfig = new Configuration({
            ...fields?.configuration,
            apiKey: this.openAIApiKey,
            organization: this.openAIOrganization,
            baseOptions: {
                adapter: fetchAdapter,
                ...fields?.configuration?.baseOptions,
            },
        });
        this.client = new OpenAIApi(this.clientConfig);
        this.caller = new AsyncCaller(fields ?? {});
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
