import { BaseLanguageModel } from "../base_language/index.js";
import { SerializedChatVectorDBQAChain } from "./serde.js";
import { ChainValues, BaseRetriever } from "../schema/index.js";
import { BaseChain, ChainInputs } from "./base.js";
import { LLMChain } from "./llm_chain.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export type LoadValues = Record<string, any>;
export interface ConversationalRetrievalQAChainInput extends Omit<ChainInputs, "memory"> {
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments?: boolean;
    inputKey?: string;
}
export declare class ConversationalRetrievalQAChain extends BaseChain implements ConversationalRetrievalQAChainInput {
    inputKey: string;
    chatHistoryKey: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    retriever: BaseRetriever;
    combineDocumentsChain: BaseChain;
    questionGeneratorChain: LLMChain;
    returnSourceDocuments: boolean;
    constructor(fields: ConversationalRetrievalQAChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): string;
    static deserialize(_data: SerializedChatVectorDBQAChain, _values: LoadValues): Promise<ConversationalRetrievalQAChain>;
    serialize(): SerializedChatVectorDBQAChain;
    static fromLLM(llm: BaseLanguageModel, retriever: BaseRetriever, options?: {
        outputKey?: string;
        returnSourceDocuments?: boolean;
        questionGeneratorTemplate?: string;
        qaTemplate?: string;
    } & Omit<ConversationalRetrievalQAChainInput, "retriever" | "combineDocumentsChain" | "questionGeneratorChain">): ConversationalRetrievalQAChain;
}
