import { VectorStore } from "./base.js";
import { Document } from "../document.js";
import { type Embeddings } from "../embeddings/base.js";
declare const IdColumnSymbol: unique symbol;
declare const ContentColumnSymbol: unique symbol;
type ColumnSymbol = typeof IdColumnSymbol | typeof ContentColumnSymbol;
declare type Value = unknown;
declare type RawValue = Value | Sql;
declare class Sql {
    strings: string[];
    constructor(rawStrings: ReadonlyArray<string>, rawValues: ReadonlyArray<RawValue>);
}
type PrismaNamespace = {
    ModelName: Record<string, string>;
    Sql: typeof Sql;
    raw: (sql: string) => Sql;
};
type PrismaClient = {
    $queryRaw<T = unknown>(query: TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
    $executeRaw(query: TemplateStringsArray | Sql, ...values: any[]): Promise<any>;
    $transaction<P extends Promise<any>[]>(arg: [...P]): Promise<any>;
};
type ObjectIntersect<A, B> = {
    [P in keyof A & keyof B]: A[P] | B[P];
};
type ModelColumns<TModel extends Record<string, unknown>> = {
    [K in keyof TModel]?: true | ColumnSymbol;
};
type SimilarityModel<TModel extends Record<string, unknown> = Record<string, unknown>, TColumns extends ModelColumns<TModel> = ModelColumns<TModel>> = Pick<TModel, keyof ObjectIntersect<TModel, TColumns>> & {
    _distance: number | null;
};
type DefaultPrismaVectorStore = PrismaVectorStore<Record<string, unknown>, string, ModelColumns<Record<string, unknown>>>;
export declare class PrismaVectorStore<TModel extends Record<string, unknown>, TModelName extends string, TSelectModel extends ModelColumns<TModel>> extends VectorStore {
    tableSql: Sql;
    vectorColumnSql: Sql;
    selectSql: Sql;
    idColumn: keyof TModel & string;
    contentColumn: keyof TModel & string;
    static IdColumn: typeof IdColumnSymbol;
    static ContentColumn: typeof ContentColumnSymbol;
    protected db: PrismaClient;
    protected Prisma: PrismaNamespace;
    constructor(embeddings: Embeddings, config: {
        db: PrismaClient;
        prisma: PrismaNamespace;
        tableName: TModelName;
        vectorColumnName: string;
        columns: TSelectModel;
    });
    static withModel<TModel extends Record<string, unknown>>(db: PrismaClient): {
        create: <TPrisma extends PrismaNamespace, TColumns extends ModelColumns<TModel>>(embeddings: Embeddings, config: {
            prisma: TPrisma;
            tableName: keyof TPrisma["ModelName"] & string;
            vectorColumnName: string;
            columns: TColumns;
        }) => PrismaVectorStore<TModel, keyof TPrisma["ModelName"] & string, TColumns>;
        fromTexts: <TPrisma_1 extends PrismaNamespace, TColumns_1 extends ModelColumns<TModel>>(texts: string[], metadatas: TModel[], embeddings: Embeddings, dbConfig: {
            prisma: TPrisma_1;
            tableName: keyof TPrisma_1["ModelName"] & string;
            vectorColumnName: string;
            columns: TColumns_1;
        }) => Promise<DefaultPrismaVectorStore>;
        fromDocuments: <TPrisma_2 extends PrismaNamespace, TColumns_2 extends ModelColumns<TModel>>(docs: Document<TModel>[], embeddings: Embeddings, dbConfig: {
            prisma: TPrisma_2;
            tableName: keyof TPrisma_2["ModelName"] & string;
            vectorColumnName: string;
            columns: TColumns_2;
        }) => Promise<PrismaVectorStore<TModel, keyof TPrisma_2["ModelName"] & string, TColumns_2>>;
    };
    addModels(models: TModel[]): Promise<void>;
    addDocuments(documents: Document<TModel>[]): Promise<void>;
    addVectors(vectors: number[][], documents: Document<TModel>[]): Promise<void>;
    similaritySearch(query: string, k?: number): Promise<Document<SimilarityModel<TModel, TSelectModel>>[]>;
    similaritySearchVectorWithScore(query: number[], k: number): Promise<[Document<SimilarityModel<TModel, TSelectModel>>, number][]>;
    static fromTexts(texts: string[], metadatas: object[], embeddings: Embeddings, dbConfig: {
        db: PrismaClient;
        prisma: PrismaNamespace;
        tableName: string;
        vectorColumnName: string;
        columns: ModelColumns<Record<string, unknown>>;
    }): Promise<DefaultPrismaVectorStore>;
    static fromDocuments(docs: Document[], embeddings: Embeddings, dbConfig: {
        db: PrismaClient;
        prisma: PrismaNamespace;
        tableName: string;
        vectorColumnName: string;
        columns: ModelColumns<Record<string, unknown>>;
    }): Promise<DefaultPrismaVectorStore>;
}
export {};
