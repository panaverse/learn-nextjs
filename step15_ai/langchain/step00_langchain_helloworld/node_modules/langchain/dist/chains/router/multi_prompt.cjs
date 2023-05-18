"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiPromptChain = void 0;
const zod_1 = require("zod");
const multi_route_js_1 = require("./multi_route.cjs");
const multi_prompt_prompt_js_1 = require("./multi_prompt_prompt.cjs");
const template_js_1 = require("../../prompts/template.cjs");
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const prompt_js_1 = require("../../prompts/prompt.cjs");
const llm_router_js_1 = require("./llm_router.cjs");
const conversation_js_1 = require("../../chains/conversation.cjs");
const utils_js_1 = require("./utils.cjs");
const router_js_1 = require("../../output_parsers/router.cjs");
class MultiPromptChain extends multi_route_js_1.MultiRouteChain {
    static fromPrompts(llm, promptNames, promptDescriptions, promptTemplates, defaultChain, options) {
        const destinations = (0, utils_js_1.zipEntries)(promptNames, promptDescriptions).map(([name, desc]) => `${name}: ${desc}`);
        const structuredOutputParserSchema = zod_1.z.object({
            destination: zod_1.z
                .string()
                .optional()
                .describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: zod_1.z
                .object({
                input: zod_1.z
                    .string()
                    .describe("a potentially modified version of the original input"),
            })
                .describe("input to be fed to the next model"),
        });
        const outputParser = new router_js_1.RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = (0, template_js_1.interpolateFString)((0, multi_prompt_prompt_js_1.STRUCTURED_MULTI_PROMPT_ROUTER_TEMPLATE)(outputParser.getFormatInstructions({ interpolationDepth: 4 })), {
            destinations: destinationsStr,
        });
        const routerPrompt = new prompt_js_1.PromptTemplate({
            template: routerTemplate,
            inputVariables: ["input"],
            outputParser,
        });
        const routerChain = llm_router_js_1.LLMRouterChain.fromLLM(llm, routerPrompt);
        const destinationChains = (0, utils_js_1.zipEntries)(promptNames, promptTemplates).reduce((acc, [name, template]) => {
            let myPrompt;
            if (typeof template === "object") {
                myPrompt = template;
            }
            else if (typeof template === "string") {
                myPrompt = new prompt_js_1.PromptTemplate({
                    template: template,
                    inputVariables: ["input"],
                });
            }
            else {
                throw new Error("Invalid prompt template");
            }
            acc[name] = new llm_chain_js_1.LLMChain({
                llm,
                prompt: myPrompt,
            });
            return acc;
        }, {});
        const convChain = new conversation_js_1.ConversationChain({
            llm,
            outputKey: "text",
        });
        return new MultiPromptChain({
            routerChain,
            destinationChains,
            defaultChain: defaultChain ?? convChain,
            ...options,
        });
    }
    _chainType() {
        return "multi_prompt_chain";
    }
}
exports.MultiPromptChain = MultiPromptChain;
