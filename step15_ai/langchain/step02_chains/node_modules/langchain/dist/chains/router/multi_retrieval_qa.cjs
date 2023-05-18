"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiRetrievalQAChain = void 0;
const zod_1 = require("zod");
const multi_route_js_1 = require("./multi_route.cjs");
const template_js_1 = require("../../prompts/template.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const llm_router_js_1 = require("./llm_router.cjs");
const conversation_js_1 = require("../../chains/conversation.cjs");
const multi_retrieval_prompt_js_1 = require("./multi_retrieval_prompt.cjs");
const utils_js_1 = require("./utils.cjs");
const retrieval_qa_js_1 = require("../../chains/retrieval_qa.cjs");
const router_js_1 = require("../../output_parsers/router.cjs");
class MultiRetrievalQAChain extends multi_route_js_1.MultiRouteChain {
    get outputKeys() {
        return ["result"];
    }
    static fromRetrievers(llm, retrieverNames, retrieverDescriptions, retrievers, retrieverPrompts, defaults, options) {
        const { defaultRetriever, defaultPrompt, defaultChain } = defaults ?? {};
        if (defaultPrompt && !defaultRetriever) {
            throw new Error("`default_retriever` must be specified if `default_prompt` is \nprovided. Received only `default_prompt`.");
        }
        const destinations = (0, utils_js_1.zipEntries)(retrieverNames, retrieverDescriptions).map(([name, desc]) => `${name}: ${desc}`);
        const structuredOutputParserSchema = zod_1.z.object({
            destination: zod_1.z
                .string()
                .optional()
                .describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: zod_1.z
                .object({
                query: zod_1.z
                    .string()
                    .describe("a potentially modified version of the original input"),
            })
                .describe("input to be fed to the next model"),
        });
        const outputParser = new router_js_1.RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = (0, template_js_1.interpolateFString)((0, multi_retrieval_prompt_js_1.STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE)(outputParser.getFormatInstructions({ interpolationDepth: 4 })), {
            destinations: destinationsStr,
        });
        const routerPrompt = new prompt_js_1.PromptTemplate({
            template: routerTemplate,
            inputVariables: ["input"],
            outputParser,
        });
        const routerChain = llm_router_js_1.LLMRouterChain.fromLLM(llm, routerPrompt);
        const prompts = retrieverPrompts ?? retrievers.map(() => null);
        const destinationChains = (0, utils_js_1.zipEntries)(retrieverNames, retrievers, prompts).reduce((acc, [name, retriever, prompt]) => {
            let opt;
            if (prompt) {
                opt = { prompt };
            }
            acc[name] = retrieval_qa_js_1.RetrievalQAChain.fromLLM(llm, retriever, opt);
            return acc;
        }, {});
        let _defaultChain;
        if (defaultChain) {
            _defaultChain = defaultChain;
        }
        else if (defaultRetriever) {
            _defaultChain = retrieval_qa_js_1.RetrievalQAChain.fromLLM(llm, defaultRetriever, {
                prompt: defaultPrompt,
            });
        }
        else {
            const promptTemplate = conversation_js_1.DEFAULT_TEMPLATE.replace("input", "query");
            const prompt = new prompt_js_1.PromptTemplate({
                template: promptTemplate,
                inputVariables: ["history", "query"],
            });
            _defaultChain = new conversation_js_1.ConversationChain({
                llm,
                prompt,
                outputKey: "result",
            });
        }
        return new MultiRetrievalQAChain({
            routerChain,
            destinationChains,
            defaultChain: _defaultChain,
            ...options,
        });
    }
    _chainType() {
        return "multi_retrieval_qa_chain";
    }
}
exports.MultiRetrievalQAChain = MultiRetrievalQAChain;
