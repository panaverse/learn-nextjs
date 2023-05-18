"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebBrowser = exports.getText = exports.parseInputs = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const env_js_1 = require("../util/env.cjs");
const text_splitter_js_1 = require("../text_splitter.cjs");
const memory_js_1 = require("../vectorstores/memory.cjs");
const document_js_1 = require("../document.cjs");
const base_js_1 = require("./base.cjs");
const axios_fetch_adapter_js_1 = __importDefault(require("../util/axios-fetch-adapter.cjs"));
const parseInputs = (inputs) => {
    const [baseUrl, task] = inputs.split(",").map((input) => {
        let t = input.trim();
        t = t.startsWith('"') ? t.slice(1) : t;
        t = t.endsWith('"') ? t.slice(0, -1) : t;
        // it likes to put / at the end of urls, wont matter for task
        t = t.endsWith("/") ? t.slice(0, -1) : t;
        return t.trim();
    });
    return [baseUrl, task];
};
exports.parseInputs = parseInputs;
const getText = (html, baseUrl, summary) => {
    // scriptingEnabled so noscript elements are parsed
    const $ = cheerio.load(html, { scriptingEnabled: true });
    let text = "";
    // lets only get the body if its a summary, dont need to summarize header or footer etc
    const rootElement = summary ? "body " : "*";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $(`${rootElement}:not(style):not(script):not(svg)`).each((_i, elem) => {
        // we dont want duplicated content as we drill down so remove children
        let content = $(elem).clone().children().remove().end().text().trim();
        const $el = $(elem);
        // if its an ahref, print the content and url
        let href = $el.attr("href");
        if ($el.prop("tagName")?.toLowerCase() === "a" && href) {
            if (!href.startsWith("http")) {
                try {
                    href = new URL(href, baseUrl).toString();
                }
                catch {
                    // if this fails thats fine, just no url for this
                    href = "";
                }
            }
            const imgAlt = $el.find("img[alt]").attr("alt")?.trim();
            if (imgAlt) {
                content += ` ${imgAlt}`;
            }
            text += ` [${content}](${href})`;
        }
        // otherwise just print the content
        else if (content !== "") {
            text += ` ${content}`;
        }
    });
    return text.trim().replace(/\n+/g, " ");
};
exports.getText = getText;
const getHtml = async (baseUrl, h, config) => {
    const axios = ("default" in axios_1.default ? axios_1.default.default : axios_1.default);
    const domain = new URL(baseUrl).hostname;
    const headers = { ...h };
    // these appear to be positional, which means they have to exist in the headers passed in
    headers.Host = domain;
    headers["Alt-Used"] = domain;
    let htmlResponse;
    try {
        htmlResponse = await axios.get(baseUrl, {
            ...config,
            headers,
        });
    }
    catch (e) {
        if (axios.isAxiosError(e) && e.response && e.response.status) {
            throw new Error(`http response ${e.response.status}`);
        }
        throw e;
    }
    const allowedContentTypes = [
        "text/html",
        "application/json",
        "application/xml",
        "application/javascript",
        "text/plain",
    ];
    const contentType = htmlResponse.headers["content-type"];
    const contentTypeArray = contentType.split(";");
    if (contentTypeArray[0] &&
        !allowedContentTypes.includes(contentTypeArray[0])) {
        throw new Error("returned page was not utf8");
    }
    return htmlResponse.data;
};
const DEFAULT_HEADERS = {
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "en-US,en;q=0.5",
    "Alt-Used": "LEAVE-THIS-KEY-SET-BY-TOOL",
    Connection: "keep-alive",
    Host: "LEAVE-THIS-KEY-SET-BY-TOOL",
    Referer: "https://www.google.com/",
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "cross-site",
    "Upgrade-Insecure-Requests": "1",
    "User-Agent": "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0",
};
class WebBrowser extends base_js_1.Tool {
    constructor({ model, headers, embeddings, verbose, callbacks, callbackManager, axiosConfig, }) {
        super(verbose, callbacks ?? callbackManager);
        Object.defineProperty(this, "model", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "embeddings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "axiosConfig", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "web-browser"
        });
        Object.defineProperty(this, "description", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: `useful for when you need to find something on or summarize a webpage. input should be a comma separated list of "ONE valid http URL including protocol","what you want to find on the page or empty string for a summary".`
        });
        this.model = model;
        this.embeddings = embeddings;
        this.headers = headers || DEFAULT_HEADERS;
        this.axiosConfig = {
            withCredentials: true,
            adapter: (0, env_js_1.isNode)() ? undefined : axios_fetch_adapter_js_1.default,
            ...axiosConfig,
        };
    }
    /** @ignore */
    async _call(inputs, runManager) {
        const [baseUrl, task] = (0, exports.parseInputs)(inputs);
        const doSummary = !task;
        let text;
        try {
            const html = await getHtml(baseUrl, this.headers, this.axiosConfig);
            text = (0, exports.getText)(html, baseUrl, doSummary);
        }
        catch (e) {
            if (e) {
                return e.toString();
            }
            return "There was a problem connecting to the site";
        }
        const textSplitter = new text_splitter_js_1.RecursiveCharacterTextSplitter({
            chunkSize: 2000,
            chunkOverlap: 200,
        });
        const texts = await textSplitter.splitText(text);
        let context;
        // if we want a summary grab first 4
        if (doSummary) {
            context = texts.slice(0, 4).join("\n");
        }
        // search term well embed and grab top 4
        else {
            const docs = texts.map((pageContent) => new document_js_1.Document({
                pageContent,
                metadata: [],
            }));
            const vectorStore = await memory_js_1.MemoryVectorStore.fromDocuments(docs, this.embeddings);
            const results = await vectorStore.similaritySearch(task, 4);
            context = results.map((res) => res.pageContent).join("\n");
        }
        const input = `Text:${context}\n\nI need ${doSummary ? "a summary" : task} from the above text, also provide up to 5 markdown links from within that would be of interest (always including URL and text). Links should be provided, if present, in markdown syntax as a list under the heading "Relevant Links:".`;
        return this.model.predict(input, undefined, runManager?.getChild());
    }
}
exports.WebBrowser = WebBrowser;
