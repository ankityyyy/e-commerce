import { extractTriples } from "../Knowledgegraph/graphExtractor.js";
import { addTriples } from "../Knowledgegraph/graph.js";

export const ingestionNode = async (state) => {
  const { product } = state;

  const triples = await extractTriples(product.pageContent || product);

  for (const t of triples) {
    await addTriples(t.subject, t.relation, t.object);
  }

  return state;
};