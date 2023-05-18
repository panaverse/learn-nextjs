import { BaseLanguageModel } from "../../base_language/index.js";
import { CallbackManagerForChainRun } from "../../callbacks/manager.js";
import { ChainValues } from "../../schema/index.js";
import { BaseChain, ChainInputs } from "../base.js";
import { LLMChain } from "../llm_chain.js";
import { SerializedBaseChain } from "../serde.js";
import { ConstitutionalPrinciple } from "./constitutional_principle.js";
export interface ConstitutionalChainInput extends ChainInputs {
    chain: LLMChain;
    constitutionalPrinciples: ConstitutionalPrinciple[];
    critiqueChain: LLMChain;
    revisionChain: LLMChain;
}
export declare class ConstitutionalChain extends BaseChain implements ConstitutionalChainInput {
    chain: LLMChain;
    constitutionalPrinciples: ConstitutionalPrinciple[];
    critiqueChain: LLMChain;
    revisionChain: LLMChain;
    get inputKeys(): string[];
    get outputKeys(): string[];
    constructor(fields: ConstitutionalChainInput);
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    static getPrinciples(names?: string[]): ConstitutionalPrinciple[];
    static fromLLM(llm: BaseLanguageModel, options: Omit<ConstitutionalChainInput, "critiqueChain" | "revisionChain"> & {
        critiqueChain?: LLMChain;
        revisionChain?: LLMChain;
    }): ConstitutionalChain;
    private static _parseCritique;
    _chainType(): "constitutional_chain";
    serialize(): SerializedBaseChain;
}
