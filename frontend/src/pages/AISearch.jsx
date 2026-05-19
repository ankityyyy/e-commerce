import React from "react";
import Card from "../components/Card";
import { useSelector } from "react-redux";
import Title from "../components/Title.jsx";

function AISearch() {

  const {
    products,
    aiMessage,
    loading,
    error,
  } = useSelector((state) => state.search);

  return (

    <div className="min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] ">

      {/* AI MESSAGE */}

     {aiMessage && (

  <div className="w-full flex items-center justify-center mb-[20px]">

    <div className="max-w-[900px] w-full bg-gradient-to-r from-[#1f2937] to-[#111827] border border-[#374151] shadow-lg rounded-2xl px-[25px] py-[20px] mt-[120px]">

      <p className="text-[#d1fae5] text-[22px] font-semibold tracking-wide text-center">
        {aiMessage}
      </p>

    </div>

  </div>

)}

      {/* LOADING */}

      {loading && (
        <h1 className="text-center text-white text-[25px] mt-[50px]">
          Searching Products...
        </h1>
      )}

      {/* ERROR */}

      {error && (
        <h1 className="text-center text-red-500 text-[22px] mt-[50px]">
          {error}
        </h1>
      )}

      {/* NO PRODUCTS */}

      {!loading && products.length === 0 && (
        <h1 className="text-center text-gray-400 text-[22px] mt-[50px]">
          No Products Found
        </h1>
      )}

      {/* PRODUCTS */}

      <div className="w-full flex items-center justify-center flex-wrap gap-[30px] mt-[50px] pb-[50px]">

        {products.map((product) => (

          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.images?.[0]?.url}
            price={product.price}
          />

        ))}

      </div>

    </div>
  );
}

export default AISearch;