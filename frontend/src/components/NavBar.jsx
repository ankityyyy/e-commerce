
import React, { useState,useMemo } from "react";
import img from "../assetss/cartimage.png";

import { IoSearchCircleOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FaCircleUser } from "react-icons/fa6";

import { logoutUser } from "../redux/feature/User";
import { getProductai } from "../redux/feature/Seacrh";
import Debounce from "../utils/Debounce.jsx"

import { IoMdHome } from "react-icons/io";
import { HiOutlineCollection } from "react-icons/hi";
import { MdContacts } from "react-icons/md";

export default function NavBar() {

  const { user } = useSelector((state) => state.auth);

  const { item } = useSelector((state) => state.cart);

  const cartItems = item?.[0]?.items || [];

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [showProfile, setShowProfile] = useState(false);

  const [query, setQuery] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);

  // LOGOUT

  const handleLogout = async () => {

    await dispatch(logoutUser());

    setShowProfile(false);

    navigate("/login");
  };

  // AI SEARCH

//   const handleAISearch =useMemo( async () => {

//   try {

//     if (!query.trim()) return;

//     setSearchLoading(true);

// return Debounce ((value)=>{
//    await dispatch(getProductai(value)).unwrap();

// })
   

//     navigate("/ai-search");

//     setQuery("");

//   } catch (err) {

//     console.error(err);

//   } finally {

//     setSearchLoading(false);

//   }
// },[dispatch]);

const handleAISearch = useMemo(() => {
  return Debounce(async (value) => {
    if (!value.trim()) return;

    try {
      setSearchLoading(true);

      const result = await dispatch(
        getProductai(value)
      ).unwrap();

      
setQuery("")
      navigate("/ai-search");

    } catch (err) {
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  }, 2000);
}, [dispatch, navigate]);


  return (

    // <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">
    <div className="w-full h-[70px] bg-white z-50 fixed top-0 left-0 flex items-center justify-between px-[30px] shadow-md">

      {/* LEFT */}

      <div className="w-[20%] flex items-center justify-start gap-[10px]">

        <img
          className="w-[40px] cursor-pointer"
          src={img}
          alt="logo"
          onClick={() => navigate("/")}
        />

        <h1
          className="text-[22px] font-sans cursor-pointer"
          onClick={() => navigate("/")}
        >
          E-commerce
        </h1>

      </div>

      {/* CENTER NAV */}

      <div className="w-[30%] hidden md:flex">

        <ul className="flex items-center justify-center gap-[19px] text-[white]">

          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/")}
          >
            HOME
          </li>

          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/collection")}
          >
            COLLECTIONS
          </li>

          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl"
            onClick={() => navigate("/about")}
          >
            ABOUT
          </li>

          <li
            className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl  cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            CONTACT
          </li>

        </ul>

      </div>

      {/* RIGHT */}

      <div className="w-[50%] flex items-center justify-end gap-[15px]">

        {/* SEARCH BAR */}

        <div className="hidden md:flex items-center gap-[10px]">

          <input
            type="text"
            value={query}
            onChange={(e) => {setQuery(e.target.value),
               handleAISearch(e.target.value)
              }}
             
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAISearch();
              }
            }}
            placeholder="Search products with AI..."
            className="w-[260px] h-[45px] border border-gray-400 rounded-xl px-[15px] outline-none"
          />

          <button
  onClick={handleAISearch}
  disabled={searchLoading}
  className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-white disabled:opacity-50"
>
  {searchLoading ? "Searching..." : "Search"}
</button>

        </div>

        {/* MOBILE SEARCH */}

        <IoSearchCircleOutline
          className="w-[38px] h-[38px] text-[#000000] cursor-pointer md:hidden"
          onClick={() => navigate("/ai-search")}
        />

        {/* USER */}

        {!user && (

          <FaCircleUser
            className="w-[29px] h-[29px] text-[#000000] cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          />

        )}

        {user && (

          <div
            className="w-[30px] h-[30px] bg-[#808080] text-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => setShowProfile((prev) => !prev)}
          >
            {user?.name?.slice(0, 1)}
          </div>

        )}

        {/* CART */}

        <div
          className="relative hidden md:block"
          onClick={() => navigate("/cart")}
        >

          <MdOutlineShoppingCart className="w-[30px] h-[30px] text-[#000000] cursor-pointer" />

          <p className="absolute w-[18px] h-[18px] flex items-center justify-center bg-black px-[5px] py-[2px] text-white rounded-full text-[9px] top-[-5px] right-[-10px]">
            {cartItems.length}
          </p>

        </div>

      </div>

      {/* PROFILE */}

      {showProfile && (

        <div className="absolute w-[220px] h-[150px] bg-[#000000d7] top-[110%] right-[4%] border-[1px] border-[#aaa9a9] rounded-[10px] z-10">

          <ul className="w-full h-full flex flex-col justify-around text-[17px] py-[10px] text-white">

            {!user && (

              <li
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                onClick={() => {
                  navigate("/login");
                  setShowProfile(false);
                }}
              >
                Login
              </li>

            )}

            {user && (

              <li
                className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>

            )}

            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"  onClick={() => navigate("/orders")}>
              Orders
            </li>

            <li className="w-full hover:bg-[#2f2f2f] px-[15px] py-[10px] cursor-pointer"  onClick={() => navigate("/about")}>
              About
            </li>

          </ul>

        </div>

      )}

      {/* MOBILE NAV */}

      <div className="w-[100vw] h-[90px] flex items-center justify-between px-[20px] text-[12px] fixed bottom-0 left-0 bg-[#191818] md:hidden">

        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/")}
        >
          <IoMdHome className="w-[25px] h-[25px] text-white" />
          Home
        </button>

        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/collection")}
        >
          <HiOutlineCollection className="w-[25px] h-[25px] text-white" />
          Collections
        </button>

        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/contact")}
        >
          <MdContacts className="w-[25px] h-[25px] text-white" />
          Contact
        </button>

        <button
          className="text-white flex items-center justify-center flex-col gap-[2px]"
          onClick={() => navigate("/cart")}
        >
          <MdOutlineShoppingCart className="w-[25px] h-[25px] text-white" />
          Cart
        </button>

      </div>

    </div>
  );
}