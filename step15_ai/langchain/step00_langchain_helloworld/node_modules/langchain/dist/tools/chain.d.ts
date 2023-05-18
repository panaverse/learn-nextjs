import { DynamicTool, DynamicToolInput } from "./dynamic.js";
import { BaseChain } from "../chains/base.js";
export interface ChainToolInput extends Omit<DynamicToolInput, "func"> {
    chain: BaseChain;
}
export declare class ChainTool extends DynamicTool {
    chain: BaseChain;
    constructor({ chain, ...rest }: ChainToolInput);
}
