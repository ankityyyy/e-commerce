// graphExtractor.js

export function extractTriples(product) {

  const triples = [];

  // Product -> Category
  triples.push({
    subject: product.name,
    subjectType: "Product",

    relation: "CATEGORY",

    object: product.category,
    objectType: "Category"
  });

  // Product -> Subcategory
  triples.push({
    subject: product.name,
    subjectType: "Product",

    relation: "BELONGS_TO",

    object: product.subcategory,
    objectType: "Subcategory"
  });

  // Bestseller relation
  if (product.bestSeller) {

    triples.push({
      subject: product.name,
      subjectType: "Product",

      relation: "BESTSELLER_IN",

      object: product.category,
      objectType: "Category"
    });
  }

  // Sizes
  if (product.size?.length) {

    product.size.forEach(size => {

      triples.push({
        subject: product.name,
        subjectType: "Product",

        relation: "AVAILABLE_IN",

        object: size,
        objectType: "Size"
      });

    });
  }

  return triples;
}