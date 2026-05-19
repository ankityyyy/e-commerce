import React from "react";
import { FaCircle } from "react-icons/fa";

function Hero({ heroData, heroCount, setHeroCount }) {
  return (
<div className="w-full h-full flex flex-col justify-center px-20 text-white">
      
      {/* TEXT */}
      <div className="max-w-[600px]">
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
          {heroData.text1}
        </h1>
        <p className="text-2xl mt-4">
          {heroData.text2}
        </p>
      </div>

      {/* DOTS */}
      <div className="flex gap-3 mt-10">
        {[0, 1, 2, 3].map((i) => (
          <FaCircle
            key={i}
            onClick={() => setHeroCount(i)}
            className={`cursor-pointer ${
              heroCount === i ? "text-orange-400" : "text-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Hero;