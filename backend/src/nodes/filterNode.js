export const filterNode = async (state) => {

  const { query, fusedResults } = state;

  // =========================
  // QUERY WORDS
  // =========================
  const queryWords = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(" ")
    .filter(word => word.length > 2);

  // =========================
  // FILTER RESULTS
  // =========================
  const filteredResults =
    fusedResults.filter(doc => {

      const text =
        doc.payload?.text?.toLowerCase() || "";

      return queryWords.some(word =>
        text.includes(word)
      );
    });

  // fallback
  const finalResults =
    filteredResults.length > 0
      ? filteredResults
      : fusedResults;

  return {
    ...state,
    finalResults
  };
};