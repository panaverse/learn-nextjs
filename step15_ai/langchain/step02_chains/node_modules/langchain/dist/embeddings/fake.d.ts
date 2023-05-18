import { Embeddings, EmbeddingsParams } from "./base.js";
export declare class FakeEmbeddings extends Embeddings {
    constructor(params?: EmbeddingsParams);
    embedDocuments(documents: string[]): Promise<number[][]>;
    embedQuery(_: string): Promise<number[]>;
}
