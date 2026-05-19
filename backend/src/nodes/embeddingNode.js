import { EmbeddingService } from "../services/embd.js";

export const embeddingNode = async (state) => {
  const embeddingService = new EmbeddingService(process.env.OPENAI_API_KEY);

  const embeddings = await embeddingService.createEmbedding(state.queries);

  return {
    ...state,
    embeddings
  };
};