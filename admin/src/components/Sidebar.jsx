import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { SiTicktick } from "react-icons/si";
import { useNavigate } from "react-router-dom";




export default function Sidebar(){

   const navigate = useNavigate();
     return(
          <div 
  className="w-[18%] min-h-[100vh] border-r-[1px] py-[60px] fixed left-0 top-0"
>
  <div className="flex flex-col gap-4 pt-[40px] pl-[20%] text-[15px]">
    
    <div 
      className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
     onClick={() => navigate("/Add")}>
      <IoMdAddCircle className="w-[20px] h-[20px]" />
      <p className="hidden md:block">Add items</p>
    </div>

    <div 
      className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
         onClick={() => navigate("/Lists")}
    >
      <CiCircleList  className="w-[20px] h-[20px]" />
      <p className="hidden md:block">List</p>
    </div>

    <div 
      className="flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
      onClick={() => navigate("/Order")}
    >
      <SiTicktick  className="w-[20px] h-[20px]" />
      <p className="hidden md:block">Order</p>
    </div>

  </div>
</div>
     )
}