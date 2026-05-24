import React,{useEffect} from "react";
import NavBar from "../components/Nav.jsx"
import Sidebar from "../components/Sidebar.jsx"
import {  useSelector, useDispatch } from "react-redux";
import { getProduct,deleteProduct } from "../redux/feature/Product.jsx";
import Title from "../components/Title.jsx";

export default function Lists(){

       const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

      const { error, loading, message,product } = useSelector((state) => state.product);

      console.log(product)

     return(
          <>
         <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-[white]'>
  <NavBar/>
  <div className='w-[100%] h-[100%] flex items-center justify-start'>
    <Sidebar/>
    <div className='w-[82%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[30px] overflow-x-hidden py-[50px] ml-[100px]'>
      {/* <Title text1={"All LISTED"} text2={"PRODUCTS"} /> */}
       <div className="inline-flex gap-2 items-center text-center mb-3 text-[35px] md:text-[40px] ">
      <p className="text-blue-100">
        {"All LISTED"} <span className="text-[#a5faf7]">{"PRODUCTS"}</span>
      </p>
    </div>

    {
  product?.length > 0 ? (
    product.map((item) => (
      <div
        className='w-[90%] md:h-[120px] h-[90px] bg-slate-600 rounded-xl flex items-center justify-between p-[10px] md:px-[30px]'
        key={item._id}
      >
        {/* LEFT SIDE */}
        <div className="flex items-center gap-[10px] md:gap-[30px]">
          
          <img
  src={item.images?.[0]?.url}
  className='w-[80px] md:w-[120px] h-[80px] md:h-[100px] rounded-lg object-contain bg-white p-1'
  alt={item.name}
/>

          <div className='flex flex-col gap-1'>
            <div className='md:text-[20px] text-[15px] text-[#bef0f3]'>
              {item.name}
            </div>

            <div className="text-sm text-[#bef0f3]">
              ₹{item.price}
            </div>

            {item.bestSeller && (
              <span className="text-sm text-[#bef0f3]   py-1 rounded w-fit">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* RIGHT SIDE BUTTON */}
        <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white text-sm" onClick={()=> dispatch(deleteProduct(item._id))}>
          Remove
        </button>
      </div>
    ))
  ) : (
    <div className="text-white text-lg">No Products available.</div>
  )
}


    </div>
  </div>
</div>

          </>
     )
}