"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodingForModel = exports.getEncoding = void 0;
const lite_1 = require("js-tiktoken/lite");
const async_caller_js_1 = require("./async_caller.cjs");
const cache = {};
const caller = /* #__PURE__ */ new async_caller_js_1.AsyncCaller({});
async function getEncoding(encoding, options) {
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
    return new lite_1.Tiktoken(await cache[encoding], options?.extendedSpecialTokens);
}
exports.getEncoding = getEncoding;
async function encodingForModel(model, options) {
    return getEncoding((0, lite_1.getEncodingNameForModel)(model), options);
}
exports.encodingForModel = encodingForModel;
