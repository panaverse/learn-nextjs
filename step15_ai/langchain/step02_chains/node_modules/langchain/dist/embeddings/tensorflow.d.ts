import { load } from "@tensorflow-models/universal-sentence-encoder";
import { Embeddings, EmbeddingsParams } from "./base.js";
export interface TensorFlowEmbeddingsParams extends EmbeddingsParams {
}
export declare class TensorFlowEmbeddings extends Embeddings {
    constructor(fields?: TensorFlowEmbeddingsParams);
    _cached: ReturnType<typeof load>;
    private load;
    private _embed;
    embedQuery(document: string): Promise<number[]>;
    embedDocuments(documents: string[]): Promise<number[][]>;
}
