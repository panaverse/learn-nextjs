"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChatModel = exports.isLLM = exports.ConditionalPromptSelector = exports.BasePromptSelector = void 0;
class BasePromptSelector {
}
exports.BasePromptSelector = BasePromptSelector;
class ConditionalPromptSelector extends BasePromptSelector {
    constructor(default_prompt, conditionals = []) {
        super();
        Object.defineProperty(this, "defaultPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "conditionals", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.defaultPrompt = default_prompt;
        this.conditionals = conditionals;
    }
    getPrompt(llm) {
        for (const [condition, prompt] of this.conditionals) {
            if (condition(llm)) {
                return prompt;
            }
        }
        return this.defaultPrompt;
    }
}
exports.ConditionalPromptSelector = ConditionalPromptSelector;
function isLLM(llm) {
    return llm._modelType() === "base_llm";
}
exports.isLLM = isLLM;
function isChatModel(llm) {
    return llm._modelType() === "base_chat_model";
}
exports.isChatModel = isChatModel;
