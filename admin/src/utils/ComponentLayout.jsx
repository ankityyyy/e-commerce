import { Outlet } from "react-router-dom";
import NavBar from "../components/Nav.jsx";


export default function ComponentLayout() {
  return (
    <>
   <NavBar/>
   <Outlet/>
    
    
    </>
  )
}


