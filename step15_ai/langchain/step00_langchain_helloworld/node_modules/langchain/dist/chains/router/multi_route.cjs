"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRouteChain = exports.RouterChain = void 0;
const base_js_1 = require("../../chains/base.cjs");
class RouterChain extends base_js_1.BaseChain {
    get outputKeys() {
        return ["destination", "next_inputs"];
    }
    async route(inputs, callbacks) {
        const result = await this.call(inputs, callbacks);
        return {
            destination: result.destination,
            nextInputs: result.next_inputs,
        };
    }
}
exports.RouterChain = RouterChain;
class MultiRouteChain extends base_js_1.BaseChain {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "routerChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "destinationChains", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "defaultChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "silentErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        this.routerChain = fields.routerChain;
        this.destinationChains = fields.destinationChains;
        this.defaultChain = fields.defaultChain;
        this.silentErrors = fields.silentErrors ?? this.silentErrors;
    }
    get inputKeys() {
        return this.routerChain.inputKeys;
    }
    get outputKeys() {
        return [];
    }
    async _call(values, runManager) {
        const { destination, nextInputs } = await this.routerChain.route(values, runManager?.getChild());
        await runManager?.handleText(`${destination}: ${JSON.stringify(nextInputs)}`);
        if (!destination) {
            return this.defaultChain
                .call(nextInputs, runManager?.getChild())
                .catch((err) => {
                throw new Error(`Error in default chain: ${err}`);
            });
        }
        if (destination in this.destinationChains) {
            return this.destinationChains[destination]
                .call(nextInputs, runManager?.getChild())
                .catch((err) => {
                throw new Error(`Error in ${destination} chain: ${err}`);
            });
        }
        if (this.silentErrors) {
            return this.defaultChain
                .call(nextInputs, runManager?.getChild())
                .catch((err) => {
                throw new Error(`Error in default chain: ${err}`);
            });
        }
        throw new Error(`Destination ${destination} not found in destination chains with keys ${Object.keys(this.destinationChains)}`);
    }
    _chainType() {
        return "multi_route_chain";
    }
}
exports.MultiRouteChain = MultiRouteChain;
