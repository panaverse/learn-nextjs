"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadAgent = void 0;
const agent_js_1 = require("./agent.cjs");
const hub_js_1 = require("../util/hub.cjs");
const load_js_1 = require("../util/load.cjs");
const parse_js_1 = require("../util/parse.cjs");
const loadAgentFromFile = async (file, path, llmAndTools) => {
    const serialized = (0, parse_js_1.parseFileConfig)(file, path);
    return agent_js_1.Agent.deserialize({ ...serialized, ...llmAndTools });
};
const loadAgent = async (uri, llmAndTools) => {
    const hubResult = await (0, hub_js_1.loadFromHub)(uri, loadAgentFromFile, "agents", new Set(["json", "yaml"]), llmAndTools);
    if (hubResult) {
        return hubResult;
    }
    return (0, load_js_1.loadFromFile)(uri, loadAgentFromFile, llmAndTools);
};
exports.loadAgent = loadAgent;
