import React, { useState, useEffect } from "react";
import Background from "../components/Background.jsx";
import Hero from "../components/Hero.jsx";
import Product from "./Product"



function Home() {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that speaks" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev + 1) % heroData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [heroData.length]);

  return (
    <>
  {/* HERO SECTION */}
  <div className="w-screen h-screen flex overflow-hidden">
    
    {/* LEFT SIDE (TEXT) */}
    <div className="w-1/2 h-full flex items-center justify-center bg-[#0c2025]">
      <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
      />
    </div>

    {/* RIGHT SIDE (IMAGES) */}
    <Background heroCount={heroCount} />
  </div>

  {/* PRODUCT SECTION */}
  <div className="w-full">
    <Product />

   
    
  </div>
</>
  );
}

export default Home;