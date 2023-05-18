"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadQARefineChain = exports.loadQAMapReduceChain = exports.loadQAStuffChain = exports.loadQAChain = void 0;
const llm_chain_js_1 = require("../llm_chain.cjs");
const combine_docs_chain_js_1 = require("../combine_docs_chain.cjs");
const stuff_prompts_js_1 = require("./stuff_prompts.cjs");
const map_reduce_prompts_js_1 = require("./map_reduce_prompts.cjs");
const refine_prompts_js_1 = require("./refine_prompts.cjs");
const loadQAChain = (llm, params = { type: "stuff" }) => {
    const { type } = params;
    if (type === "stuff") {
        return loadQAStuffChain(llm, params);
    }
    if (type === "map_reduce") {
        return loadQAMapReduceChain(llm, params);
    }
    if (type === "refine") {
        return loadQARefineChain(llm, params);
    }
    throw new Error(`Invalid _type: ${type}`);
};
exports.loadQAChain = loadQAChain;
function loadQAStuffChain(llm, params = {}) {
    const { prompt = stuff_prompts_js_1.QA_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new llm_chain_js_1.LLMChain({ prompt, llm, verbose });
    const chain = new combine_docs_chain_js_1.StuffDocumentsChain({ llmChain, verbose });
    return chain;
}
exports.loadQAStuffChain = loadQAStuffChain;
function loadQAMapReduceChain(llm, params = {}) {
    const { combineMapPrompt = map_reduce_prompts_js_1.COMBINE_QA_PROMPT_SELECTOR.getPrompt(llm), combinePrompt = map_reduce_prompts_js_1.COMBINE_PROMPT_SELECTOR.getPrompt(llm), verbose, returnIntermediateSteps, } = params;
    const llmChain = new llm_chain_js_1.LLMChain({ prompt: combineMapPrompt, llm, verbose });
    const combineLLMChain = new llm_chain_js_1.LLMChain({ prompt: combinePrompt, llm, verbose });
    const combineDocumentChain = new combine_docs_chain_js_1.StuffDocumentsChain({
        llmChain: combineLLMChain,
        documentVariableName: "summaries",
        verbose,
    });
    const chain = new combine_docs_chain_js_1.MapReduceDocumentsChain({
        llmChain,
        combineDocumentChain,
        returnIntermediateSteps,
        verbose,
    });
    return chain;
}
exports.loadQAMapReduceChain = loadQAMapReduceChain;
function loadQARefineChain(llm, params = {}) {
    const { questionPrompt = refine_prompts_js_1.QUESTION_PROMPT_SELECTOR.getPrompt(llm), refinePrompt = refine_prompts_js_1.REFINE_PROMPT_SELECTOR.getPrompt(llm), verbose, } = params;
    const llmChain = new llm_chain_js_1.LLMChain({ prompt: questionPrompt, llm, verbose });
    const refineLLMChain = new llm_chain_js_1.LLMChain({ prompt: refinePrompt, llm, verbose });
    const chain = new combine_docs_chain_js_1.RefineDocumentsChain({
        llmChain,
        refineLLMChain,
        verbose,
    });
    return chain;
}
exports.loadQARefineChain = loadQARefineChain;
