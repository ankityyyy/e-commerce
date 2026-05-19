import { VectorStore } from "../services/vectoeStore.js";

export const vectorSearchNode = async (state) => {
  const vectorStore = new VectorStore();

  const searchResults = await Promise.all(
    state.embeddings.map(vec =>
      vectorStore.similaritySearch(vec, 7, state.filter)
    )
  );

  return {
    ...state,
    searchResults
  };
};