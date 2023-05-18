"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIPluginTool = void 0;
const base_js_1 = require("./base.cjs");
class AIPluginTool extends base_js_1.Tool {
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    constructor(params) {
        super();
        Object.defineProperty(this, "_name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apiSpec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._name = params.name;
        this._description = params.description;
        this.apiSpec = params.apiSpec;
    }
    /** @ignore */
    async _call(_input) {
        return this.apiSpec;
    }
    static async fromPluginUrl(url) {
        const aiPluginRes = await fetch(url);
        if (!aiPluginRes.ok) {
            throw new Error(`Failed to fetch plugin from ${url} with status ${aiPluginRes.status}`);
        }
        const aiPluginJson = await aiPluginRes.json();
        const apiUrlRes = await fetch(aiPluginJson.api.url);
        if (!apiUrlRes.ok) {
            throw new Error(`Failed to fetch API spec from ${aiPluginJson.api.url} with status ${apiUrlRes.status}`);
        }
        const apiUrlJson = await apiUrlRes.text();
        return new AIPluginTool({
            name: aiPluginJson.name_for_model,
            description: `Call this tool to get the OpenAPI spec (and usage guide) for interacting with the ${aiPluginJson.name_for_human} API. You should only call this ONCE! What is the ${aiPluginJson.name_for_human} API useful for? ${aiPluginJson.description_for_human}`,
            apiSpec: `Usage Guide: ${aiPluginJson.description_for_model}

OpenAPI Spec in JSON or YAML format:\n${apiUrlJson}`,
        });
    }
}
exports.AIPluginTool = AIPluginTool;
