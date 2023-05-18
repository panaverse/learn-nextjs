import { BaseChain, ChainInputs } from "./base.js";
import { VectorStore } from "../vectorstores/base.js";
import { SerializedVectorDBQAChain } from "./serde.js";
import { BaseLanguageModel } from "../base_language/index.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
import { ChainValues } from "../schema/index.js";
export type LoadValues = Record<string, any>;
export interface VectorDBQAChainInput extends Omit<ChainInputs, "memory"> {
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments?: boolean;
    k?: number;
    inputKey?: string;
}
export declare class VectorDBQAChain extends BaseChain implements VectorDBQAChainInput {
    k: number;
    inputKey: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    vectorstore: VectorStore;
    combineDocumentsChain: BaseChain;
    returnSourceDocuments: boolean;
    constructor(fields: VectorDBQAChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "vector_db_qa";
    static deserialize(data: SerializedVectorDBQAChain, values: LoadValues): Promise<VectorDBQAChain>;
    serialize(): SerializedVectorDBQAChain;
    static fromLLM(llm: BaseLanguageModel, vectorstore: VectorStore, options?: Partial<Omit<VectorDBQAChainInput, "combineDocumentsChain" | "vectorstore">>): VectorDBQAChain;
}
