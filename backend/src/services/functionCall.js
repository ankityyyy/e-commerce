import OpenAI from "openai";
import { searchProducts, tools } from "./productService.js";

const client = new OpenAI({
  apiKey:process.env.OPENAI_API_KEY
});

const systemPrompt = `
You are an AI shopping assistant for an e-commerce store.

Your job is to help users find products from the store.

RULES:

1. When the user asks to find, search, show, recommend, or filter products, use the searchProducts tool.

2. Extract only the product requirements that the user actually mentions.

3. Do not invent or assume filters that the user did not provide.

4. Price filters are optional. If the user does not mention a price, do not provide minPrice or maxPrice.

5. Size is optional. Only provide a size when the user mentions one.

6. Use the user's product terms as the query.

7. Never invent products, prices, stock, categories, sizes, images, or other product information.

8. Product information must come from the searchProducts tool results.

9. After receiving the tool results, give a SHORT conversational response.

10. Do NOT list the products in your response.

11. Do NOT include product names, prices, descriptions, sizes, image URLs, Markdown images, or product links in your response.

12. The frontend will display the products separately using the products returned by the tool.

13. If products are found, respond with a short message such as:
   "Here are some jackets available for you."

14. If no products are found, respond:
   "Sorry, I couldn't find any matching products."

15. Do not expose tool calls, JSON, database queries, or internal implementation details.

The current store product search is handled by the searchProducts tool.
`;

const getSearchRes = async (query) => {
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: query,
      },
    ],

    tools: tools,
  });

  const toolCall = response.choices[0].message.tool_calls[0].function;

  const args = JSON.parse(toolCall.arguments);

  const result = await searchProducts(args);
  

  const finalResponse = await client.chat.completions.create({
    model: "gpt-4o-mini",

    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      {
        role: "user",
        content: query,
      },
      response.choices[0].message,
      {
        role: "tool",
        tool_call_id: response.choices[0].message.tool_calls[0].id,
        content: JSON.stringify(result),
      },
    ],
  });

  const aiMessage = finalResponse.choices[0].message.content;

  

  return {
    products:result,
    answer:aiMessage,
  };
};

export { getSearchRes };

// response = {
//   choices: [
//     {
//       message: {
//         tool_calls: [
//           {
//             function: {
//               name: "searchProducts",
//               arguments: '{"query":"jeans","maxPrice":2000}'
//             }
//           }
//         ]
//       }
//     }
//   ]
// };
