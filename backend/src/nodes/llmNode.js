 import llmCall from "../services/llm.js"

export const llmNode = async (state) => {
  console.log("context:", state.fusedResults,)
  console.log("question:", state.query,)
  console.log("history:", state.history,)
  console.log("memories:", state.memories,)
  console.log("facts:", state.facts)
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