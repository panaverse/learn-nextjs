import { Tiktoken, getEncodingNameForModel, } from "js-tiktoken/lite";
import { AsyncCaller } from "./async_caller.js";
const cache = {};
const caller = /* #__PURE__ */ new AsyncCaller({});
export async function getEncoding(encoding, options) {
    if (!(encoding in cache)) {
        cache[encoding] = caller
            .fetch(`https://tiktoken.pages.dev/js/${encoding}.json`, {
            signal: options?.signal,
        })
            .then((res) => res.json())
            .catch((e) => {
            delete cache[encoding];
            throw e;
        });
    }
    return new Tiktoken(await cache[encoding], options?.extendedSpecialTokens);
}
export async function encodingForModel(model, options) {
    return getEncoding(getEncodingNameForModel(model), options);
}
