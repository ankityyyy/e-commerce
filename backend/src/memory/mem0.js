import MemoryClient from "mem0ai";
import dotenv from "dotenv";

dotenv.config();

export const memClient = new MemoryClient({
  apiKey: process.env.MEM0_API_KEY
});

export async function addMemory(user_id, data) {

  const message = `
    Interest: ${data.interest || ""}
    Category: ${data.category || ""}
    Brand: ${data.brand || ""}
    Color: ${data.color || ""}
    Budget: ${data.budget || ""}
  `;

  await memClient.add(
    [
      {
        role: "user",
        content: message
      }
    ],
    {
      user_id: String(user_id)
    }
  );
}

export async function searchMemory(query, user_id) {
  const results = await memClient.search(query, {
    api_version: "v2",
    filters: { OR: [{ user_id }] },
    limit: 5
  });

  // console.log("Mem0 memories:", results);
  return results;
}