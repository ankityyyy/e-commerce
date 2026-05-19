import React, { useState ,useEffect} from 'react'
import { useDispatch,useSelector } from "react-redux";
import './App.css'
import { Routes, Route } from "react-router-dom"; 
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import  OrderHistory from "./pages/Order.jsx"
import Add from "./pages/Add.jsx"
import Lists from "./pages/Lists.jsx"
import SignUp from "./pages/SignUp.jsx"
import { getUser } from "./redux/feature/User";
import Layout from "./utils/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import ComponentLayout from "./utils/ComponentLayout";


function App() {
const dispatch = useDispatch();
 

useEffect(() => {
  dispatch(getUser());
}, []);

  return (
    <>
    <Routes>

  
            {/* PUBLIC */}
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              
              
            </Route>

             <Route element={<ProtectedRoute />}>
                    <Route element={<ComponentLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={< OrderHistory />} />
        <Route path="/Add" element={<Add />} />
        <Route path="/Lists" element={<Lists />} />
             
               </Route>
               </Route>
    </Routes>
        
    </>
  )
}

export default App
