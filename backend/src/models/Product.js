import mongoose from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },
    size:{
        type:[String],
       enum: ["XS","S","M","L","XL","XXL"],
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    subcategory: {
      type: String,
      required: true,
    },

    bestSeller: {
      type: Boolean,
      default: false,
    },

    images: [
      {
        filename: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

productSchema.plugin(mongoosepaginate);
const Product=mongoose.model("Product", productSchema);

export default Product;