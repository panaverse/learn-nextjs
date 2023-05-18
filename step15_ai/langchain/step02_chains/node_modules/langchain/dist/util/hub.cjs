"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFromHub = void 0;
const p_retry_1 = __importDefault(require("p-retry"));
const extname_js_1 = require("./extname.cjs");
const fetchWithTimeout = async (url, init) => {
    const { timeout, ...rest } = init;
    const res = await fetch(url, {
        ...rest,
        signal: AbortSignal.timeout(timeout),
    });
    return res;
};
const HUB_PATH_REGEX = /lc(@[^:]+)?:\/\/(.*)/;
const URL_PATH_SEPARATOR = "/";
const loadFromHub = async (uri, loader, validPrefix, validSuffixes, values = {}) => {
    const LANGCHAIN_HUB_DEFAULT_REF = (typeof process !== "undefined"
        ? // eslint-disable-next-line no-process-env
            process.env?.LANGCHAIN_HUB_DEFAULT_REF
        : undefined) ?? "master";
    const LANGCHAIN_HUB_URL_BASE = (typeof process !== "undefined"
        ? // eslint-disable-next-line no-process-env
            process.env?.LANGCHAIN_HUB_URL_BASE
        : undefined) ??
        "https://raw.githubusercontent.com/hwchase17/langchain-hub/";
    const match = uri.match(HUB_PATH_REGEX);
    if (!match) {
        return undefined;
    }
    const [rawRef, remotePath] = match.slice(1);
    const ref = rawRef ? rawRef.slice(1) : LANGCHAIN_HUB_DEFAULT_REF;
    const parts = remotePath.split(URL_PATH_SEPARATOR);
    if (parts[0] !== validPrefix) {
        return undefined;
    }
    if (!validSuffixes.has((0, extname_js_1.extname)(remotePath).slice(1))) {
        throw new Error("Unsupported file type.");
    }
    const url = [LANGCHAIN_HUB_URL_BASE, ref, remotePath].join("/");
    const res = await (0, p_retry_1.default)(() => fetchWithTimeout(url, { timeout: 5000 }), {
        retries: 6,
    });
    if (res.status !== 200) {
        throw new Error(`Could not find file at ${url}`);
    }
    return loader(await res.text(), remotePath, values);
};
exports.loadFromHub = loadFromHub;
