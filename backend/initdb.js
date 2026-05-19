import mongoose from "mongoose";
import Product from "./src/models/product.js";
import dotenv from "dotenv";
dotenv.config();

const userId = new mongoose.Types.ObjectId("69e897f8e4e44d8b3e24cf72");

const products = [
  {
    userId,
    name: "Men Casual Shirt",
    description: "Comfortable cotton casual shirt",
    price: 799,
    stock: 50,
    category: "Men",
    subcategory: "TopWear",
    bestSeller: false,
    size:["S","L"],
    images: [
      {
        filename: "amazon/shirt1",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849785/amazon/lmrwhcxz721dmgklr9gu.jpg"
      }
    ]
  },
  {
    userId,
    name: "Men Jeans",
    description: "Slim fit denim jeans",
    price: 1299,
    stock: 35,
    category: "Men",
    subcategory: "BottomWear",
    bestSeller: false,
    size:["S","L","M"],
    images: [
      {
        filename: "amazon/jeans1",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849736/amazon/ulzw2hxrlr7mlq3fos9d.jpg"
      }
    ]
  },
  {
    userId,
    name: "Men Winter Jacket",
    description: "Warm winter jacket",
    price: 1999,
    stock: 20,
    category: "Men",
    subcategory: "WinterWear",
    bestSeller:true,
    size:["S","L"],
    images: [
      {
        filename: "amazon/jacket1",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849684/amazon/zetvivq5wpy0iuuncalf.jpg"
      }
    ]
  },

  {
    userId,
    name: "Women Top",
    description: "Stylish casual top",
    price: 699,
    stock: 45,
    category: "Women",
    subcategory: "TopWear",
    bestSeller: true,
    size:["XS","L","M"],
    images: [
      {
        filename: "amazon/women_top",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849812/amazon/ykleyob3z6vajdlfacat.jpg"
      }
    ]
  },
  {
    userId,
    name: "Women Jeans",
    description: "High waist jeans",
    price: 1399,
    stock: 25,
    category: "Women",
    subcategory: "BottomWear",
    bestSeller: true,
    size:["XS"],
    images: [
      {
        filename: "amazon/women_jeans",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849815/amazon/w15ilaawilajdioeslhx.jpg"
      }
    ]
  },
  {
    userId,
    name: "Women Jacket",
    description: "Winter jacket for women",
    price: 1899,
    stock: 15,
    category: "Women",
    subcategory: "WinterWear",
    bestSeller: false,
    size:["XS","L","M","XXL"],
    images: [
      {
        filename: "amazon/women_jacket",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849689/amazon/botuicfzihkono3es5ne.jpg"
      }
    ]
  },

  {
    userId,
    name: "Kids T-Shirt",
    description: "Soft cotton t-shirt",
    price: 399,
    stock: 50,
    category: "Kids",
    subcategory: "TopWear",
    bestSeller: false,
    size:["XS"],
    images: [
      {
        filename: "amazon/kids_tshirt",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849719/amazon/ve8plwc6byxcuipcganb.jpg"
      }
    ]
  },
  {
    userId,
    name: "Kids Jeans",
    description: "Durable kids jeans",
    price: 799,
    stock: 35,
    category: "Kids",
    subcategory: "BottomWear",
    bestSeller: false,
     size:["XS"],
    images: [
      {
        filename: "amazon/kids_jeans",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849699/amazon/bwyvxkis3kguxtfuiset.jpg"
      }
    ]
  },
  {
    userId,
    name: "Kids Jacket",
    description: "Warm jacket for kids",
    price: 1499,
    stock: 20,
    category: "Kids",
    subcategory: "WinterWear",
    bestSeller: true,
     size:["XS","S"],
    images: [
      {
        filename: "amazon/kids_jacket",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849680/amazon/eirzdfah03a3zjtprbsp.jpg"
      }
    ]
  },

  {
    userId,
    name: "Samsung Mobile",
    description: "Latest smartphone",
    price: 15000,
    stock: 25,
    category: "Electronics",
    subcategory: "Mobile",
    bestSeller: true,
    images: [
      {
        filename: "amazon/mobile",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849674/amazon/fhat1dfiavcoq1ivkti7.jpg"
      }
    ]
  },
  

  
  {
    userId,
    name: "Lipstick",
    description: "Long lasting lipstick",
    price: 399,
    stock: 45,
    category: "Beauty",
    subcategory: "Makeup",
    bestSeller: false,
    images: [
      {
        filename: "amazon/lipstick",
        url: "https://res.cloudinary.com/dla54wxc5/image/upload/v1776849825/amazon/zyueagjjdvtsvywh9urj.jpg"
      }
    ]
  },

  
];

export const insertProducts = async () => {
     try{
       await mongoose.connect(process.env.ATLASDB_URL);
       await Product.deleteMany();
               const result = await Product.insertMany( products);

    console.log("✅ Products inserted:", result.length);

    process.exit();
  } catch (err) {
    console.error("❌ Error inserting products:", err.message);
    process.exit(1);
  }
}

