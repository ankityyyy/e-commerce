import React, { useState } from "react";
import NavBar from "../components/Nav.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../redux/feature/Product.jsx";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, loading } = useSelector((state) => state.product);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    sizes: [],
    category: "",
    subcategory: "",
    bestSeller: false,
    image: null,
  });

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, value],
      });
    } else {
      setFormData({
        ...formData,
        sizes: formData.sizes.filter((s) => s !== value),
      });
    }
  };

 

  const handleBestSeller = (e) => {
    setFormData({
      ...formData,
      bestSeller: e.target.checked,
    });
  };

  
  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  // 🔹 Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("bestSeller", formData.bestSeller);
    data.append("image", formData.image);

    formData.sizes.forEach((size) => {
      data.append("sizes", size);
    });

    dispatch(createProduct(data))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.error("Product creation failed:", err);
      });
  };

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex">
      <NavBar />
      <Sidebar />

      <div className="flex-1 flex justify-center items-start py-15 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-[#1c1c1c] p-6 rounded-2xl shadow-lg flex flex-col gap-2"
        >
          <h2 className="text-2xl font-semibold text-center">
            ADD PRODUCT
          </h2>
           

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded bg-[#2a2a2a] outline-none"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="p-3 rounded bg-[#2a2a2a] outline-none"
          />

          {/* Price + Stock */}
          <div className="flex gap-4">
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-1/2 p-3 rounded bg-[#2a2a2a]"
            />

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
              className="w-1/2 p-3 rounded bg-[#2a2a2a]"
            />
          </div>

          {/* Category */}
          <div className="flex gap-4">
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="w-1/2 p-3 rounded bg-[#2a2a2a]"
            />

            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="Subcategory"
              className="w-1/2 p-3 rounded bg-[#2a2a2a]"
            />
          </div>

          {/* Sizes */}
          <div>
            <p className="mb-2">Available Sizes</p>
            <div className="flex gap-4 flex-wrap">
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={size}
                    onChange={handleSizeChange}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bestseller */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.bestSeller}
              onChange={handleBestSeller}
            />
            <span>Mark as Bestseller</span>
          </label>

          {/* Image */}
          <input
            type="file"
            onChange={handleImageChange}
            className="p-2 bg-[#2a2a2a] rounded"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 p-3 rounded font-medium"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>

          {error && (
            <p className="text-red-500 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}