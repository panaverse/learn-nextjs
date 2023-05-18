import { BasePromptTemplate } from "./base.js";
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
export declare const loadPrompt: (uri: string) => Promise<BasePromptTemplate>;
