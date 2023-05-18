"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatAgent = void 0;
const llm_chain_js_1 = require("../../chains/llm_chain.cjs");
const chat_js_1 = require("../../prompts/chat.cjs");
const agent_js_1 = require("../agent.cjs");
const outputParser_js_1 = require("./outputParser.cjs");
const prompt_js_1 = require("./prompt.cjs");
const DEFAULT_HUMAN_MESSAGE_TEMPLATE = "{input}\n\n{agent_scratchpad}";
/**
 * Agent for the MRKL chain.
 * @augments Agent
 */
class ChatAgent extends agent_js_1.Agent {
    constructor(input) {
        const outputParser = input?.outputParser ?? ChatAgent.getDefaultOutputParser();
        super({ ...input, outputParser });
    }
    _agentType() {
        return "chat-zero-shot-react-description";
    }
    observationPrefix() {
        return "Observation: ";
    }
    llmPrefix() {
        return "Thought:";
    }
    _stop() {
        return ["Observation:"];
    }
    static validateTools(tools) {
        const invalidTool = tools.find((tool) => !tool.description);
        if (invalidTool) {
            const msg = `Got a tool ${invalidTool.name} without a description.` +
                ` This agent requires descriptions for all tools.`;
            throw new Error(msg);
        }
    }
    static getDefaultOutputParser(_fields) {
        return new outputParser_js_1.ChatAgentOutputParser();
    }
    async constructScratchPad(steps) {
        const agentScratchpad = await super.constructScratchPad(steps);
        if (agentScratchpad) {
            return `This was your previous work (but I haven't seen any of it! I only see what you return as final answer):\n${agentScratchpad}`;
        }
        return agentScratchpad;
    }
    /**
     * Create prompt in the style of the zero shot agent.
     *
     * @param tools - List of tools the agent will have access to, used to format the prompt.
     * @param args - Arguments to create the prompt with.
     * @param args.suffix - String to put after the list of tools.
     * @param args.prefix - String to put before the list of tools.
     * @param args.humanMessageTemplate - String to use directly as the human message template
     */
    static createPrompt(tools, args) {
        const { prefix = prompt_js_1.PREFIX, suffix = prompt_js_1.SUFFIX, humanMessageTemplate = DEFAULT_HUMAN_MESSAGE_TEMPLATE, } = args ?? {};
        const toolStrings = tools
            .map((tool) => `${tool.name}: ${tool.description}`)
            .join("\n");
        const template = [prefix, toolStrings, prompt_js_1.FORMAT_INSTRUCTIONS, suffix].join("\n\n");
        const messages = [
            chat_js_1.SystemMessagePromptTemplate.fromTemplate(template),
            chat_js_1.HumanMessagePromptTemplate.fromTemplate(humanMessageTemplate),
        ];
        return chat_js_1.ChatPromptTemplate.fromPromptMessages(messages);
    }
    static fromLLMAndTools(llm, tools, args) {
        ChatAgent.validateTools(tools);
        const prompt = ChatAgent.createPrompt(tools, args);
        const chain = new llm_chain_js_1.LLMChain({
            prompt,
            llm,
            callbacks: args?.callbacks ?? args?.callbackManager,
        });
        const outputParser = args?.outputParser ?? ChatAgent.getDefaultOutputParser();
        return new ChatAgent({
            llmChain: chain,
            outputParser,
            allowedTools: tools.map((t) => t.name),
        });
    }
}
exports.ChatAgent = ChatAgent;
