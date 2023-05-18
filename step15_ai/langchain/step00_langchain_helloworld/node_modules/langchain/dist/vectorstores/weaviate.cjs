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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeaviateStore = exports.flattenObjectForWeaviate = void 0;
const uuid = __importStar(require("uuid"));
const base_js_1 = require("./base.cjs");
const document_js_1 = require("../document.cjs");
// Note this function is not generic, it is designed specifically for Weaviate
// https://weaviate.io/developers/weaviate/config-refs/datatypes#introduction
const flattenObjectForWeaviate = (
// eslint-disable-next-line @typescript-eslint/no-explicit-any
obj) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const flattenedObject = {};
    for (const key in obj) {
        if (!Object.hasOwn(obj, key)) {
            continue;
        }
        const value = obj[key];
        if (typeof obj[key] === "object" && !Array.isArray(value)) {
            const recursiveResult = (0, exports.flattenObjectForWeaviate)(value);
            for (const deepKey in recursiveResult) {
                if (Object.hasOwn(obj, key)) {
                    flattenedObject[`${key}_${deepKey}`] = recursiveResult[deepKey];
                }
            }
        }
        else if (Array.isArray(value)) {
            if (value.length > 0 &&
                typeof value[0] !== "object" &&
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                value.every((el) => typeof el === typeof value[0])) {
                // Weaviate only supports arrays of primitive types,
                // where all elements are of the same type
                flattenedObject[key] = value;
            }
        }
        else {
            flattenedObject[key] = value;
        }
    }
    return flattenedObject;
};
exports.flattenObjectForWeaviate = flattenObjectForWeaviate;
class WeaviateStore extends base_js_1.VectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
        Object.defineProperty(this, "embeddings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: embeddings
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "indexName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "textKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queryAttrs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.client = args.client;
        this.indexName = args.indexName;
        this.textKey = args.textKey || "text";
        this.queryAttrs = [this.textKey];
        if (args.metadataKeys) {
            this.queryAttrs = this.queryAttrs.concat(args.metadataKeys);
        }
    }
    async addVectors(vectors, documents) {
        const batch = documents.map((document, index) => {
            if (Object.hasOwn(document.metadata, "id"))
                throw new Error("Document inserted to Weaviate vectorstore should not have `id` in their metadata.");
            const flattenedMetadata = (0, exports.flattenObjectForWeaviate)(document.metadata);
            return {
                class: this.indexName,
                id: uuid.v4(),
                vector: vectors[index],
                properties: {
                    [this.textKey]: document.pageContent,
                    ...flattenedMetadata,
                },
            };
        });
        try {
            await this.client.batch
                .objectsBatcher()
                .withObjects(...batch)
                .do();
        }
        catch (e) {
            throw Error(`'Error in addDocuments' ${e}`);
        }
    }
    async addDocuments(documents) {
        return this.addVectors(await this.embeddings.embedDocuments(documents.map((d) => d.pageContent)), documents);
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        try {
            let builder = await this.client.graphql
                .get()
                .withClassName(this.indexName)
                .withFields(`${this.queryAttrs.join(" ")} _additional { distance }`)
                .withNearVector({
                vector: query,
                distance: filter?.distance,
            })
                .withLimit(k);
            if (filter?.where) {
                builder = builder.withWhere(filter.where);
            }
            const result = await builder.do();
            const documents = [];
            for (const data of result.data.Get[this.indexName]) {
                const { [this.textKey]: text, _additional, ...rest } = data;
                documents.push([
                    new document_js_1.Document({
                        pageContent: text,
                        metadata: rest,
                    }),
                    _additional.distance,
                ]);
            }
            return documents;
        }
        catch (e) {
            throw Error(`'Error in similaritySearch' ${e}`);
        }
    }
    static fromTexts(texts, metadatas, embeddings, args) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new document_js_1.Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return WeaviateStore.fromDocuments(docs, embeddings, args);
    }
    static async fromDocuments(docs, embeddings, args) {
        const instance = new this(embeddings, args);
        await instance.addDocuments(docs);
        return instance;
    }
    static async fromExistingIndex(embeddings, args) {
        return new this(embeddings, args);
    }
}
exports.WeaviateStore = WeaviateStore;
