import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const llmCall = async ({
  context = [],
  question,
  history = [],
  memories = [],
  facts = []
}) => {

  // =========================
  // VECTOR DB CONTEXT
  // =========================
  const formattedContext = context
    .map(doc => doc.payload?.text)
    .filter(Boolean)
    .join("\n\n");

  // =========================
  // SHORT-TERM MEMORY
  // =========================
  const formattedHistory = history
    .map(msg => `${msg.role}: ${msg.content}`)
    .join("\n");

  // =========================
  // LONG-TERM MEMORY
  // =========================
  const formattedMemories = (memories.results || [])
    .map(mem => mem.memory)
    .join("\n");

  // =========================
  // KNOWLEDGE GRAPH FACTS
  // =========================
  const formattedFacts = facts
    .map(f =>
      `${f.subject} ${f.relation} ${f.object}`
    )
    .join("\n");

  // =========================
  // LLM CALL
  // =========================
  const completion =
    await openai.chat.completions.create({

      model: "gpt-4.1-mini",

      messages: [

        {
          role: "system",

          content: `
You are an AI ecommerce shopping assistant.

Your responsibilities:
- Help users discover products.
- Recommend products from provided context only.
- Use memory for personalization.
- Use conversation history for follow-up questions.
- Use knowledge graph facts for relationships.

Capabilities:
- Understand product intent.
- Handle vague shopping queries.
- Handle typo queries.
- Suggest related products when relevant.

Rules:
- Never invent products.
- Never generate fake prices.
- If information is missing say:
  "I don't know".

Conversation Handling:
- Understand follow-up queries like:
  "cheaper one"
  "another option"
  "show winter wear"
  "something for kids"

Memory Usage:
- Use memories only when relevant.
- Use preferences carefully.

Knowledge Graph Usage:
- Use graph relationships to improve recommendations.
- Use relationships like:
  BELONGS_TO
  CATEGORY
  BESTSELLER_IN
  AVAILABLE_IN

Response Style:
- very short
- no chatbot conversation
- no bullet explanations
- no "would you like"
- no extra discussion
- respond like ecommerce search heading
- examples:
  "Best jeans for you"
  "Popular hoodie collection"
  "Recommended sports shoes"
  "Top picks in winter wear"
`
        },

        {
          role: "user",

          content: `
=========================
USER PREFERENCES
=========================
${formattedMemories || "No stored preferences"}

=========================
RECENT CONVERSATION
=========================
${formattedHistory || "No recent conversation"}

=========================
KNOWLEDGE GRAPH FACTS
=========================
${formattedFacts || "No graph facts"}

=========================
PRODUCT CONTEXT
=========================
${formattedContext || "No product context"}

=========================
CURRENT USER QUESTION
=========================
${question}
`
        }
      ]
    });

  return completion
    .choices[0]
    .message
    .content;
};

export default llmCall;