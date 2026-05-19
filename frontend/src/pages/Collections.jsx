// import React, { useEffect,useState } from "react";
// import Title from "../components/Title.jsx";
// import { useSelector, useDispatch } from "react-redux";
// import Card from "../components/Card.jsx";
// import { getProduct } from "../redux/feature/Product.jsx";

// function Collections() {

// const { product: products = [], loading, error } = useSelector(
//     (state) => state.product
//   );

//   const dispatch = useDispatch();

//   const [selectedCategory, setSelectedCategory] = useState([]);
// const [selectedSubCategory, setSelectedSubCategory] = useState([]);

//   useEffect(() => {
//     dispatch(getProduct());
//   }, [dispatch]);


//   return (
//     <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden">

//       {/* LEFT FILTER PANEL */}
//       <div className="md:w-[30vw] lg:w-[20vw] w-full md:min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed top-[70px] left-0">
//         <p className="text-[25px] font-semibold">FILTERS</p>

//         {/* CATEGORY */}
//         <div className="border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600">
//           <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

//           <div className="flex flex-col gap-2 mt-2">
//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="Men" className="w-3" />
//               Men
//             </label>

//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="Women" className="w-3" />
//               Women
//             </label>

//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="Kids" className="w-3" />
//               Kids
//             </label>
//           </div>
//         </div>

//         {/* SUB CATEGORY */}
//         <div className="border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600">
//           <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>

//           <div className="flex flex-col gap-2 mt-2">
//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="TopWear" className="w-3" />
//               TopWear
//             </label>

//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="BottomWear" className="w-3" />
//               BottomWear
//             </label>

//             <label className="flex gap-2 text-[16px] font-light">
//               <input type="checkbox" value="WinterWear" className="w-3" />
//               WinterWear
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT CONTENT */}
//       <div className="w-full lg:pl-[20%] md:pl-[30vw] px-5">

//         {/* TOP BAR */}
//         <div className="flex flex-col md:flex-row justify-between items-center mb-6">
//           <Title text1="ALL" text2="COLLECTIONS" />

//           <select
//             className="bg-slate-600 text-white px-3 py-2 rounded-md mt-3 md:mt-0"
//             defaultValue="relevant"
//           >
//             <option value="relevant">Sort By Relavent</option>
//             <option value="low-high">Price: Low to High</option>
//             <option value="high-low">Price: High to Low</option>
//           </select>
//         </div>

// {loading && <p className="text-center mt-5">Loading...</p>}
//       {error && <p className="text-center mt-5 text-red-500">{error}</p>}

//         {/* PRODUCT GRID (placeholder) */}
//        <div className="w-full mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
//         {products.map((item) => (
//           <Card
//             key={item._id}
//             name={item.name}
//             image={item.images?.[0]?.url}   
//             id={item._id}
//             price={item.price}
//           />
//         ))}
//       </div>
        

//       </div>
//     </div>
//   );
// }

// export default Collections;


import React, { useEffect, useState } from "react";
import Title from "../components/Title.jsx";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card.jsx";
import { getProduct } from "../redux/feature/Product.jsx";

function Collections() {
  // const { product: products = [], loading, error } = useSelector(
  //   (state) => state.product
  // );

   const { products, loading ,error} = useSelector((state) => state.product);
  

  const dispatch = useDispatch();

  // ✅ FILTER STATES
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  // ✅ HANDLE CATEGORY
  const handleCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ HANDLE SUBCATEGORY
  const handleSubCategoryChange = (e) => {
    const value = e.target.value;

    setSelectedSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // ✅ FILTER + SORT LOGIC
  const filteredProducts = products
    .filter((item) => {
      const categoryMatch =
        selectedCategory.length === 0 ||
        selectedCategory.includes(item.category);

      const subCategoryMatch =
        selectedSubCategory.length === 0 ||
        selectedSubCategory.includes(item.subCategory);

      return categoryMatch && subCategoryMatch;
    })
    .sort((a, b) => {
      if (sortType === "low-high") return a.price - b.price;
      if (sortType === "high-low") return b.price - a.price;
      return 0;
    });

  return (
    <div className="w-full min-h-screen bg-gradient-to-l from-[#141414] to-[#0c2025] flex flex-col md:flex-row pt-[70px] overflow-x-hidden">
      
      {/* LEFT FILTER PANEL */}
      <div className="md:w-[30vw] lg:w-[20vw] w-full md:min-h-screen p-5 border-r border-gray-400 text-[#aaf5fa] lg:fixed top-[70px] left-0">
        <p className="text-[25px] font-semibold">FILTERS</p>

        {/* CATEGORY */}
        <div className="border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600">
          <p className="text-[18px] text-[#f8fafa]">CATEGORIES</p>

          <div className="flex flex-col gap-2 mt-2">
            <label className="flex gap-2">
              <input type="checkbox" value="Men" onChange={handleCategoryChange} />
              Men
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Women" onChange={handleCategoryChange} />
              Women
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Kids" onChange={handleCategoryChange} />
              Kids
            </label>
          </div>
        </div>

        {/* SUB CATEGORY */}
        <div className="border-2 border-[#dedcdc] pl-5 py-3 mt-6 rounded-md bg-slate-600">
          <p className="text-[18px] text-[#f8fafa]">SUB-CATEGORIES</p>

          <div className="flex flex-col gap-2 mt-2">
            <label className="flex gap-2">
              <input type="checkbox" value="TopWear" onChange={handleSubCategoryChange} />
              TopWear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="BottomWear" onChange={handleSubCategoryChange} />
              BottomWear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="WinterWear" onChange={handleSubCategoryChange} />
              WinterWear
            </label>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div className="w-full lg:pl-[20%] md:pl-[30vw] px-5">

        {/* TOP BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />

          <select
            className="bg-slate-600 text-white px-3 py-2 rounded-md mt-3 md:mt-0"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort By Relevant</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>

        {/* LOADING / ERROR */}
        {loading && <p className="text-center mt-5 text-white">Loading...</p>}
        {error && <p className="text-center mt-5 text-red-500">{error}</p>}

        {/* PRODUCT GRID */}
        <div className="w-full mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <Card
                key={item._id}
                name={item.name}
                image={item.images?.[0]?.url}
                id={item._id}
                price={item.price}
              />
            ))
          ) : (
            <p className="text-white text-lg">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Collections;