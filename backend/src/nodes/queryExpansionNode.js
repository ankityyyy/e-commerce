import {generateQueries} from "../services/queryGenerator.js"

export const queryExpansionNode = async (state) => {
  const queries = await generateQueries(state.query);

  return {
    ...state,
    queries
  };
};