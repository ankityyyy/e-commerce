import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import OurPolicy from "../components/OurPolicy.jsx";
import Footer from "../components/Footer.jsx";


export default function ComponentLayout() {
  return (
    <>
   <NavBar/>
   <Outlet/>
    <OurPolicy/>
         <Footer/>
    
    </>
  )
}


