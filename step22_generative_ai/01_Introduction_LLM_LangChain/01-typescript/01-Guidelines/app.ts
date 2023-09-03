import { OpenAI } from "langchain/llms/openai";
import 'dotenv/config';

//  console.log(process.env.OPENAI_API_KEY);

const llm = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
});


async function main(prompt:string) {
    
    const result = await llm.predict(`${prompt}`);
    // Handle the result...
    console.log(result)
}
const text = `
In a charming village, siblings Jack and Jill set out on \ 
a quest to fetch water from a hilltop \ 
well. As they climbed, singing joyfully, misfortune \ 
struck—Jack tripped on a stone and tumbled \ 
down the hill, with Jill following suit. \ 
Though slightly battered, the pair returned home to \ 
comforting embraces. Despite the mishap, \ 
their adventurous spirits remained undimmed, and they \ 
continued exploring with delight.
`

const prompt = `
Tell me about AeroGlide UltraSlim Smart Toothbrush by Boie

`
main(prompt);