//  import { QdrantClient } from "@qdrant/js-client-rest";
// import crypto from "crypto";

// export class VectorStore {

//   constructor() {

//     this.client = new QdrantClient({
//       url: "http://localhost:6333"
//     });

//     this.collection = "product";
//   }

//   async deleteCollection() {

//     await this.client.deleteCollection(this.collection);

//     console.log("✅ Collection deleted");
//   }

//   async createCollection() {

//     const collections = await this.client.getCollections();

//     const exists = collections.collections.some(
//       (c) => c.name === this.collection
//     );

//     if (!exists) {

//       await this.client.createCollection(this.collection, {
//         vectors: {
//           size: 1536,
//           distance: "Cosine"
//         }
//       });

//       console.log("✅ Collection created");
//     } else {

//       console.log("📦 Collection already exists");
//     }
//   }

//   async addDocuments(chunks, embeddings, documentId) {

//     const points = chunks.map((chunk, index) => ({
//       id: crypto.randomUUID(),

//       vector: embeddings[index],

//       payload: {
//         text: chunk.pageContent,
//         metadata: chunk.metadata,
//         documentId
//       }
//     }));

//     await this.client.upsert(this.collection, {
//       points
//     });

//     return points.length;
//   }

//   // async similaritySearch(queryVector, limit = 3) {

//   //   const result = await this.client.search(this.collection, {
//   //     vector: queryVector,
//   //     limit,
//   //     with_payload: true
//   //   });

//   //   return result;
//   // }

//   async similaritySearch(
//   queryVector,
//   limit = 7,
//   filter = null
// ) {

//   const result = await this.client.search(
//     this.collection,
//     {
//       vector: queryVector,

//       limit,

//       with_payload: true,

//       filter
//     }
//   );

//   return result;
// }
// }




import { QdrantClient } from "@qdrant/js-client-rest";
import crypto from "crypto";

export class VectorStore {

  constructor() {

    this.client = new QdrantClient({
      url: process.env.QDRANT_URL,
      apiKey: process.env.QDRANT_API_KEY,
    });

    this.collection = "product";
  }

  // =========================
  // CREATE COLLECTION
  // =========================
  async createCollection() {

    try {

      const collections = await this.client.getCollections();

      const exists = collections.collections.some(
        (c) => c.name === this.collection
      );

      if (!exists) {

        await this.client.createCollection(this.collection, {
          vectors: {
            size: 1536,
            distance: "Cosine",
          },
        });

        console.log("✅ Collection created");

      } else {

        console.log("📦 Collection already exists");
      }

    } catch (error) {

      console.log("❌ Error creating collection:", error.message);
    }
  }

  // =========================
  // DELETE COLLECTION
  // =========================
  async deleteCollection() {

    try {

      await this.client.deleteCollection(this.collection);

      console.log("✅ Collection deleted");

    } catch (error) {

      console.log("❌ Error deleting collection:", error.message);
    }
  }

  // =========================
  // ADD DOCUMENTS
  // =========================
  async addDocuments(chunks, embeddings, documentId) {

    try {

      const points = chunks.map((chunk, index) => ({
        id: crypto.randomUUID(),

        vector: embeddings[index],

        payload: {
          text: chunk.pageContent,
          metadata: chunk.metadata,
          documentId,
        },
      }));

      await this.client.upsert(this.collection, {
        points,
      });

      console.log(`✅ ${points.length} documents inserted`);

      return points.length;

    } catch (error) {

      console.log("❌ Error adding documents:", error.message);
    }
  }

  // =========================
  // SIMILARITY SEARCH
  // =========================
  async similaritySearch(
    queryVector,
    limit = 7,
    filter = null
  ) {

    try {

      const result = await this.client.search(
        this.collection,
        {
          vector: queryVector,

          limit,

          with_payload: true,

          filter,
        }
      );

      return result;

    } catch (error) {

      console.log("❌ Error searching vectors:", error.message);

      return [];
    }
  }
}