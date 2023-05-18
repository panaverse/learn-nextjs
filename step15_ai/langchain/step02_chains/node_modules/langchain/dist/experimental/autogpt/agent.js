import { LLMChain } from "../../chains/llm_chain.js";
import { AutoGPTOutputParser } from "./output_parser.js";
import { AutoGPTPrompt } from "./prompt.js";
import { AIChatMessage, HumanChatMessage, SystemChatMessage, } from "../../schema/index.js";
// import { HumanInputRun } from "./tools/human/tool"; // TODO
import { FINISH_NAME } from "./schema.js";
import { TokenTextSplitter } from "../../text_splitter.js";
import { getEmbeddingContextSize, getModelContextSize, } from "../../base_language/count_tokens.js";
export class AutoGPT {
    constructor({ aiName, memory, chain, outputParser, tools, feedbackTool, maxIterations, }) {
        Object.defineProperty(this, "aiName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "memory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "fullMessageHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "nextActionCount", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "chain", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "outputParser", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "tools", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "feedbackTool", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxIterations", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // Currently not generic enough to support any text splitter.
        Object.defineProperty(this, "textSplitter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.aiName = aiName;
        this.memory = memory;
        this.fullMessageHistory = [];
        this.nextActionCount = 0;
        this.chain = chain;
        this.outputParser = outputParser;
        this.tools = tools;
        this.feedbackTool = feedbackTool;
        this.maxIterations = maxIterations;
        const chunkSize = getEmbeddingContextSize("modelName" in memory.vectorStore.embeddings
            ? memory.vectorStore.embeddings.modelName
            : undefined);
        this.textSplitter = new TokenTextSplitter({
            chunkSize,
            chunkOverlap: Math.round(chunkSize / 10),
        });
    }
    static fromLLMAndTools(llm, tools, { aiName, aiRole, memory, maxIterations = 100, 
    // humanInTheLoop = false,
    outputParser = new AutoGPTOutputParser(), }) {
        const prompt = new AutoGPTPrompt({
            aiName,
            aiRole,
            tools,
            tokenCounter: llm.getNumTokens.bind(llm),
            sendTokenLimit: getModelContextSize("modelName" in llm ? llm.modelName : "gpt2"),
        });
        // const feedbackTool = humanInTheLoop ? new HumanInputRun() : null;
        const chain = new LLMChain({ llm, prompt });
        return new AutoGPT({
            aiName,
            memory,
            chain,
            outputParser,
            tools,
            // feedbackTool,
            maxIterations,
        });
    }
    async run(goals) {
        const user_input = "Determine which next command to use, and respond using the format specified above:";
        let loopCount = 0;
        while (loopCount < this.maxIterations) {
            loopCount += 1;
            const { text: assistantReply } = await this.chain.call({
                goals,
                user_input,
                memory: this.memory,
                messages: this.fullMessageHistory,
            });
            // Print the assistant reply
            console.log(assistantReply);
            this.fullMessageHistory.push(new HumanChatMessage(user_input));
            this.fullMessageHistory.push(new AIChatMessage(assistantReply));
            const action = await this.outputParser.parse(assistantReply);
            const tools = this.tools.reduce((acc, tool) => ({ ...acc, [tool.name]: tool }), {});
            if (action.name === FINISH_NAME) {
                return action.args.response;
            }
            let result;
            if (action.name in tools) {
                const tool = tools[action.name];
                let observation;
                try {
                    observation = await tool.call(action.args);
                }
                catch (e) {
                    observation = `Error in args: ${e}`;
                }
                result = `Command ${tool.name} returned: ${observation}`;
            }
            else if (action.name === "ERROR") {
                result = `Error: ${action.args}. `;
            }
            else {
                result = `Unknown command '${action.name}'. Please refer to the 'COMMANDS' list for available commands and only respond in the specified JSON format.`;
            }
            let memoryToAdd = `Assistant Reply: ${assistantReply}\nResult: ${result} `;
            if (this.feedbackTool) {
                const feedback = `\n${await this.feedbackTool.call("Input: ")}`;
                if (feedback === "q" || feedback === "stop") {
                    console.log("EXITING");
                    return "EXITING";
                }
                memoryToAdd += feedback;
            }
            const documents = await this.textSplitter.createDocuments([memoryToAdd]);
            await this.memory.addDocuments(documents);
            this.fullMessageHistory.push(new SystemChatMessage(result));
        }
        return undefined;
    }
}
