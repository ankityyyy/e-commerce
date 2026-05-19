import Product from "../../models/product.js";
import { EmbeddingService } from "../../services/embd.js";
import crypto from "crypto";
 import { VectorStore } from "../../services/vectoeStore.js";
 import {generateQueries} from "../../services/queryGenerator.js"
 import {rrfFusion} from "../../services/rrf.js"
 import llmCall from "../../services/llm.js"
 import { getHistory, addMessage } from "../../memory/shortMemory.js";
import { addMemory ,searchMemory} from "../../memory/mem0.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../../utils/ExpressError.js";
import { extractTriples } from "../../Knowledgegraph/graphExtractor.js";
import { addTriples,queryFacts} from "../../Knowledgegraph/graph.js";
import {ragGraph} from "../../graph/productGraph.js" 

export const storeDataInVd=async(req,res,next)=>{

     const allData = await Product.find({});

    // const documents = allData.map((product) => {
    //   const text = `
    //   name: ${product.name},
    //   description: ${product.description},
    //   price: ${product.price},
    //   stock: ${product.stock},
    //   category: ${product.category},
    //   subcategory: ${product.subcategory},
    //   bestSeller: ${product.bestSeller},
    //   size: ${product.size?.join(", ")}
    //   `;
    //   return text;
    // })

    const documents = allData.map(product => ({
  pageContent: `
    Product Name: ${product.name}
    Description: ${product.description}
    Price: ${product.price}
    Stock: ${product.stock}
    Category: ${product.category}
    Subcategory: ${product.subcategory}
    Sizes: ${product.size?.join(", ")}
    Bestseller: ${product.bestSeller}
  `,
  
  metadata: {
    productId: product._id.toString(),
    category: product.category,
    subcategory: product.subcategory,
    price: product.price
  }
}));

const texts = documents.map(doc => doc.pageContent);




  
    
    const embeddingService = new EmbeddingService(process.env.OPENAI_API_KEY);
    
        const embeddings = await embeddingService.createEmbedding(texts);
    
       

        const documentId = crypto.randomUUID();
        
            const vectorStore = new VectorStore();
        
      
            
        
            await vectorStore.addDocuments(documents, embeddings,documentId );

            

for (const product of allData) {

  const triples = extractTriples(product);

  await addTriples(triples);
}

            res.json({
      message: "product data processed",
      chunks: documents.length,
      embeddings: embeddings.length,
      documentId:documentId,
    });
}


// export const query = async (req, res, next) => {

//   let { query, user_id } = req.body;

//   if (!query || !user_id) {
//     throw new ExpressError(
//       "query and user_id are required",
//       StatusCodes.BAD_REQUEST
//     );
//   }

//   // =========================
//   // SHORT TERM MEMORY
//   // =========================
//   const history = getHistory(user_id);

//   // =========================
//   // LONG TERM MEMORY
//   // =========================
//   const memories = await searchMemory(
//     query,
//     user_id
//   );

//   // =========================
//   // KNOWLEDGE GRAPH
//   // =========================
//   const facts = await queryFacts(query);

//   // =========================
//   // QUERY EXPANSION
//   // =========================
//   const queries = await generateQueries(query);

//   // =========================
//   // EMBEDDINGS
//   // =========================
//   const embeddingService =
//     new EmbeddingService(
//       process.env.OPENAI_API_KEY
//     );

//   const embeddings =
//     await embeddingService.createEmbedding(
//       queries
//     );

//   // =========================
//   // VECTOR STORE
//   // =========================
//   const vectorStore = new VectorStore();

//   // =========================
//   // DYNAMIC FILTERS
//   // =========================
//   const subcategories = [
//     "TopWear",
//     "BottomWear",
//     "WinterWear",
//     "Makeup"
//   ];

//   const categories = [
//     "Men",
//     "Women",
//     "Kids",
//     "Beauty"
//   ];

//   let filter = null;

