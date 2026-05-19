 import llmCall from "../services/llm.js"

export const llmNode = async (state) => {
  const answer = await llmCall({
    context: state.fusedResults,
    question: state.query,
    history: state.history,
    memories: state.memories,
    facts: state.facts
  });

  return {
    ...state,
    answer
  };
};