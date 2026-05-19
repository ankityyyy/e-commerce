import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {logoutUser} from "../redux/feature/User"
import { useSelector, useDispatch } from "react-redux";

export default function NavBar() {

     const navigate = useNavigate();
     const dispatch=useDispatch();


     const handleLogout = async () => {
         await dispatch(logoutUser());
      
         navigate("/login");
       };

     return(
//           <>
          

//             <div className="w-[100vw] h-[70px] bg-[#ecfafaec] z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black "> 

//                <div className="w-[30%] flex items-center justify-start gap-[10px] ">
                     
//                       <h1 className="text-[22px] font-sans">E-commerce</h1>
//                     </div>
  

//   <button className='text-[15px] hover:border-[2px] border-[#89daea] cursor-pointer bg-[#000000ca] py-[10px] px-[20px] rounded-2xl text-white'  onClick={handleLogout}>
//     LogOut
//   </button>
// </div>

//           </>

<>
  <div className="w-[100vw] h-[70px] bg-[#ecfafaec] backdrop-blur-md z-10 fixed top-0 flex items-center justify-between px-[30px] shadow-md shadow-black">

    <div className="w-[30%] flex items-center justify-start gap-[10px]">
      <h1 className="text-[22px] font-sans text-black">
        E-commerce
      </h1>
    </div>

    <button
      className="text-[15px] hover:bg-slate-500 cursor-pointer bg-[#000000c9] py-[10px] px-[20px] rounded-2xl text-white transition-all duration-200"
      onClick={handleLogout}
    >
      LogOut
    </button>

  </div>
</>

     )
}