import { queryFacts } from "../Knowledgegraph/graph.js";

export const graphQueryNode = async (state) => {
  try {
    const { query } = state;

    const facts = await queryFacts(query);

    return {
      ...state,
      facts: facts || []
    };
  } catch (err) {
    console.error("graphQueryNode error:", err);

    return {
      ...state,
      facts: []
    };
  }
};