import 'dotenv/config';
import { PromptTemplate } from "langchain/prompts";
const template = "What is a good name for a company that makes {product}?";
const prompt = new PromptTemplate({
    template: template,
    inputVariables: ["product"],
});
const res = await prompt.format({ product: "colorful socks" });
console.log(res);
