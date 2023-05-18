import { BasePromptTemplate } from "./base.js";
import { loadFromHub } from "../util/hub.js";
import { loadFromFile } from "../util/load.js";
import { parseFileConfig } from "../util/parse.js";
const loadPromptFromFile = (text, path) => BasePromptTemplate.deserialize(parseFileConfig(text, path));
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
export const loadPrompt = async (uri) => {
    const hubResult = await loadFromHub(uri, loadPromptFromFile, "prompts", new Set(["py", "json", "yaml"]));
    if (hubResult) {
        return hubResult;
    }
    return loadFromFile(uri, loadPromptFromFile);
};
