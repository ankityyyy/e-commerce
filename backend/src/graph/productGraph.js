import { StateGraph, START, END, MemorySaver } from "@langchain/langgraph";
// import { checkpointer } from "../redis/checkpointer.js";

import { loadContextNode } from "../nodes/loadContextNode.js";
import { memoryNode } from "../nodes/memoryNode.js";
import { queryExpansionNode } from "../nodes/queryExpansionNode.js";
import { embeddingNode } from "../nodes/embeddingNode.js";
import { vectorSearchNode } from "../nodes/vectorSearchNode.js";
import { rrfNode } from "../nodes/rrfNode.js";
import { kgNode } from "../nodes/kgNode.js";
import { productNode } from "../nodes/productNode.js";
import { llmNode } from "../nodes/llmNode.js";
import {graphQueryNode} from "../nodes/graphQueryNode.js"
import { filterNode } from "../nodes/filterNode.js";

const graph = new StateGraph({
  channels: {
    query: null,
    user_id: null,
    history: null,
    memories: null,
    facts: null,
    queries: null,
    embeddings: null,
    searchResults: null,
    fusedResults: null,
    products: null,
    answer: null,
    filter: null
  }
});


graph.addNode("load", loadContextNode);
graph.addNode("memory", memoryNode);
graph.addNode("expand", queryExpansionNode);
graph.addNode("embed", embeddingNode);
graph.addNode("vector", vectorSearchNode);
graph.addNode("rrf", rrfNode);
graph.addNode("filte", filterNode);
graph.addNode("kgQuery", graphQueryNode); 
graph.addNode("product", productNode);
graph.addNode("llm", llmNode);

graph.addEdge(START, "load");

graph.addEdge("load", "memory");
graph.addEdge("memory", "expand");

graph.addEdge("expand", "embed");
graph.addEdge("embed", "vector");

graph.addEdge("vector", "rrf");
graph.addEdge("rrf", "filte");
// 🔥 KG should enrich retrieval BEFORE product selection
graph.addEdge("filte", "kgQuery");

graph.addEdge("kgQuery", "product");

graph.addEdge("product", "llm");

graph.addEdge("llm", END);

 const checkpointer = new MemorySaver();

export const ragGraph = graph.compile({
  checkpointer
});