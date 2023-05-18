"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadPrompt = void 0;
const base_js_1 = require("./base.cjs");
const hub_js_1 = require("../util/hub.cjs");
const load_js_1 = require("../util/load.cjs");
const parse_js_1 = require("../util/parse.cjs");
const loadPromptFromFile = (text, path) => base_js_1.BasePromptTemplate.deserialize((0, parse_js_1.parseFileConfig)(text, path));
/**
 * Load a prompt from {@link https://github.com/hwchase17/langchain-hub | LangchainHub} or local filesystem.
 *
 * @example
 * Loading from LangchainHub:
 * ```ts
 * import { loadPrompt } from "langchain/prompts/load";
 * const prompt = await loadPrompt("lc://prompts/hello-world/prompt.yaml");
 * ```
 *
 * @example
 * Loading from local filesystem:
 * ```ts
 * import { loadPrompt } from "langchain/prompts/load";
 * const prompt = await loadPrompt("/path/to/prompt.json");
 * ```
 */
const loadPrompt = async (uri) => {
    const hubResult = await (0, hub_js_1.loadFromHub)(uri, loadPromptFromFile, "prompts", new Set(["py", "json", "yaml"]));
    if (hubResult) {
        return hubResult;
    }
    return (0, load_js_1.loadFromFile)(uri, loadPromptFromFile);
};
exports.loadPrompt = loadPrompt;
