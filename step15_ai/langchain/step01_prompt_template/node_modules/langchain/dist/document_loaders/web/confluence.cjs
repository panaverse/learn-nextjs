"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfluencePagesLoader = void 0;
const html_to_text_1 = require("html-to-text");
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
class ConfluencePagesLoader extends base_js_1.BaseDocumentLoader {
    constructor({ baseUrl, spaceKey, username, accessToken, limit = 25, }) {
        super();
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "spaceKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "username", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "accessToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.baseUrl = baseUrl;
        this.spaceKey = spaceKey;
        this.username = username;
        this.accessToken = accessToken;
        this.limit = limit;
    }
    async load() {
        try {
            const pages = await this.fetchAllPagesInSpace();
            return pages.map((page) => this.createDocumentFromPage(page));
        }
        catch (error) {
            console.error("Error:", error);
            return [];
        }
    }
    async fetchConfluenceData(url) {
        try {
            const authToken = Buffer.from(`${this.username}:${this.accessToken}`).toString("base64");
            const response = await fetch(url, {
                headers: {
                    Authorization: `Basic ${authToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to fetch ${url} from Confluence: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            throw new Error(`Failed to fetch ${url} from Confluence: ${error}`);
        }
    }
    async fetchAllPagesInSpace(start = 0) {
        const url = `${this.baseUrl}/rest/api/content?spaceKey=${this.spaceKey}&limit=${this.limit}&start=${start}&expand=body.storage`;
        const data = await this.fetchConfluenceData(url);
        if (data.size === 0) {
            return [];
        }
        const nextPageStart = start + data.size;
        const nextPageResults = await this.fetchAllPagesInSpace(nextPageStart);
        return data.results.concat(nextPageResults);
    }
    createDocumentFromPage(page) {
        // Convert the HTML content to plain text
        const plainTextContent = (0, html_to_text_1.htmlToText)(page.body.storage.value, {
            wordwrap: false,
            preserveNewlines: false,
        });
        // Remove empty lines
        const textWithoutEmptyLines = plainTextContent.replace(/^\s*[\r\n]/gm, "");
        // Generate the URL
        const pageUrl = `${this.baseUrl}/spaces/${this.spaceKey}/pages/${page.id}`;
        // Return a langchain document
        return new document_js_1.Document({
            pageContent: textWithoutEmptyLines,
            metadata: {
                title: page.title,
                url: pageUrl,
            },
        });
    }
}
exports.ConfluencePagesLoader = ConfluencePagesLoader;
