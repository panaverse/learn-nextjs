import { StringPromptValue } from "../prompts/base.js";
import { PromptTemplate } from "../prompts/prompt.js";
import { VectorStoreRetriever, } from "../vectorstores/base.js";
export class HydeRetriever extends VectorStoreRetriever {
    constructor(fields) {
        super(fields);
        Object.defineProperty(this, "llm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "promptTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.llm = fields.llm;
        this.promptTemplate =
            typeof fields.promptTemplate === "string"
                ? getPromptTemplateFromKey(fields.promptTemplate)
                : fields.promptTemplate;
        if (this.promptTemplate) {
            const { inputVariables } = this.promptTemplate;
            if (inputVariables.length !== 1 && inputVariables[0] !== "question") {
                throw new Error(`Prompt template must accept a single input variable 'question'. Invalid input variables for prompt template: ${inputVariables}`);
            }
        }
    }
    async getRelevantDocuments(query) {
        let value = new StringPromptValue(query);
        // Use a custom template if provided
        if (this.promptTemplate) {
            value = await this.promptTemplate.formatPromptValue({ question: query });
        }
        // Get a hypothetical answer from the LLM
        const res = await this.llm.generatePrompt([value]);
        const answer = res.generations[0][0].text;
        // Retrieve relevant documents based on the hypothetical answer
        const results = await this.vectorStore.similaritySearch(answer, this.k, this.filter);
        return results;
    }
}
export function getPromptTemplateFromKey(key) {
    let template;
    switch (key) {
        case "websearch":
            template = `Please write a passage to answer the question 
Question: {question}
Passage:`;
            break;
        case "scifact":
            template = `Please write a scientific paper passage to support/refute the claim 
Claim: {question}
Passage:`;
            break;
        case "arguana":
            template = `Please write a counter argument for the passage 
Passage: {question}
Counter Argument:`;
            break;
        case "trec-covid":
            template = `Please write a scientific paper passage to answer the question
Question: {question}
Passage:`;
            break;
        case "fiqa":
            template = `Please write a financial article passage to answer the question
Question: {question}
Passage:`;
            break;
        case "dbpedia-entity":
            template = `Please write a passage to answer the question.
Question: {question}
Passage:`;
            break;
        case "trec-news":
            template = `Please write a news passage about the topic.
Topic: {question}
Passage:`;
            break;
        case "mr-tydi":
            template = `Please write a passage in Swahili/Korean/Japanese/Bengali to answer the question in detail.
Question: {question}
Passage:`;
            break;
        default:
            throw new Error(`Invalid prompt key: ${key}`);
    }
    return PromptTemplate.fromTemplate(template);
}
