import { errors } from "@opensearch-project/opensearch";
import * as uuid from "uuid";
import { Document } from "../document.js";
import { VectorStore } from "./base.js";
export class OpenSearchVectorStore extends VectorStore {
    constructor(embeddings, args) {
        super(embeddings, args);
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
        Object.defineProperty(this, "engine", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "spaceType", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "efConstruction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "efSearch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "m", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.spaceType = args.vectorSearchOptions?.spaceType ?? "l2";
        this.engine = args.vectorSearchOptions?.engine ?? "nmslib";
        this.m = args.vectorSearchOptions?.m ?? 16;
        this.efConstruction = args.vectorSearchOptions?.efConstruction ?? 512;
        this.efSearch = args.vectorSearchOptions?.efSearch ?? 512;
        this.client = args.client;
        this.indexName = args.indexName ?? "documents";
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        await this.ensureIndexExists(vectors[0].length, this.engine, this.spaceType, this.efSearch, this.efConstruction, this.m);
        const operations = vectors.flatMap((embedding, idx) => [
            {
                index: {
                    _index: this.indexName,
                    _id: uuid.v4(),
                },
            },
            {
                embedding,
                metadata: documents[idx].metadata,
                text: documents[idx].pageContent,
            },
        ]);
        await this.client.bulk({ body: operations });
        await this.client.indices.refresh({ index: this.indexName });
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        const search = {
            index: this.indexName,
            body: {
                query: {
                    bool: {
                        filter: { bool: { must: this.buildMetadataTerms(filter) } },
                        must: [
                            {
                                knn: {
                                    embedding: { vector: query, k },
                                },
                            },
                        ],
                    },
                },
                size: k,
            },
        };
        const { body } = await this.client.search(search);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return body.hits.hits.map((hit) => [
            new Document({
                pageContent: hit._source.text,
                metadata: hit._source.metadata,
            }),
            hit._score,
        ]);
    }
    static fromTexts(texts, metadatas, embeddings, args) {
        const documents = texts.map((text, idx) => {
            const metadata = Array.isArray(metadatas) ? metadatas[idx] : metadatas;
            return new Document({ pageContent: text, metadata });
        });
        return OpenSearchVectorStore.fromDocuments(documents, embeddings, args);
    }
    static async fromDocuments(docs, embeddings, dbConfig) {
        const store = new OpenSearchVectorStore(embeddings, dbConfig);
        await store.addDocuments(docs).then(() => store);
        return store;
    }
    static async fromExistingIndex(embeddings, dbConfig) {
        const store = new OpenSearchVectorStore(embeddings, dbConfig);
        await store.client.cat.indices({ index: store.indexName });
        return store;
    }
    async ensureIndexExists(dimension, engine = "nmslib", spaceType = "l2", efSearch = 512, efConstruction = 512, m = 16) {
        const body = {
            settings: {
                index: {
                    number_of_shards: 5,
                    number_of_replicas: 1,
                    knn: true,
                    "knn.algo_param.ef_search": efSearch,
                },
            },
            mappings: {
                dynamic_templates: [
                    {
                        // map all metadata properties to be keyword
                        "metadata.*": {
                            match_mapping_type: "*",
                            mapping: { type: "keyword" },
                        },
                    },
                ],
                properties: {
                    text: { type: "text" },
                    metadata: { type: "object" },
                    embedding: {
                        type: "knn_vector",
                        dimension,
                        method: {
                            name: "hnsw",
                            engine,
                            space_type: spaceType,
                            parameters: { ef_construction: efConstruction, m },
                        },
                    },
                },
            },
        };
        const indexExists = await this.doesIndexExist();
        if (indexExists)
            return;
        await this.client.indices.create({ index: this.indexName, body });
    }
    buildMetadataTerms(filter) {
        if (filter == null)
            return [];
        const result = [];
        for (const [key, value] of Object.entries(filter)) {
            result.push({ term: { [`metadata.${key}`]: value } });
        }
        return result;
    }
    async doesIndexExist() {
        try {
            await this.client.cat.indices({ index: this.indexName });
            return true;
        }
        catch (err) {
            // eslint-disable-next-line no-instanceof/no-instanceof
            if (err instanceof errors.ResponseError && err.statusCode === 404) {
                return false;
            }
            throw err;
        }
    }
    async deleteIfExists() {
        const indexExists = await this.doesIndexExist();
        if (!indexExists)
            return;
        await this.client.indices.delete({ index: this.indexName });
    }
}
