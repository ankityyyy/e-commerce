import React, { useEffect } from "react";
import Title from "./Title.jsx";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card.jsx";
import { getProduct } from "../redux/feature/Product.jsx";

export default function BestSeller() {
  const { products = [], loading, error } = useSelector(
    (state) => state.product
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

 

  const bestSeller = products.filter((item) => item.bestSeller === true);

  return (
    <div>
      <div className="text-center md:mt-[50px]">
        {/* <p className="text-blue-100 text-[20px]">BEST SELLER</p> */}
         <Title text1={"BEST"} text2={"SELLER"} />
      </div>

      {loading && <p className="text-center mt-5">Loading...</p>}
      {error && <p className="text-center mt-5 text-red-500">{error}</p>}

      {bestSeller.length === 0 && !loading && (
        <p className="text-center text-white mt-5">
          No Best Seller Products Found
        </p>
      )}

      <div className="mt-[30px] flex flex-wrap gap-[50px] justify-center">
        {bestSeller.map((item) => (
          <Card
            key={item._id}
            name={item.name}
            image={item.images?.[0]?.url}
            id={item._id}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}