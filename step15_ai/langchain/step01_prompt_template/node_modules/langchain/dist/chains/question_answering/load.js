import { LLMChain } from "../llm_chain.js";
import { StuffDocumentsChain, MapReduceDocumentsChain, RefineDocumentsChain, } from "../combine_docs_chain.js";
import { QA_PROMPT_SELECTOR } from "./stuff_prompts.js";
import { COMBINE_PROMPT_SELECTOR, COMBINE_QA_PROMPT_SELECTOR, } from "./map_reduce_prompts.js";
import { QUESTION_PROMPT_SELECTOR, REFINE_PROMPT_SELECTOR, } from "./refine_prompts.js";
export const loadQAChain = (llm, params = { type: "stuff" }) => {
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
export function loadQAStuffChain(llm, params = {}) {
    const { prompt = QA_PROMPT_SELECTOR.getPrompt(llm), verbose } = params;
    const llmChain = new LLMChain({ prompt, llm, verbose });
    const chain = new StuffDocumentsChain({ llmChain, verbose });
    return chain;
}
export function loadQAMapReduceChain(llm, params = {}) {
    const { combineMapPrompt = COMBINE_QA_PROMPT_SELECTOR.getPrompt(llm), combinePrompt = COMBINE_PROMPT_SELECTOR.getPrompt(llm), verbose, returnIntermediateSteps, } = params;
    const llmChain = new LLMChain({ prompt: combineMapPrompt, llm, verbose });
    const combineLLMChain = new LLMChain({ prompt: combinePrompt, llm, verbose });
    const combineDocumentChain = new StuffDocumentsChain({
        llmChain: combineLLMChain,
        documentVariableName: "summaries",
        verbose,
    });
    const chain = new MapReduceDocumentsChain({
        llmChain,
        combineDocumentChain,
        returnIntermediateSteps,
        verbose,
    });
    return chain;
}
export function loadQARefineChain(llm, params = {}) {
    const { questionPrompt = QUESTION_PROMPT_SELECTOR.getPrompt(llm), refinePrompt = REFINE_PROMPT_SELECTOR.getPrompt(llm), verbose, } = params;
    const llmChain = new LLMChain({ prompt: questionPrompt, llm, verbose });
    const refineLLMChain = new LLMChain({ prompt: refinePrompt, llm, verbose });
    const chain = new RefineDocumentsChain({
        llmChain,
        refineLLMChain,
        verbose,
    });
    return chain;
}
