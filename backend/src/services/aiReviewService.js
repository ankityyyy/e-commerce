import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

import Product from "../models/Product.js";
import Review from "../models/review.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateReviewSummary(productId) {

  try {

    // 1. Find product
    const product = await Product.findById(productId);

    if (!product) {
      return {
        error: "Product not found"
      };
    }

    // 2. Find reviews
    const reviews = await Review.find({
      productId: productId,
      isDeleted: false
    });

    console.log(reviews);

    if (!reviews.length) {
      return {
        error: "No reviews found"
      };
    }

    // 3. Convert reviews to text
    const reviewText = reviews
      .map((review, index) => {
        return `
Review ${index + 1}
Rating: ${review.rating}
Comment: ${review.comment}
`;
      })
      .join("\n");

    // 4. AI summary
    const response =
      await openai.chat.completions.create({

        model: "gpt-4.1-mini",

        messages: [

          {
  role: "system",
  content: `
You are an AI assistant for an ecommerce platform.

Analyze customer reviews carefully.

Rules:
- Mention overall customer sentiment
- Mention positives
- Mention negatives
- If reviews are too short, still generate a natural human-readable summary
- Keep summary under 80 words
`
},

          {
            role: "user",

            content: `
Product:
${product.title}

Reviews:
${reviewText}
`
          }
        ]
      });

    // 5. Return
    return {

      product: product.title,

      summary:
        response.choices[0].message.content
    };

  } catch (error) {

    console.log(error);

    return {
      error: "Review AI failed"
    };
  }
}