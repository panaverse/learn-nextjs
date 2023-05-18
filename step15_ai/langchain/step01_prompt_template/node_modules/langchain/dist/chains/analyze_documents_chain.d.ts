import { BaseChain, ChainInputs } from "./base.js";
import { TextSplitter } from "../text_splitter.js";
import { ChainValues } from "../schema/index.js";
import { SerializedAnalyzeDocumentChain } from "./serde.js";
import { CallbackManagerForChainRun } from "../callbacks/manager.js";
export type LoadValues = Record<string, any>;
export interface AnalyzeDocumentChainInput extends Omit<ChainInputs, "memory"> {
    combineDocumentsChain: BaseChain;
    textSplitter?: TextSplitter;
    inputKey?: string;
}
/**
 * Chain that combines documents by stuffing into context.
 * @augments BaseChain
 * @augments StuffDocumentsChainInput
 */
export declare class AnalyzeDocumentChain extends BaseChain implements AnalyzeDocumentChainInput {
    inputKey: string;
    combineDocumentsChain: BaseChain;
    textSplitter: TextSplitter;
    constructor(fields: AnalyzeDocumentChainInput);
    get inputKeys(): string[];
    get outputKeys(): string[];
    /** @ignore */
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): "analyze_document_chain";
    static deserialize(data: SerializedAnalyzeDocumentChain, values: LoadValues): Promise<AnalyzeDocumentChain>;
    serialize(): SerializedAnalyzeDocumentChain;
}
