import OpenAI from "openai";

export class EmbeddingService {
 
  constructor(apiKey) {
    this.client = new OpenAI({ apiKey });
    this.model = "text-embedding-3-small";
  }

  async createEmbedding(text) {

    const inputArray = Array.isArray(text) ? text : [text];

    const response = await this.client.embeddings.create({
      model: this.model,
      input: inputArray
    });

   
    
   let data=response.data.map(e => e.embedding);
    return data;
  }

}