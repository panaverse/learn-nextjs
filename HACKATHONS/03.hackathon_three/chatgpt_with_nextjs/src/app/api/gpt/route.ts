import { NextResponse } from "next/server";
import openai from "../../../../openai-config";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `I want you to act as a Nutrition Facts Generator. I will provide you with a recipe and your role is to generate nutrition facts for that recipe. You should use your knowledge of nutrition science, nutrition facts labels and other relevant information to generate nutritional information for the recipe. Add each nutrition fact to a new line. I want you to only reply with the nutrition fact. Do not provide any other information. My first request is: ${req.recipe}`,
        },
      ],
    });
    return NextResponse.json({
      gpt: response.choices[0].message.content,
      status: "success",
    });
  } catch (error: any) {
    return NextResponse.json({ status: "failure", error: error });
  }
}
