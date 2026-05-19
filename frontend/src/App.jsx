import React, {Suspense, useEffect, useState,lazy } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home.jsx";
// import Login from "./pages/Login.jsx";
// import SignUp from "./pages/Signup.jsx";
import NavBar from "./components/NavBar.jsx";
// import Collections from "./pages/Collections";
// import About from "./components/About.jsx";
// import Contact from "./components/Contact.jsx";
// import ProductDetails from "./pages/ProductDetails.jsx";
import Ai from "./pages/Ai.jsx";
// import Cart from "./pages/Cart.jsx";
// import Checkout from "./pages/Checkout.jsx";
// import MyOrders from "./pages/MyOrders.jsx";

import Layout from "./utils/Layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import ComponentLayout from "./utils/ComponentLayout";
 import { getUser } from "./redux/feature/User";
 import Spinner from "./components/Spinner";



 const Home = lazy(() => import("./pages/Home"));
const Collections = lazy(() => import("./pages/Collections"));
const About = lazy(() => import("./components/About.jsx"));
const Contact = lazy(() => import("./components/Contact.jsx"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MyOrders = lazy(() => import("./pages/MyOrders"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
const AISearch =lazy(()=>import("./pages/AISearch"))

function App() {
   const dispatch = useDispatch();
 

useEffect(() => {
  dispatch(getUser());
}, []); 



  // return (
  //   <>
  //   <Routes>
  //     {/* PUBLIC */}
  //     <Route element={<Layout />}>
  //       <Route path="/login" element={<Login />} />
  //       <Route path="/signup" element={<SignUp />} />
  //     </Route>

  //     {/* PROTECTED */}
  //     <Route element={<ProtectedRoute />}>
  //       <Route element={<ComponentLayout />}>
  //         <Route path="/" element={<Home />} />
  //         <Route path="/collection" element={<Collections />} />
  //         <Route path="/about" element={<About />} />
  //         <Route path="/contact" element={<Contact />} />
  //         <Route path="/cart" element={<Cart />} />
  //         <Route path="/checkout" element={<Checkout />} />
  //         <Route path="/orders" element={<MyOrders />} />
  //         <Route path="/product/:id" element={<ProductDetails />} />
  //       </Route>
  //     </Route>
  //   </Routes>
  //   <Ai/>
  //   </>
  // );

  return (
  <>
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>

        {/* PUBLIC */}
        <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* PROTECTED */}
        <Route element={<ProtectedRoute />}>
          <Route element={<ComponentLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collections />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/ai-search" element={<AISearch />} />
          </Route>
        </Route>

      </Routes>
    </Suspense>

    <Ai />
  </>
);
}

export default App;
