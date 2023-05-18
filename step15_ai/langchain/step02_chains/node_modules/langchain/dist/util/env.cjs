"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRuntimeEnvironment = exports.getEnv = exports.isNode = exports.isDeno = exports.isJsDom = exports.isWebWorker = exports.isBrowser = void 0;
const isBrowser = () => typeof window !== "undefined" && typeof window.document !== "undefined";
exports.isBrowser = isBrowser;
const isWebWorker = () => typeof globalThis === "object" &&
    globalThis.constructor &&
    globalThis.constructor.name === "DedicatedWorkerGlobalScope";
exports.isWebWorker = isWebWorker;
const isJsDom = () => (typeof window !== "undefined" && window.name === "nodejs") ||
    (typeof navigator !== "undefined" &&
        (navigator.userAgent.includes("Node.js") ||
            navigator.userAgent.includes("jsdom")));
exports.isJsDom = isJsDom;
// Supabase Edge Function provides a `Deno` global object
// without `version` property
const isDeno = () => typeof Deno !== "undefined";
exports.isDeno = isDeno;
// Mark not-as-node if in Supabase Edge Function
const isNode = () => typeof process !== "undefined" &&
    typeof process.versions !== "undefined" &&
    typeof process.versions.node !== "undefined" &&
    !(0, exports.isDeno)();
exports.isNode = isNode;
const getEnv = () => {
    let env;
    if ((0, exports.isBrowser)()) {
        env = "browser";
    }
    else if ((0, exports.isNode)()) {
        env = "node";
    }
    else if ((0, exports.isWebWorker)()) {
        env = "webworker";
    }
    else if ((0, exports.isJsDom)()) {
        env = "jsdom";
    }
    else if ((0, exports.isDeno)()) {
        env = "deno";
    }
    else {
        env = "other";
    }
    return env;
};
exports.getEnv = getEnv;
let runtimeEnvironment;
async function getRuntimeEnvironment() {
    if (runtimeEnvironment === undefined) {
        const env = (0, exports.getEnv)();
        runtimeEnvironment = {
            library: "langchain-js",
            runtime: env,
        };
    }
    return runtimeEnvironment;
}
exports.getRuntimeEnvironment = getRuntimeEnvironment;
