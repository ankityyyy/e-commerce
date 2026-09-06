

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, getAllCartProduct } from "../redux/feature/Cart.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export default function Checkout() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { item } = useSelector((state) => state.cart);

  const cartItems = item?.[0]?.items || [];

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    country: "India",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const total = cartItems.reduce(
    (sum, item) =>
      sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handlePayment = async () => {

    try {

      console.log("========= PAYMENT START =========");

      if (loading) return;

      if (!address.fullName || !address.phone || !address.street) {
        alert("Fill address");
        return;
      }

      if (cartItems.length === 0) {
        alert("Cart is empty");
        return;
      }

      setLoading(true);

      const orderItems = cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      }));


      // ✅ STEP 1: CREATE DB ORDER
      const orderRes = await dispatch(
        placeOrder({
          items: orderItems,
          shippingAddress: address,
        })
      ).unwrap();

    

      const orderId = orderRes.data._id;

      

      // ✅ STEP 2: CREATE RAZORPAY ORDER
      const { data } = await axios.post(
        "https://e-commerce-2p81.onrender.com/razorpay/v1",
        { orderId }
      );

      
      const razorpayOrder = data.razorpayOrder;




      
      

      const options = {

  // ✅ key from backend
  key: data.key,

  // ✅ amount from backend Razorpay order
  amount: razorpayOrder.amount,

  currency: "INR",

  name: "My Shop",

  description: "Order Payment",

  image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",

  order_id: razorpayOrder.id,

  handler: async function (response) {

    try {

      const verifyRes = await axios.post(
        "https://e-commerce-2p81.onrender.com/razorpay/v1/verify",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        }
      );

    

      if (verifyRes.data.success) {

        alert("Payment Successful");

        dispatch(getAllCartProduct());

        navigate("/");

      } else {

        alert("Payment Verification Failed");
      }

    } catch (err) {

      console.log("VERIFY ERROR:", err);

      alert("Verification Error");
    }

    setLoading(false);
  },

  modal: {
    ondismiss: function () {

      console.log("❌ PAYMENT CLOSED");

      setLoading(false);
    },
  },

  prefill: {
    name: address.fullName,
    contact: address.phone,
  },

  notes: {
    address: address.street,
  },

  theme: {
    color: "#000000",
  },
};
     
      // ✅ CHECK IF SCRIPT LOADED
      if (!window.Razorpay) {

        console.log("❌ RAZORPAY SDK NOT LOADED");

        alert("Razorpay SDK failed to load");

        setLoading(false);

        return;
      }

      const rzp = new window.Razorpay(options);

      // ✅ PAYMENT FAILED DEBUG
      rzp.on("payment.failed", function (response) {

    
        alert("Payment failed: " + response.error.description);

        setLoading(false);
      });

      console.log("🚀 OPENING RAZORPAY");

      rzp.open();

    } catch (err) {

      console.log("========= MAIN PAYMENT ERROR =========");

      console.log("FULL ERROR:", err);

      if (err.response) {

        console.log("STATUS:", err.response.status);

        console.log("DATA:", err.response.data);
      }

      alert("Payment error");

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

        {/* ORDER SUMMARY */}
        <div className="bg-white p-5 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Order Summary
          </h2>

          {cartItems.map((item) => (

            <div
              key={item._id}
              className="flex gap-4 mb-4 border-b pb-3"
            >

              <img
                src={item.productId?.images?.[0]?.url}
                className="w-20 h-20 object-cover rounded"
                alt=""
              />

              <div>
                <p>{item.productId?.title}</p>

                <p>Qty: {item.quantity}</p>

                <p>₹ {item.productId?.price}</p>
              </div>

            </div>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="bg-white p-5 rounded-2xl shadow">

          <h2 className="text-xl font-semibold mb-4">
            Address
          </h2>

          <div className="grid gap-3">

            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              className="border p-2"
            />

            <input
              name="phone"
              placeholder="Phone"
              onChange={handleChange}
              className="border p-2"
            />

            <input
              name="street"
              placeholder="Street"
              onChange={handleChange}
              className="border p-2"
            />

            <input
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="border p-2"
            />

            <input
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="border p-2"
            />

            <input
              name="pincode"
              placeholder="Pincode"
              onChange={handleChange}
              className="border p-2"
            />

          </div>

          <p className="mt-4 font-bold">
            Total: ₹ {total}
          </p>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-black text-white py-3 mt-4 rounded"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>

        </div>
      </div>
    </div>
  );
}