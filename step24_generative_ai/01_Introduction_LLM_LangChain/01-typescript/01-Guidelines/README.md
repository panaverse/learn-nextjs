# LangChain with Typescript

1. Create and navigate to new directory

   ```cmd
   mkdir 01-Guidelines
   cd 01-Guidelines
   ```

2. Initiate a node project in the directory

   ```cmd
   npm init -y
   ```

3. Install required packages

   ```cmd
   npm install -S langchain
   npm i dotenv
   npm i --save-dev @types/node
   ```

4. Initiate typescript in the project

   ```cmd
   tsc --init
   ```

5. Update `tsconfig.json` by changing properties as follows

   ```json
   {
     "compilerOptions": {
        ...
       "target": "ES2020", // or higher
       "module": "nodenext"
     }
   }
   ```

6. Update `package.json` and following to it before `scripts`

   ```json
   "type": "module",
   ```

7. Create API key from `open AI`

   1. Login to [Open AI](https://openai.com/)
   2. Navigate to API page
   3. Click your `profile` on the top right corner
   4. Check your free limit from `Usage` tab, if limit expired buy credits or use some different account
   5. Click `View API Keys`
   6. From the left sidebar open `Api Keys`
   7. Create new secret key
   8. Save your generated key

8. Create `.env` file

   ```env
   OPENAI_API_KEY="<OPEN_KEYS_PASTE_HERE>"
   ```

9. Create `.gitignore` file

   ```gitignore
   node_modules
   .env
   ```

10. Create `app.ts` file

    ```ts
    import { OpenAI } from "langchain/llms/openai";
    import "dotenv/config";
    const llm = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.9,
    });
    async function main() {
      const result = await llm.predict(
        `What would be a good company name for a company that makes colorful socks?`
      );
      console.log(result);
    }
    main();
    ```

11. Transforms TypeScript code into JavaScript code

    ```cmd
    tsc
    ```

12. Run the app

    ```cmd
    node app.js
    ```

13. Running this code will respond with some answer. In my case I got the following response

    ```cmd
    Socktastik.
    ```

---

# Now we will focus on prompt engineering

- We will try to write and run all examples code in **app.ts** file one by one

## Example1:

## Prompting Principles

- **Principle 1: Write clear and specific instructions**
- **Principle 2: Give the model time to “think”**

### Tactics

### Principle 1: Write clear and specific instructions

#### Tactic 1: Use delimiters to clearly indicate distinct parts of the input

- Delimiters can be anything like: ```, """, < >, `<tag> </tag>`, `:`
  **app.ts** file code

```
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
You should express what you want a model to do by \
providing instructions that are as clear and \
specific as you can possibly make them. \
This will guide the model towards the desired output, \
and reduce the chances of receiving irrelevant \
or incorrect responses. Don't confuse writing a \
clear prompt with writing a short prompt. \
In many cases, longer prompts provide more clarity \
and context for the model, which can lead to \
more detailed and relevant outputs.
`

const prompt = `
Summarize the text delimited by triple quotation \
into a single sentence.
"""${text}"""
`
main(prompt);


```

**Output**:
`To successfully utilize a machine-learning model, it is important to provide precise and detailed instructions that will guide the model to the desired output.`

#### Tactic 2: Ask for a structured output

- JSON, HTML

```
const prompt = `Generate a list of three made-up book titles along \
with their authors and genres.
Provide them in JSON format with the following keys:
book_id, title, author, genre.`
```

**output:**

```
[
  {
    "book_id": 1,
    "title": "The Journey to Enlightenment",
    "author": "John Smith",
    "genre": "Fantasy"
  },
  {
    "book_id": 2,
    "title": "The White Wolf",
    "author": "Sarah Perry",
    "genre": "Mystery"
  },
  {
    "book_id": 3,
    "title": "The Mystery of the Lost Treasure",
    "author": "Max Harris",
    "genre": "Adventure"
  }
]
```

#### Tactic 3: Ask the model to check whether conditions are satisfied

**app.ts** file

```
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
Making a cup of tea is easy! First, you need to get some \
water boiling. While that's happening, \
grab a cup and put a tea bag in it. Once the water is \
hot enough, just pour it over the tea bag. \
Let it sit for a bit so the tea can steep. After a \
few minutes, take out the tea bag. If you \
like, you can add some sugar or milk to taste. \
And that's it! You've got yourself a delicious \
cup of tea to enjoy.
`

const prompt = `
You will be provided with text delimited by triple quotes.
If it contains a sequence of instructions, \
re-write those instructions in the following format:

Step 1 - ...
Step 2 - …
…
Step N - …

If the text does not contain a sequence of instructions, \
then simply write "No steps provided."

"""${text}"""
`
main(prompt);
```

**Output**

```
Step 1 - Get water boiling
Step 2 - Grab a cup and put a tea bag in it
Step 3 - Pour the hot water over the tea bag, let it sit for a few minutes
Step 4 - Remove the tea bag
Step 5 - Optionally add sugar or milk to taste
Step 6 - Enjoy a delicious cup of tea!
```

**app.ts** file

```
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
The sun is shining brightly today, and the birds are \
singing. It's a beautiful day to go for a \
walk in the park. The flowers are blooming, and the \
trees are swaying gently in the breeze. People \
are out and about, enjoying the lovely weather. \
Some are having picnics, while others are playing \
games or simply relaxing on the grass. It's a \
perfect day to spend time outdoors and appreciate the \
beauty of nature.
`

const prompt = `
ou will be provided with text delimited by triple quotes.
If it contains a sequence of instructions, \
re-write those instructions in the following format:

Step 1 - ...
Step 2 - …
…
Step N - …

If the text does not contain a sequence of instructions, \
then simply write "No steps provided."

"""${text}"""
`
main(prompt);
```

**output**
`No steps provided.`

#### Tactic 4: "Few-shot" prompting

**app.ts** file code

```
const prompt = `
Your task is to answer in a consistent style.

<child>: Teach me about patience.

<grandparent>: The river that carves the deepest \
valley flows from a modest spring; the \
grandest symphony originates from a single note; \
the most intricate tapestry begins with a solitary thread.

<child>: Teach me about resilience.
`
main(prompt);
```

**output**
`the tiniest acorn; the toughest armor is forged  
from the hottest flame. Resilience is the ability to stand  
up after being knocked down, and to make the most of every situation.`

### Principle 2: Give the model time to “think”

#### Tactic 1: Specify the steps required to complete a task

**app.ts** file code

```
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
Perform the following actions:
1 - Summarize the following text delimited by triple \
quotes with 1 sentence.
2 - Translate the summary into French.
3 - List each name in the French summary.
4 - Output a json object that contains the following \
keys: french_summary, num_names.

Separate your answers with line breaks.

Text:
"""${text}"""
`
main(prompt);
```

**output**

```
Jack et Jill, frères et sœurs, partent à la quête d'eau d'un puits en haut d'une colline.
Jack, Jill
{
  "french_summary": "Jack et Jill, frères et sœurs, partent à la quête d'eau d'un puits en haut d'une colline.",
  "num_names": 2
}
```

**app.ts** file code

```
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

Your task is to perform the following actions:
1 - Summarize the following text delimited by
  <> with 1 sentence.
2 - Translate the summary into French.
3 - List each name in the French summary.
4 - Output a json object that contains the
  following keys: french_summary, num_names.

Use the following format:
Text: <text to summarize>
Summary: <summary>
Translation: <summary translation>
Names: <list of names in Italian summary>
Output JSON: <json with summary and num_names>

Text: <${text}>`

main(prompt);
```

**output**

```
Summary: Jack and Jill set out on an adventure to a hilltop well, but were stopped short when Jack tripped and they both tumbled down the hill.
Translation: Dans un charmant village, les frères et sœurs Jack et Jill sont partis à la quête d'aller chercher de l'eau d'un puits de la crête de la colline, mais leur aventure s'est arrêtée court lorsque Jack est tombé et tous les deux se sont écroulés sur la colline.
Names: Jack, Jill
Output JSON: {
  "french_summary": "Dans un charmant village, les frères et sœurs Jack et Jill sont partis à la quête d'aller chercher de l'eau d'un puits de la crête de la colline, mais leur aventure s'est arrêtée court lorsque Jack est tombé et tous les deux se sont écroulés sur la colline.",
  "num_names": 2
}
```

#### Tactic 2: Instruct the model to work out its own solution before rushing to a conclusion

**app.ts** file code:

```
const prompt = `
Determine if the student's solution is correct or not.

Question:
I'm building a solar power installation and I need \
 help working out the financials.
- Land costs $100 / square foot
- I can buy solar panels for $250 / square foot
- I negotiated a contract for maintenance that will cost \
me a flat $100k per year, and an additional $10 / square \
foot
What is the total cost for the first year of operations
as a function of the number of square feet.

Student's Solution:
Let x be the size of the installation in square feet.
Costs:
1. Land cost: 100x
2. Solar panel cost: 250x
3. Maintenance cost: 100,000 + 100x
Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
`
```

**output**

```
No, the student's solution is not correct. The total cost for the first year of operations should be 450x + 100,000 + 10x, since the maintenance cost is an additional $10 per square foot.
```

#### Note that the student's solution is actually not correct.

#### We can fix this by instructing the model to work out its own solution first.

**app.ts**

```
const prompt = `
Your task is to determine if the student's solution \
is correct or not.
To solve the problem do the following:
- First, work out your own solution to the problem.
- Then compare your solution to the student's solution \
and evaluate if the student's solution is correct or not.
Don't decide if the student's solution is correct until
you have done the problem yourself.

Use the following format:
Question:
"""
question here
"""
Student's solution:
"""
student's solution here
"""
Actual solution:
"""
steps to work out the solution and your solution here
"""
Is the student's solution the same as actual solution \
just calculated:
"""
yes or no
"""
Student grade:
"""
correct or incorrect
"""

Question:
"""
I'm building a solar power installation and I need help \
working out the financials.
- Land costs $100 / square foot
- I can buy solar panels for $250 / square foot
- I negotiated a contract for maintenance that will cost \
me a flat $100k per year, and an additional $10 / square \
foot
What is the total cost for the first year of operations \
as a function of the number of square feet.
"""
Student's solution:
"""
Let x be the size of the installation in square feet.
Costs:
1. Land cost: 100x
2. Solar panel cost: 250x
3. Maintenance cost: 100,000 + 100x
Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000
"""
Actual solution:
`
```

**output**

```
Let x be the size of the installation in square feet.

Costs:
1. Land cost: 100x
2. Solar panel cost: 250x
3. Maintenance cost: 100,000 + 10x
Total cost: 100x + 250x + 100,000 + 10x = 360x + 100,000
"""
Is the student's solution the same as actual solution just calculated:
"""
No
"""
Student grade:
"""
Incorrect
"""
```

## Model Limitations: Hallucinations

- Boie is a real company, the product name is not real.

**app.ts**

```
const prompt = `
Tell me about AeroGlide UltraSlim Smart Toothbrush by Boie

`
```

**output**:
`The AeroGlide UltraSlim Smart Toothbrush by Boie is a revolutionary toothbrush that uses ultrasonic technology, light and vibration to clean and remove plaque from your teeth. It has five brushing modes, all using advanced cleaning and whitening technology for a more thorough brushing experience. The built-in Bluetooth connectivity allows you to connect to a smartphone app to track your brushing habits and progress. The brush also has a timer that pauses every 30 seconds to remind you to switch to the next quadrant of your mouth, and shuts off after two minutes to ensure that you have brushed for the recommended time. The brush is powered with a single AAA battery and is designed to last up to 3 months on a single battery.`

## Try experimenting on your own!

#### A note about the backslash

- In the course, we are using a backslash `\` to make the text fit on the screen without inserting newline '\n' characters.
- GPT-3 isn't really affected whether you insert newline characters or not. But when working with LLMs in general, you may consider whether newline characters in your prompt may affect the model's performance

---

# 02 Jupiter Model

```
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
OVERVIEW
- Part of a beautiful family of mid-century inspired office furniture,
including filing cabinets, desks, bookcases, meeting tables, and more.
- Several options of shell color and base finishes.
- Available with plastic back and front upholstery (SWC-100)
or full upholstery (SWC-110) in 10 fabric and 6 leather options.
- Base finish options are: stainless steel, matte black,
gloss white, or chrome.
- Chair is available with or without armrests.
- Suitable for home or business settings.
- Qualified for contract use.

CONSTRUCTION
- 5-wheel plastic coated aluminum base.
- Pneumatic chair adjust for easy raise/lower action.

DIMENSIONS
- WIDTH 53 CM | 20.87”
- DEPTH 51 CM | 20.08”
- HEIGHT 80 CM | 31.50”
- SEAT HEIGHT 44 CM | 17.32”
- SEAT DEPTH 41 CM | 16.14”

OPTIONS
- Soft or hard-floor caster options.
- Two choices of seat foam densities:
 medium (1.8 lb/ft3) or high (2.8 lb/ft3)
- Armless or 8 position PU armrests

MATERIALS
SHELL BASE GLIDER
- Cast Aluminum with modified nylon PA6/PA66 coating.
- Shell thickness: 10 mm.
SEAT
- HD36 foam

COUNTRY OF ORIGIN
- Italy
`
const prompt = `
fact_sheet_chair = """
OVERVIEW
- Part of a beautiful family of mid-century inspired office furniture,
including filing cabinets, desks, bookcases, meeting tables, and more.
- Several options of shell color and base finishes.
- Available with plastic back and front upholstery (SWC-100)
or full upholstery (SWC-110) in 10 fabric and 6 leather options.
- Base finish options are: stainless steel, matte black,
gloss white, or chrome.
- Chair is available with or without armrests.
- Suitable for home or business settings.
- Qualified for contract use.

CONSTRUCTION
- 5-wheel plastic coated aluminum base.
- Pneumatic chair adjust for easy raise/lower action.

DIMENSIONS
- WIDTH 53 CM | 20.87”
- DEPTH 51 CM | 20.08”
- HEIGHT 80 CM | 31.50”
- SEAT HEIGHT 44 CM | 17.32”
- SEAT DEPTH 41 CM | 16.14”

OPTIONS
- Soft or hard-floor caster options.
- Two choices of seat foam densities:
 medium (1.8 lb/ft3) or high (2.8 lb/ft3)
- Armless or 8 position PU armrests

MATERIALS
SHELL BASE GLIDER
- Cast Aluminum with modified nylon PA6/PA66 coating.
- Shell thickness: 10 mm.
SEAT
- HD36 foam

COUNTRY OF ORIGIN
- Italy
Text:
"""${text}"""
`
main(prompt);
```

### Output

`This fact sheet is for a mid-century inspired chair. It is available in several options of shell color and base finishes, and with or without armrests. It has a 5-wheel plastic coated aluminum base and pneumatic chair adjust for easy raise/lower action. It also has two choices of seat foam densities (medium or high) and several caster options (soft or hard-floor). The shell base glider is made of cast aluminum with modified nylon PA6/PA66 coating, and the seat is made of HD36 foam. It is suitable for home or business settings and is qualified for contract use. It is made in Italy.`

# Description needs a table of dimensions

```
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
OVERVIEW
- Part of a beautiful family of mid-century inspired office furniture,
including filing cabinets, desks, bookcases, meeting tables, and more.
- Several options of shell color and base finishes.
- Available with plastic back and front upholstery (SWC-100)
or full upholstery (SWC-110) in 10 fabric and 6 leather options.
- Base finish options are: stainless steel, matte black,
gloss white, or chrome.
- Chair is available with or without armrests.
- Suitable for home or business settings.
- Qualified for contract use.

CONSTRUCTION
- 5-wheel plastic coated aluminum base.
- Pneumatic chair adjust for easy raise/lower action.

DIMENSIONS
- WIDTH 53 CM | 20.87”
- DEPTH 51 CM | 20.08”
- HEIGHT 80 CM | 31.50”
- SEAT HEIGHT 44 CM | 17.32”
- SEAT DEPTH 41 CM | 16.14”

OPTIONS
- Soft or hard-floor caster options.
- Two choices of seat foam densities:
 medium (1.8 lb/ft3) or high (2.8 lb/ft3)
- Armless or 8 position PU armrests

MATERIALS
SHELL BASE GLIDER
- Cast Aluminum with modified nylon PA6/PA66 coating.
- Shell thickness: 10 mm.
SEAT
- HD36 foam

COUNTRY OF ORIGIN
- Italy
`

const prompt = `
Your task is to help a marketing team create a
description for a retail website of a product based
on a technical fact sheet.

Write a product description based on the information
provided in the technical specifications delimited by
triple qoutes.

The description is intended for furniture retailers,
so should be technical in nature and focus on the
materials the product is constructed from.

At the end of the description, include every 7-character
Product ID in the technical specification.

After the description, include a table that gives the
product's dimensions. The table should have two columns.
In the first column include the name of the dimension.
In the second column include the measurements in inches only.

Give the table the title 'Product Dimensions'.

Format everything as HTML that can be used in a website.
Place the description in a  element.

Technical specifications:
Text:
"""${text}"""
`
main(prompt);
```

### Output

```

<p>Introducing the stylish and comfortable SWC-100 & SWC-110 mid-century inspired office chairs. Constructed from a 5-wheel plastic coated aluminum base and HD36 foam seat, these chairs are suitable for home or business settings. The base finish is available in stainless steel, matte black, gloss white, or chrome, while the back and front upholstery is available in 10 fabric and 6 leather options. The chair is also available with or without armrests, and with soft or hard-floor caster options. With two choices of seat foam densities, medium (1.8 lb/ft3) or high (2.8 lb/ft3) and 8 position PU armrests, this chair is the perfect addition to any interior. The Product ID for this chair are: SWC-100 and SWC-110.</p>


<table>
	<caption>Product Dimensions</caption>
    <tr>
        <th>Dimension</th>
        <th>Measurement (in)</th>
    </tr>
    <tr>
    	<td>Width</td>
        <td>20.87</td>
```
