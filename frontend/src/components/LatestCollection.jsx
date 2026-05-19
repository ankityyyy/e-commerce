import React, { useEffect } from "react";
import Title from "./Title.jsx";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card.jsx";
import { getProduct } from "../redux/feature/Product.jsx";

export default function LatestCollection() {
  const { products, loading } = useSelector((state) => state.product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  const latestProducts = [...(products || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  return (
    <div>
      <div className="text-center md:mt-[50px]">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />

        <p className="text-blue-100">
          Step Into Style ✨ New Collection Dropping This Season!
        </p>
      </div>

      <div className="mt-[30px] flex flex-wrap gap-[50px] justify-center">
        {latestProducts.map((item) => (
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