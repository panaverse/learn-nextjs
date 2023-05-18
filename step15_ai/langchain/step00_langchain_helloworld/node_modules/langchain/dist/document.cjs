"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Document = void 0;
/**
 * Interface for interacting with a document.
 */
class Document {
    constructor(fields) {
        Object.defineProperty(this, "pageContent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadata", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pageContent = fields.pageContent
            ? fields.pageContent.toString()
            : this.pageContent;
        this.metadata = fields.metadata ?? {};
    }
}
exports.Document = Document;
