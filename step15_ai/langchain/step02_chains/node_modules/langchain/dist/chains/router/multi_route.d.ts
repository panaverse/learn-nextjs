import { CallbackManagerForChainRun, Callbacks } from "../../callbacks/manager.js";
import { BaseChain, ChainInputs } from "../../chains/base.js";
import { ChainValues } from "../../schema/index.js";
type Inputs = {
    [key: string]: Inputs | Inputs[] | string | string[] | number | number[];
};
export interface Route {
    destination?: string;
    nextInputs: {
        [key: string]: Inputs;
    };
}
export interface MultiRouteChainInput extends ChainInputs {
    routerChain: RouterChain;
    destinationChains: {
        [name: string]: BaseChain;
    };
    defaultChain: BaseChain;
    silentErrors?: boolean;
}
export declare abstract class RouterChain extends BaseChain {
    get outputKeys(): string[];
    route(inputs: ChainValues, callbacks?: Callbacks): Promise<Route>;
}
export declare class MultiRouteChain extends BaseChain {
    routerChain: RouterChain;
    destinationChains: {
        [name: string]: BaseChain;
    };
    defaultChain: BaseChain;
    silentErrors: boolean;
    constructor(fields: MultiRouteChainInput);
    get inputKeys(): string[];
    get outputKeys(): string[];
    _call(values: ChainValues, runManager?: CallbackManagerForChainRun): Promise<ChainValues>;
    _chainType(): string;
}
export {};
