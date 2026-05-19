import React from "react";
import back1 from "../assetss/back1.png";
import back2 from "../assetss/back2.png";
import back3 from "../assetss/back3.png";
import back4 from "../assetss/back4.png";

export default function Background({ heroCount }) {
  const slides = [
    [back1, back2, back3, back4, back1, back2, back3],
    [back2, back3, back4, back1, back2, back3, back4],
    [back3, back4, back1, back2, back3, back4, back1],
    [back4, back1, back2, back3, back4, back1, back2],
  ];

  const imgs = slides[heroCount];

  return (
    <div className="w-1/2 h-full grid grid-cols-3 grid-rows-4 gap-1">

      {/* BIG */}
      <div className="col-span-2 row-span-2 overflow-hidden">
        <img src={imgs[0]} className="w-full h-full object-cover" />
      </div>

      {/* SMALL */}
      <div className="overflow-hidden">
        <img src={imgs[1]} className="w-full h-full object-cover" />
      </div>

      <div className="overflow-hidden">
        <img src={imgs[2]} className="w-full h-full object-cover" />
      </div>

      {/* WIDE */}
      <div className="col-span-2 overflow-hidden">
        <img src={imgs[3]} className="w-full h-full object-cover" />
      </div>

      {/* SMALL */}
      <div className="overflow-hidden">
        <img src={imgs[4]} className="w-full h-full object-cover" />
      </div>

      <div className="overflow-hidden">
        <img src={imgs[5]} className="w-full h-full object-cover" />
      </div>

      {/* FULL WIDTH */}
      <div className="col-span-3 overflow-hidden">
        <img src={imgs[6]} className="w-full h-full object-cover" />
      </div>

    </div>
  );
}