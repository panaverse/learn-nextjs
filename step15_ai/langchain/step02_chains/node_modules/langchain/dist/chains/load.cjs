"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadChain = void 0;
const base_js_1 = require("./base.cjs");
const hub_js_1 = require("../util/hub.cjs");
const load_js_1 = require("../util/load.cjs");
const parse_js_1 = require("../util/parse.cjs");
const loadChainFromFile = async (file, path, values = {}) => {
    const serialized = (0, parse_js_1.parseFileConfig)(file, path);
    return base_js_1.BaseChain.deserialize(serialized, values);
};
/**
 * Load a chain from {@link https://github.com/hwchase17/langchain-hub | LangchainHub} or local filesystem.
 *
 * @example
 * Loading from LangchainHub:
 * ```ts
 * import { loadChain } from "langchain/chains/load";
 * const chain = await loadChain("lc://chains/hello-world/chain.json");
 * const res = await chain.call({ topic: "my favorite color" });
 * ```
 *
 * @example
 * Loading from local filesystem:
 * ```ts
 * import { loadChain } from "langchain/chains/load";
 * const chain = await loadChain("/path/to/chain.json");
 * ```
 */
const loadChain = async (uri, values = {}) => {
    const hubResult = await (0, hub_js_1.loadFromHub)(uri, loadChainFromFile, "chains", new Set(["json", "yaml"]), values);
    if (hubResult) {
        return hubResult;
    }
    return (0, load_js_1.loadFromFile)(uri, loadChainFromFile, values);
};
exports.loadChain = loadChain;
