import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders,changeOrderStatus } from "../redux/feature/Order";
import Title from "../components/Title.jsx";



export default function OrderHistory() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

 

  if (loading) {
    return (
      <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] text-white p-6">
          <Title text1={"ADMIN"} text2={"ORDERS"} />
      {/* <h1 className="text-2xl font-semibold mb-6">Admin Orders</h1> */}

      <div className="grid gap-6">
        {orders?.map((order) => (
          <div
            key={order._id}
            className="bg-[#1c1c1c]/80 backdrop-blur-md rounded-2xl shadow-lg p-5 border border-gray-700 hover:scale-[1.01] transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-400">Order ID</p>
                <p className="text-sm font-medium break-all">
                  {order._id}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                 className={`px-3 py-1 text-xs rounded-full font-medium ${
                    order.orderStatus === "DELIVERED"
                      ? "bg-green-500/20 text-green-400"
                      : order.orderStatus === "SHIPPED"
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {order.orderStatus}
                </span>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    dispatch(
                      changeOrderStatus({
                        id: order._id,
                        status: e.target.value,
                      })
                    )
                  }
                  className="bg-[#111] border border-gray-700 px-2 py-1 rounded text-xs"
                >
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>

            {/* ITEMS */}
            <div className="grid md:grid-cols-2 gap-4 mt-4">
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

            {/* INFO */}
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-300 mt-4">
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
                  {order.shippingAddress?.city}, {order.shippingAddress?.state}
                </p>
              </div>
            </div>

            {/* TOTAL */}
            <div className="flex justify-between border-t border-gray-700 pt-3 mt-4">
              <span className="text-gray-400">Total</span>
              <span className="text-green-400 font-bold text-lg">
                ₹{order.totalAmount}
              </span>
            </div>

            {/* DATE */}
            <p className="text-xs text-gray-500 mt-2">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}