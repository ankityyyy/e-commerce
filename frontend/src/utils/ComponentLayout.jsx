import { Outlet } from "react-router-dom";
import React, {lazy } from "react";
import NavBar from "../components/NavBar.jsx";
import OurPolicy from "../components/OurPolicy.jsx";
import Footer from "../components/Footer.jsx"

import Ai from "../pages/Ai.jsx";


export default function ComponentLayout() {
  return (
    <>
   <NavBar/>
   <Outlet/>
      <Ai />
    <OurPolicy/>
         <Footer/>
    
    </>
  )
}


