import Title from "../components/Title.jsx";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllCartProduct,
  placeOrder,
  deleteProductFromCart,
} from "../redux/feature/Cart";
import { useNavigate } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Fetch cart
  useEffect(() => {
    dispatch(getAllCartProduct());
  }, [dispatch]);

  const { item } = useSelector((state) => state.cart);

  // backend returns array → take first cart
  const cartItems = item?.[0]?.items || [];

  

  // ✅ REMOVE ITEM
  const handleRemove = (id) => {
    dispatch(deleteProductFromCart(id))
      .unwrap()
      .then(() => {
        dispatch(getAllCartProduct()); // refresh cart
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-6 mt-30">
      <div className="max-w-[1200px] mx-auto flex gap-6">

        {/* LEFT */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
           {/* <Title text1={"SHOPPING"} text2={"CART"} /> */}
          

          {cartItems.length === 0 ? (
            <div className="bg-white p-4 rounded shadow">
              Your cart is empty
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded shadow mb-4 p-4 flex justify-between"
              >
                <div className="flex gap-4">

                  {/* IMAGE */}
                  <img
                    src={item.productId?.images?.[0]?.url || "https://via.placeholder.com/100"}
                    alt="product"
                    className="w-20 h-20 object-cover rounded"
                  />

                  {/* DETAILS */}
                  <div>
                    <p className="font-semibold text-lg">
                      {item.productId?.title}
                    </p>

                    <p className="text-gray-600">
                      Quantity: <b>{item.quantity}</b>
                    </p>

                    <p className="text-green-600 font-semibold">
                      ₹ {item.productId?.price}
                    </p>
                  </div>
                </div>

                {/* REMOVE BUTTON */}
                <button
                  onClick={() => handleRemove(item.productId?._id)}
                  className="text-red-500 font-semibold"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="w-[300px]">
          <div className="bg-white rounded shadow p-4">
            <h5 className="font-semibold mb-3">Price Details</h5>

            <p>Total Items: {cartItems.length}</p>

            <p className="font-bold text-lg mt-2">
              Total: ₹
              {cartItems.reduce(
                (sum, item) =>
                  sum +
                  (item.productId?.price || 0) * (item.quantity || 0),
                0
              )}
            </p>

            <button
              
               onClick={() => navigate("/checkout")}
              className="w-full mt-4 bg-green-600 text-white py-2 rounded"
            >
              Place Order
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Cart;

