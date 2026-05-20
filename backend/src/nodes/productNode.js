import Product from "../models/Product.js";

export const productNode = async (state) => {
  try {

    // =========================
    // USE FILTERED RESULTS
    // =========================
    const results =
      state.finalResults || state.fusedResults;

    const topProductIds = results
      .slice(0, 5)
      .map(d => d.payload?.metadata?.productId)
      .filter(Boolean);

    const products = await Product.find({
      _id: { $in: topProductIds }
    });

    // preserve vector order
    const productsMap = new Map();

    products.forEach(product => {
      productsMap.set(
        product._id.toString(),
        product
      );
    });

    const finalProducts = topProductIds
      .map(id => productsMap.get(id))
      .filter(Boolean);

    return {
      ...state,
      products: finalProducts
    };

  } catch (err) {

    console.error("productNode error:", err);

    return {
      ...state,
      products: []
    };
  }
};