//   const matchedSubcategory =
//     subcategories.find(sub =>
//       query.toLowerCase().includes(
//         sub.toLowerCase()
//       )
//     );

//   const matchedCategory =
//     categories.find(cat =>
//       query.toLowerCase().includes(
//         cat.toLowerCase()
//       )
//     );

//   const must = [];

//   if (matchedSubcategory) {

//     must.push({
//       key: "metadata.subcategory",
//       match: {
//         value: matchedSubcategory
//       }
//     });
//   }

//   if (matchedCategory) {

//     must.push({
//       key: "metadata.category",
//       match: {
//         value: matchedCategory
//       }
//     });
//   }

//   if (must.length > 0) {
//     filter = { must };
//   }

//   // =========================
//   // VECTOR SEARCH
//   // =========================
//   const searchResults =
//     await Promise.all(

//       embeddings.map(vec =>
//         vectorStore.similaritySearch(
//           vec,
//           7,
//           filter
//         )
//       )
//     );

//   // =========================
//   // RRF FUSION
//   // =========================
//   const fusedResults =
//     rrfFusion(searchResults);

//   // =========================
//   // PRODUCT IDS
//   // =========================
//   const topProductIds =
//     fusedResults

//       .slice(0, 5)

//       .map(doc =>
//         doc.payload?.metadata?.productId
//       )

//       .filter(Boolean);

//   // =========================
//   // FETCH PRODUCTS
//   // =========================
//   const products =
//     await Product.find({
//       _id: { $in: topProductIds }
//     });

//   // =========================
//   // PRESERVE VECTOR ORDER
//   // =========================
//   const productsMap = new Map();

//   products.forEach(product => {

//     productsMap.set(
//       product._id.toString(),
//       product
//     );
//   });

//   const finalProducts =
//     topProductIds

//       .map(id =>
//         productsMap.get(id)
//       )

//       .filter(Boolean);

//   // =========================
//   // LLM RESPONSE
//   // =========================
//   const answer = await llmCall({

//     context: fusedResults,

//     question: query,

//     history,

//     memories,

//     facts
//   });

//   // =========================
//   // SAVE SHORT MEMORY
//   // =========================
//   addMessage(
//     user_id,
//     "user",
//     query
//   );

//   addMessage(
//     user_id,
//     "assistant",
//     answer
//   );

//   // =========================
//   // SAVE LONG MEMORY
//   // =========================
//   if (

//     query.includes("like") ||

//     query.includes("prefer") ||

//     query.includes("under") ||

//     query.includes("budget")

//   ) {

//     await addMemory(
//       user_id,
//       {
//         interest: query
//       }
//     );
//   }

//   // =========================
//   // DEBUG LOGS
//   // =========================
//   console.log("Queries:", queries);

//   console.log(
//     "Fused Results:",
//     fusedResults
//   );

//   console.log(
//     "Facts:",
//     facts
//   );

//   console.log(
//     "Memories:",
//     memories
//   );

//   console.log(
//     "History:",
//     history
//   );

//   console.log(
//     "Filter:",
//     filter
//   );

//   // =========================
//   // RESPONSE
//   // =========================
//   res.json({

//     message: "query processed",

//     answer,

//     products: finalProducts
//   });
// };


export const query = async (req, res, next) => {

    const { query } = req.body;

     const user_id= req.user?._id;

    if (!user_id) {
        return next(
          new ExpressError(
            "User not authenticated",
            StatusCodes.UNAUTHORIZED
          )
        );
    }

    if (!query) {
        return next(
          new ExpressError(
            "query is required",
            StatusCodes.BAD_REQUEST
          )
        );
    }

    const result = await ragGraph.invoke(
      {
        query,
       user_id,
      },
      {
        configurable: {
          thread_id:user_id.toString()
        },
      }
    );

    res.json({
      message: "query processed",
      answer: result.answer,
      products: result.products,
    });
};