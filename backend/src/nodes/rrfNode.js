import {rrfFusion} from "../services/rrf.js"

export const rrfNode = async (state) => {
  const fusedResults = rrfFusion(state.searchResults);

  return {
    ...state,
    fusedResults
  };
};