import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateQueries = async (question) => {

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: `
You are an ecommerce search query expander.

Generate short product-focused search variations.

Rules:
- Keep queries short.
- Focus on shopping/product intent.
- Do not generate informational or educational queries.
- Do not generate complete questions.
- Keep product meaning similar.

Examples:

Input:
"show shirt"

Output:
[
  "shirt",
  "casual shirt",
  "cotton shirt"
]

Input:
"gaming laptop under 70000"

Output:
[
  "gaming laptop",
  "RTX laptop under 70000",
  "budget gaming laptop"
]
        `
      },
      {
        role: "user",
        content: question
      }
    ],
     max_tokens: 150,
  temperature: 0.3
  });

  const text = completion.choices[0].message.content;

  // convert text → array
  const queries = text
    .split("\n")
    .map(q => q.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

 
  return queries;
};