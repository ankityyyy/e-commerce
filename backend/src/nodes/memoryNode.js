import { addMessage } from "../memory/shortMemory.js";
import { addMemory, searchMemory } from "../memory/mem0.js";

export const memoryNode = async (state) => {
  const { query, user_id } = state;


  addMessage(user_id, "user", query);

  
  const memories = await searchMemory(query, user_id);

  return {
    ...state,
    memories,
  };
};