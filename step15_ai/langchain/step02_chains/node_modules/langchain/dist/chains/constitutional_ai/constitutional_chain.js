import { BaseChain } from "../base.js";
import { LLMChain } from "../llm_chain.js";
import { PRINCIPLES, } from "./constitutional_principle.js";
import { CRITIQUE_PROMPT, REVISION_PROMPT } from "./constitutional_prompts.js";
export class ConstitutionalChain extends BaseChain {
    get inputKeys() {
        return this.chain.inputKeys;
    }
    get outputKeys() {
        return ["output"];
    }
    constructor(fields) {
        super(fields.memory, fields.verbose, fields.callbackManager);
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "constitutionalPrinciples", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "critiqueChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "revisionChain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.chain = fields.chain;
        this.constitutionalPrinciples = fields.constitutionalPrinciples;
        this.critiqueChain = fields.critiqueChain;
        this.revisionChain = fields.revisionChain;
    }
    async _call(values, runManager) {
        let { [this.chain.outputKey]: response } = await this.chain.call(values, runManager?.getChild());
        const inputPrompt = await this.chain.prompt.format(values);
        for (let i = 0; i < this.constitutionalPrinciples.length; i += 1) {
            const { [this.critiqueChain.outputKey]: rawCritique } = await this.critiqueChain.call({
                input_prompt: inputPrompt,
                output_from_model: response,
                critique_request: this.constitutionalPrinciples[i].critiqueRequest,
            }, runManager?.getChild());
            const critique = ConstitutionalChain._parseCritique(rawCritique);
            const { [this.revisionChain.outputKey]: revisionRaw } = await this.revisionChain.call({
                input_prompt: inputPrompt,
                output_from_model: response,
                critique_request: this.constitutionalPrinciples[i].critiqueRequest,
                critique,
                revision_request: this.constitutionalPrinciples[i].revisionRequest,
            }, runManager?.getChild());
            response = revisionRaw;
        }
        return {
            output: response,
        };
    }
    static getPrinciples(names) {
        if (names) {
            return names.map((name) => PRINCIPLES[name]);
        }
        return Object.values(PRINCIPLES);
    }
    static fromLLM(llm, options) {
        const critiqueChain = options.critiqueChain ??
            new LLMChain({
                llm,
                prompt: CRITIQUE_PROMPT,
            });
        const revisionChain = options.revisionChain ??
            new LLMChain({
                llm,
                prompt: REVISION_PROMPT,
            });
        return new this({
            ...options,
            chain: options.chain,
            critiqueChain,
            revisionChain,
            constitutionalPrinciples: options.constitutionalPrinciples ?? [],
        });
    }
    static _parseCritique(outputString) {
        let output = outputString;
        if (!output.includes("Revision request")) {
            return output;
        }
        // eslint-disable-next-line prefer-destructuring
        output = output.split("Revision request:")[0];
        if (output.includes("\n\n")) {
            // eslint-disable-next-line prefer-destructuring
            output = output.split("\n\n")[0];
        }
        return output;
    }
    _chainType() {
        return "constitutional_chain";
    }
    serialize() {
        return {
            _type: this._chainType(),
            chain: this.chain.serialize(),
            ConstitutionalPrinciple: this.constitutionalPrinciples.map((principle) => principle.serialize()),
            critiqueChain: this.critiqueChain.serialize(),
            revisionChain: this.revisionChain.serialize(),
        };
    }
}
