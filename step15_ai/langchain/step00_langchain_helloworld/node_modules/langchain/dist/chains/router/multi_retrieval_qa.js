import { z } from "zod";
import { MultiRouteChain } from "./multi_route.js";
import { interpolateFString } from "../../prompts/template.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { LLMRouterChain } from "./llm_router.js";
import { ConversationChain, DEFAULT_TEMPLATE, } from "../../chains/conversation.js";
import { STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE } from "./multi_retrieval_prompt.js";
import { zipEntries } from "./utils.js";
import { RetrievalQAChain } from "../../chains/retrieval_qa.js";
import { RouterOutputParser } from "../../output_parsers/router.js";
export class MultiRetrievalQAChain extends MultiRouteChain {
    get outputKeys() {
        return ["result"];
    }
    static fromRetrievers(llm, retrieverNames, retrieverDescriptions, retrievers, retrieverPrompts, defaults, options) {
        const { defaultRetriever, defaultPrompt, defaultChain } = defaults ?? {};
        if (defaultPrompt && !defaultRetriever) {
            throw new Error("`default_retriever` must be specified if `default_prompt` is \nprovided. Received only `default_prompt`.");
        }
        const destinations = zipEntries(retrieverNames, retrieverDescriptions).map(([name, desc]) => `${name}: ${desc}`);
        const structuredOutputParserSchema = z.object({
            destination: z
                .string()
                .optional()
                .describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: z
                .object({
                query: z
                    .string()
                    .describe("a potentially modified version of the original input"),
            })
                .describe("input to be fed to the next model"),
        });
        const outputParser = new RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = interpolateFString(STRUCTURED_MULTI_RETRIEVAL_ROUTER_TEMPLATE(outputParser.getFormatInstructions({ interpolationDepth: 4 })), {
            destinations: destinationsStr,
        });
        const routerPrompt = new PromptTemplate({
            template: routerTemplate,
            inputVariables: ["input"],
            outputParser,
        });
        const routerChain = LLMRouterChain.fromLLM(llm, routerPrompt);
        const prompts = retrieverPrompts ?? retrievers.map(() => null);
        const destinationChains = zipEntries(retrieverNames, retrievers, prompts).reduce((acc, [name, retriever, prompt]) => {
            let opt;
            if (prompt) {
                opt = { prompt };
            }
            acc[name] = RetrievalQAChain.fromLLM(llm, retriever, opt);
            return acc;
        }, {});
        let _defaultChain;
        if (defaultChain) {
            _defaultChain = defaultChain;
        }
        else if (defaultRetriever) {
            _defaultChain = RetrievalQAChain.fromLLM(llm, defaultRetriever, {
                prompt: defaultPrompt,
            });
        }
        else {
            const promptTemplate = DEFAULT_TEMPLATE.replace("input", "query");
            const prompt = new PromptTemplate({
                template: promptTemplate,
                inputVariables: ["history", "query"],
            });
            _defaultChain = new ConversationChain({
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
