 import React, { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlaceOrder} from "../redux/feature/Cart.jsx";




export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllPlaceOrder());
  }, [dispatch]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen bg-[#0c2025] text-white">
        <h2 className="text-xl font-semibold">Loading orders...</h2>
      </div>
    );

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white p-6 mt-20 grid gap-6">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-[#1c1c1c]/80 backdrop-blur-md rounded-2xl shadow-lg p-5 space-y-4 border border-gray-700"
        >
          {/* Top */}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-400">Order ID</p>
              <p className="font-semibold text-sm break-all">
                {order._id}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Status:</span>
              <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-400 font-medium">
                {order.orderStatus}
              </span>
            </div>
          </div>

          {/* Items */}
          <div className="grid md:grid-cols-2 gap-4">
            {order.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-center bg-[#111]/60 border border-gray-700 rounded-xl p-3"
              >
                <img
                  src={item.image?.url}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-400">
                    Qty: {item.quantity}
                  </p>
                  <p className="font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300">
            <div>
              <p className="text-gray-400">Payment</p>
              <p>
                {order.paymentMethod} ({order.paymentStatus})
              </p>
            </div>
            <div>
              <p className="text-gray-400">Shipping</p>
              <p>₹{order.shippingCharge}</p>
            </div>
            <div>
              <p className="text-gray-400">Address</p>
              <p>
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.state}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-between border-t border-gray-700 pt-3">
            <span className="text-gray-400">Total Amount</span>
            <span className="font-bold text-lg text-green-400">
              ₹{order.totalAmount}
            </span>
          </div>

          {/* Date */}
          <p className="text-xs text-gray-500">
            Ordered on: {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}