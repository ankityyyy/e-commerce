export function rrfFusion(results, k = 60) {
  const scores = new Map();

  results.forEach((list) => {

    if (!Array.isArray(list)) {
      console.log("Invalid list:", list);
      return;
    }

    list.forEach((item, rank) => {

      const key = item.id;

      if (!scores.has(key)) {
        scores.set(key, { item, score: 0 });
      }

      scores.get(key).score += 1 / (k + rank);
    });
  });

  return Array.from(scores.values())
    .sort((a, b) => b.score - a.score)
    .map(obj => ({
      ...obj.item,
      rrfScore: obj.score
    }));
}