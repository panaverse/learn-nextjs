"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FakeEmbeddings = void 0;
const base_js_1 = require("./base.cjs");
class FakeEmbeddings extends base_js_1.Embeddings {
    constructor(params) {
        super(params ?? {});
    }
    embedDocuments(documents) {
        return Promise.resolve(documents.map(() => [0.1, 0.2, 0.3, 0.4]));
    }
    embedQuery(_) {
        return Promise.resolve([0.1, 0.2, 0.3, 0.4]);
    }
}
exports.FakeEmbeddings = FakeEmbeddings;
