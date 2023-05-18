export class BasePlanner {
}
export class BaseStepExecutor {
}
export class BaseStepContainer {
}
export class ListStepContainer extends BaseStepContainer {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "steps", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addStep(action, result) {
        this.steps.push({ action, result });
    }
    getSteps() {
        return this.steps;
    }
    getFinalResponse() {
        return this.steps[this.steps.length - 1]?.result?.response;
    }
}
export class LLMPlanner extends BasePlanner {
    constructor(llmChain, outputParser) {
        super();
        Object.defineProperty(this, "llmChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: llmChain
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: outputParser
        });
    }
    async plan(inputs, runManager) {
        const output = await this.llmChain.run(inputs, runManager);
        return this.outputParser.parse(output);
    }
}
export class ChainStepExecutor extends BaseStepExecutor {
    constructor(chain) {
        super();
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: chain
        });
    }
    async step(inputs, runManager) {
        const chainResponse = await this.chain.call(inputs, runManager);
        return { response: chainResponse.output };
    }
}
