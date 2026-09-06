const tools = [
  {
    type: "function",
    function: {
      name: "searchProducts",
      description: "Search products based on the user's requirements.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Product name or keyword.",
          },
          category: {
            type: "string",
            description: "Product category.",
          },

          subcategory: {
            type: "string",
            description: "Specific product type.",
          },

          size: {
            type: "string",
            enum: ["XS", "S", "M", "L", "XL", "XXL"],
          },

          minPrice: {
            type: "number",
          },

          maxPrice: {
            type: "number",
          },

          bestSeller: {
            type: "boolean",
          },

          inStock: {
            type: "boolean",
          },
        },
        required: [],
      },
    },
  },
];



import Product from "../models/Product.js";

const searchProducts = async ({
  query,
  category,
  subcategory,
  size,
  minPrice,
  maxPrice,
  bestSeller,
  inStock,
}) => {

  const filter = {};

  if (query) {
    filter.name = {
      $regex: query,
      $options: "i",
    };
  }

  if (category) {
    filter.category = category;
  }

  if (subcategory) {
    filter.subcategory = subcategory;
  }

  if (size) {
    filter.size = size;
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};

    if (minPrice !== undefined) {
      filter.price.$gte = minPrice;
    }

    if (maxPrice !== undefined) {
      filter.price.$lte = maxPrice;
    }
  }

  if (bestSeller !== undefined) {
    filter.bestSeller = bestSeller;
  }

  if (inStock === true) {
    filter.stock = { $gt: 0 };
  }

  return await Product.find(filter);
};

export {searchProducts,tools}