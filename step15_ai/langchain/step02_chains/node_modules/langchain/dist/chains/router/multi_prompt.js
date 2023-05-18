import { z } from "zod";
import { MultiRouteChain } from "./multi_route.js";
import { STRUCTURED_MULTI_PROMPT_ROUTER_TEMPLATE } from "./multi_prompt_prompt.js";
import { interpolateFString } from "../../prompts/template.js";
import { LLMChain } from "../../chains/llm_chain.js";
import { PromptTemplate } from "../../prompts/prompt.js";
import { LLMRouterChain } from "./llm_router.js";
import { ConversationChain } from "../../chains/conversation.js";
import { zipEntries } from "./utils.js";
import { RouterOutputParser } from "../../output_parsers/router.js";
export class MultiPromptChain extends MultiRouteChain {
    static fromPrompts(llm, promptNames, promptDescriptions, promptTemplates, defaultChain, options) {
        const destinations = zipEntries(promptNames, promptDescriptions).map(([name, desc]) => `${name}: ${desc}`);
        const structuredOutputParserSchema = z.object({
            destination: z
                .string()
                .optional()
                .describe('name of the question answering system to use or "DEFAULT"'),
            next_inputs: z
                .object({
                input: z
                    .string()
                    .describe("a potentially modified version of the original input"),
            })
                .describe("input to be fed to the next model"),
        });
        const outputParser = new RouterOutputParser(structuredOutputParserSchema);
        const destinationsStr = destinations.join("\n");
        const routerTemplate = interpolateFString(STRUCTURED_MULTI_PROMPT_ROUTER_TEMPLATE(outputParser.getFormatInstructions({ interpolationDepth: 4 })), {
            destinations: destinationsStr,
        });
        const routerPrompt = new PromptTemplate({
            template: routerTemplate,
            inputVariables: ["input"],
            outputParser,
        });
        const routerChain = LLMRouterChain.fromLLM(llm, routerPrompt);
        const destinationChains = zipEntries(promptNames, promptTemplates).reduce((acc, [name, template]) => {
            let myPrompt;
            if (typeof template === "object") {
                myPrompt = template;
            }
            else if (typeof template === "string") {
                myPrompt = new PromptTemplate({
                    template: template,
                    inputVariables: ["input"],
                });
            }
            else {
                throw new Error("Invalid prompt template");
            }
            acc[name] = new LLMChain({
                llm,
                prompt: myPrompt,
            });
            return acc;
        }, {});
        const convChain = new ConversationChain({
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
