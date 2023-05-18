"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisVectorStore = void 0;
const redis_1 = require("redis");
const base_js_1 = require("./base.cjs");
const document_js_1 = require("../document.cjs");
class RedisVectorStore extends base_js_1.VectorStore {
    constructor(embeddings, _dbConfig) {
        super(embeddings, _dbConfig);
        Object.defineProperty(this, "redisClient", {
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
        Object.defineProperty(this, "indexOptions", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "keyPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contentKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "metadataKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vectorKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "filter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.redisClient = _dbConfig.redisClient;
        this.indexName = _dbConfig.indexName;
        this.indexOptions = _dbConfig.indexOptions ?? {
            ALGORITHM: redis_1.VectorAlgorithms.HNSW,
            DISTANCE_METRIC: "COSINE",
        };
        this.keyPrefix = _dbConfig.keyPrefix ?? `doc:${this.indexName}:`;
        this.contentKey = _dbConfig.contentKey ?? "content";
        this.metadataKey = _dbConfig.metadataKey ?? "metadata";
        this.vectorKey = _dbConfig.vectorKey ?? "content_vector";
        this.filter = _dbConfig.filter;
    }
    async addDocuments(documents, options) {
        const texts = documents.map(({ pageContent }) => pageContent);
        await this.addVectors(await this.embeddings.embedDocuments(texts), documents, options);
    }
    async addVectors(vectors, documents, { keys, batchSize = 1000 } = {}) {
        // check if the index exists and create it if it doesn't
        await this.createIndex(vectors[0].length);
        const multi = this.redisClient.multi();
        vectors.map(async (vector, idx) => {
            const key = keys && keys.length ? keys[idx] : `${this.keyPrefix}${idx}`;
            const metadata = documents[idx] && documents[idx].metadata
                ? documents[idx].metadata
                : {};
            multi.hSet(key, {
                [this.vectorKey]: this.getFloat32Buffer(vector),
                [this.contentKey]: documents[idx].pageContent,
                [this.metadataKey]: this.escapeSpecialChars(JSON.stringify(metadata)),
            });
            // write batch
            if (idx % batchSize === 0) {
                await multi.exec();
            }
        });
        // insert final batch
        await multi.exec();
    }
    async similaritySearchVectorWithScore(query, k, filter) {
        if (filter && this.filter) {
            throw new Error("cannot provide both `filter` and `this.filter`");
        }
        const _filter = filter ?? this.filter;
        const results = await this.redisClient.ft.search(this.indexName, ...this.buildQuery(query, k, _filter));
        const result = [];
        if (results.total) {
            for (const res of results.documents) {
                if (res.value) {
                    const document = res.value;
                    if (document.vector_score) {
                        result.push([
                            new document_js_1.Document({
                                pageContent: document[this.contentKey],
                                metadata: JSON.parse(this.unEscapeSpecialChars(document.metadata)),
                            }),
                            Number(document.vector_score),
                        ]);
                    }
                }
            }
        }
        return result;
    }
    static fromTexts(texts, metadatas, embeddings, dbConfig) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new document_js_1.Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return RedisVectorStore.fromDocuments(docs, embeddings, dbConfig);
    }
    static async fromDocuments(docs, embeddings, dbConfig) {
        const instance = new this(embeddings, dbConfig);
        await instance.addDocuments(docs);
        return instance;
    }
    async checkIndexExists() {
        try {
            await this.redisClient.ft.info(this.indexName);
        }
        catch (err) {
            // index doesn't exist
            return false;
        }
        return true;
    }
    async createIndex(dimensions = 1536) {
        if (await this.checkIndexExists()) {
            return;
        }
        const schema = {
            [this.vectorKey]: {
                type: redis_1.SchemaFieldTypes.VECTOR,
                TYPE: "FLOAT32",
                DIM: dimensions,
                ...this.indexOptions,
            },
            [this.contentKey]: redis_1.SchemaFieldTypes.TEXT,
            [this.metadataKey]: redis_1.SchemaFieldTypes.TEXT,
        };
        await this.redisClient.ft.create(this.indexName, schema, {
            ON: "HASH",
            PREFIX: this.keyPrefix,
        });
    }
    async dropIndex() {
        try {
            await this.redisClient.ft.dropIndex(this.indexName);
            return true;
        }
        catch (err) {
            return false;
        }
    }
    buildQuery(query, k, filter) {
        const vectorScoreField = "vector_score";
        let hybridFields = "*";
        // if a filter is set, modify the hybrid query
        if (filter && filter.length) {
            // `filter` is a list of strings, then it's applied using the OR operator in the metadata key
            // for example: filter = ['foo', 'bar'] => this will filter all metadata containing either 'foo' OR 'bar'
            hybridFields = `@${this.metadataKey}:(${this.prepareFilter(filter)})`;
        }
        const baseQuery = `${hybridFields} => [KNN ${k} @${this.vectorKey} $vector AS ${vectorScoreField}]`;
        const returnFields = [this.metadataKey, this.contentKey, vectorScoreField];
        const options = {
            PARAMS: {
                vector: this.getFloat32Buffer(query),
            },
            RETURN: returnFields,
            SORTBY: vectorScoreField,
            DIALECT: 2,
            LIMIT: {
                from: 0,
                size: k,
            },
        };
        return [baseQuery, options];
    }
    prepareFilter(filter) {
        return filter.map(this.escapeSpecialChars).join("|");
    }
    /**
     * Escapes all '-' characters.
     * RediSearch considers '-' as a negative operator, hence we need
     * to escape it
     * @see https://redis.io/docs/stack/search/reference/query_syntax
     *
     * @param str
     * @returns
     */
    escapeSpecialChars(str) {
        return str.replaceAll("-", "\\-");
    }
    /**
     * Unescapes all '-' characters, returning the original string
     *
     * @param str
     * @returns
     */
    unEscapeSpecialChars(str) {
        return str.replaceAll("\\-", "-");
    }
    /**
     * Converts the vector to the buffer Redis needs to
     * correctly store an embedding
     *
     * @param vector
     * @returns Buffer
     */
    getFloat32Buffer(vector) {
        return Buffer.from(new Float32Array(vector).buffer);
    }
}
exports.RedisVectorStore = RedisVectorStore;
