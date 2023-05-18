import { VectorStore } from "./base.js";
import { Document } from "../document.js";
const IdColumnSymbol = Symbol("id");
const ContentColumnSymbol = Symbol("content");
class PrismaVectorStore extends VectorStore {
    constructor(embeddings, config) {
        super(embeddings, {});
        Object.defineProperty(this, "tableSql", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "vectorColumnSql", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "selectSql", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "idColumn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "contentColumn", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "Prisma", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.Prisma = config.prisma;
        this.db = config.db;
        const entries = Object.entries(config.columns);
        const idColumn = entries.find((i) => i[1] === IdColumnSymbol)?.[0];
        const contentColumn = entries.find((i) => i[1] === ContentColumnSymbol)?.[0];
        if (idColumn == null)
            throw new Error("Missing ID column");
        if (contentColumn == null)
            throw new Error("Missing content column");
        this.idColumn = idColumn;
        this.contentColumn = contentColumn;
        this.tableSql = this.Prisma.raw(`"${config.tableName}"`);
        this.vectorColumnSql = this.Prisma.raw(`"${config.vectorColumnName}"`);
        this.selectSql = this.Prisma.raw(entries
            .map(([key, alias]) => (alias && key) || null)
            .filter((x) => !!x)
            .map((key) => `"${key}"`)
            .join(", "));
    }
    static withModel(db) {
        function create(embeddings, config) {
            return new PrismaVectorStore(embeddings, {
                ...config,
                db,
            });
        }
        async function fromTexts(texts, metadatas, embeddings, dbConfig) {
            const docs = [];
            for (let i = 0; i < texts.length; i += 1) {
                const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
                const newDoc = new Document({
                    pageContent: texts[i],
                    metadata,
                });
                docs.push(newDoc);
            }
            return PrismaVectorStore.fromDocuments(docs, embeddings, {
                ...dbConfig,
                db,
            });
        }
        async function fromDocuments(docs, embeddings, dbConfig) {
            const instance = new PrismaVectorStore(embeddings, { ...dbConfig, db });
            await instance.addDocuments(docs);
            return instance;
        }
        return { create, fromTexts, fromDocuments };
    }
    async addModels(models) {
        return this.addDocuments(models.map((metadata) => {
            const pageContent = metadata[this.contentColumn];
            if (typeof pageContent !== "string")
                throw new Error("Content column must be a string");
            return new Document({ pageContent, metadata });
        }));
    }
    async addDocuments(documents) {
        const texts = documents.map(({ pageContent }) => pageContent);
        return this.addVectors(await this.embeddings.embedDocuments(texts), documents);
    }
    async addVectors(vectors, documents) {
        const idSql = this.Prisma.raw(`"${this.idColumn}"`);
        await this.db.$transaction(vectors.map((vector, idx) => this.db.$executeRaw `
          UPDATE ${this.tableSql}
          SET ${this.vectorColumnSql} = ${`[${vector.join(",")}]`}::vector
          WHERE ${idSql} = ${documents[idx].metadata[this.idColumn]}
        `));
    }
    async similaritySearch(query, k = 4) {
        const results = await this.similaritySearchVectorWithScore(await this.embeddings.embedQuery(query), k);
        return results.map((result) => result[0]);
    }
    async similaritySearchVectorWithScore(query, k) {
        const vectorQuery = `[${query.join(",")}]`;
        const articles = await this.db.$queryRaw `
      SELECT ${this.selectSql}, ${this.vectorColumnSql} <=> ${vectorQuery}::vector as "_distance" 
      FROM ${this.tableSql}
      ORDER BY "_distance" ASC
      LIMIT ${k};
    `;
        const results = [];
        for (const article of articles) {
            if (article._distance != null && article[this.contentColumn] != null) {
                results.push([
                    new Document({
                        pageContent: article[this.contentColumn],
                        metadata: article,
                    }),
                    article._distance,
                ]);
            }
        }
        return results;
    }
    static async fromTexts(texts, metadatas, embeddings, dbConfig) {
        const docs = [];
        for (let i = 0; i < texts.length; i += 1) {
            const metadata = Array.isArray(metadatas) ? metadatas[i] : metadatas;
            const newDoc = new Document({
                pageContent: texts[i],
                metadata,
            });
            docs.push(newDoc);
        }
        return PrismaVectorStore.fromDocuments(docs, embeddings, dbConfig);
    }
    static async fromDocuments(docs, embeddings, dbConfig) {
        const instance = new PrismaVectorStore(embeddings, dbConfig);
        await instance.addDocuments(docs);
        return instance;
    }
}
Object.defineProperty(PrismaVectorStore, "IdColumn", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: IdColumnSymbol
});
Object.defineProperty(PrismaVectorStore, "ContentColumn", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: ContentColumnSymbol
});
export { PrismaVectorStore };
