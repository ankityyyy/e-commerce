import {queryFacts} from "../Knowledgegraph/graph.js";

export const kgNode = async (state) => {
  const facts = await queryFacts(state.query);

  return {
    ...state,
    facts
  };
};