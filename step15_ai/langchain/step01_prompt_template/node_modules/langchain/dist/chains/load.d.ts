import { BaseChain } from "./base.js";
import { LoadValues } from "../util/load.js";
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
export declare const loadChain: (uri: string, values?: LoadValues) => Promise<BaseChain>;
