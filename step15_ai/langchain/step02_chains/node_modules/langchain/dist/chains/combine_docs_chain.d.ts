import type { SerializedStuffDocumentsChain, SerializedMapReduceDocumentsChain, SerializedRefineDocumentsChain } from "./serde.js";
import { BaseChain, ChainInputs } from "./base.js";
import { LLMChain } from "./llm_chain.js";
import { Document } from "../document.js";
import { ChainValues } from "../schema/index.js";
import { BasePromptTemplate } from "../prompts/base.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export interface StuffDocumentsChainInput extends ChainInputs {
    /** LLM Wrapper to use after formatting documents */
    llmChain: LLMChain;
    inputKey?: string;
    /** Variable name in the LLM chain to put the documents in */
    documentVariableName?: string;
}
/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export declare class StuffDocumentsChain extends BaseChain implements StuffDocumentsChainInput {
    llmChain: LLMChain;
    inputKey: string;
    documentVariableName: string;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(fields: StuffDocumentsChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "stuff_documents_chain";
    static deserialize(data: SerializedStuffDocumentsChain): Promise<StuffDocumentsChain>;
    serialize(): SerializedStuffDocumentsChain;
}
export interface MapReduceDocumentsChainInput extends StuffDocumentsChainInput {
    /** The maximum number of tokens before requiring to do the reduction */
    maxTokens?: number;
    /** The maximum number of iterations to run through the map */
    maxIterations?: number;
    /** Ensures that the map step is taken regardless of max tokens */
    ensureMapStep?: boolean;
    /** Chain to use to combine results of applying llm_chain to documents. */
    combineDocumentChain: BaseChain;
    /** Return the results of the map steps in the output. */
    returnIntermediateSteps?: boolean;
}
/**
 * Combine documents by mapping a chain over them, then combining results.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export declare class MapReduceDocumentsChain extends BaseChain implements MapReduceDocumentsChainInput {
    llmChain: LLMChain;
    inputKey: string;
    documentVariableName: string;
    returnIntermediateSteps: boolean;
    get inputKeys(): string[];
    get outputKeys(): string[];
    maxTokens: number;
    maxIterations: number;
    ensureMapStep: boolean;
    combineDocumentChain: BaseChain;
    constructor(fields: MapReduceDocumentsChainInput);
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "map_reduce_documents_chain";
    static deserialize(data: SerializedMapReduceDocumentsChain): Promise<MapReduceDocumentsChain>;
    serialize(): SerializedMapReduceDocumentsChain;
}
export interface RefineDocumentsChainInput extends StuffDocumentsChainInput {
    refineLLMChain: LLMChain;
    documentPrompt?: BasePromptTemplate;
    initialResponseName?: string;
    documentVariableName?: string;
    outputKey?: string;
}
/**
 * Combine documents by doing a first pass and then refining on more documents.
 * @augments BaseChain
 * @augments RefineDocumentsChainInput
 */
export declare class RefineDocumentsChain extends BaseChain implements RefineDocumentsChainInput {
    llmChain: LLMChain;
    inputKey: string;
    outputKey: string;
    documentVariableName: string;
    initialResponseName: string;
    refineLLMChain: LLMChain;
    get defaultDocumentPrompt(): BasePromptTemplate;
    documentPrompt: BasePromptTemplate;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(fields: RefineDocumentsChainInput);
    /** @ignore */
    _constructInitialInputs(doc: Document, rest: Record<string, unknown>): Promise<{
        [x: string]: unknown;
    }>;
    /** @ignore */
    _constructRefineInputs(doc: Document, res: string): Promise<{
        [x: string]: unknown;
    }>;
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "refine_documents_chain";
    static deserialize(data: SerializedRefineDocumentsChain): Promise<RefineDocumentsChain>;
    serialize(): SerializedRefineDocumentsChain;
}
