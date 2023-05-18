"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EPubLoader = void 0;
const document_js_1 = require("../../document.cjs");
const base_js_1 = require("../base.cjs");
class EPubLoader extends base_js_1.BaseDocumentLoader {
    constructor(filePath, { splitChapters = true } = {}) {
        super();
        Object.defineProperty(this, "filePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: filePath
        });
        Object.defineProperty(this, "splitChapters", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.splitChapters = splitChapters;
    }
    async parse(epub) {
        const { htmlToText } = await HtmlToTextImport();
        const chapters = await Promise.all(epub.flow.map(async (chapter) => {
            if (!chapter.id)
                return null;
            const html = await epub.getChapterRawAsync(chapter.id);
            if (!html)
                return null;
            return {
                html,
                title: chapter.title,
            };
        }));
        return chapters.filter(Boolean).map((chapter) => ({
            pageContent: htmlToText(chapter.html),
            metadata: {
                ...(chapter.title && { chapter: chapter.title }),
            },
        }));
    }
    async load() {
        const { EPub } = await EpubImport();
        const epub = await EPub.createAsync(this.filePath);
        const parsed = await this.parse(epub);
        const metadata = { source: this.filePath };
        if (parsed.length === 0)
            return [];
        return this.splitChapters
            ? parsed.map((chapter) => new document_js_1.Document({
                pageContent: chapter.pageContent,
                metadata: {
                    ...metadata,
                    ...chapter.metadata,
                },
            }))
            : [
                new document_js_1.Document({
                    pageContent: parsed
                        .map((chapter) => chapter.pageContent)
                        .join("\n\n"),
                    metadata,
                }),
            ];
    }
}
exports.EPubLoader = EPubLoader;
async function EpubImport() {
    const { EPub } = await import("epub2").catch(() => {
        throw new Error("Failed to load epub2. Please install it with eg. `npm install epub2`.");
    });
    return { EPub };
}
async function HtmlToTextImport() {
    const { htmlToText } = await import("html-to-text").catch(() => {
        throw new Error("Failed to load html-to-text. Please install it with eg. `npm install html-to-text`.");
    });
    return { htmlToText };
}
