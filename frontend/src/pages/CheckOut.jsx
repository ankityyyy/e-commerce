// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { placeOrder, getAllCartProduct } from "../redux/feature/Cart.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Checkout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { item } = useSelector((state) => state.cart);
//   const cartItems = item?.[0]?.items || [];


//  const [loading, setLoading] = useState(false);


//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",
//   });

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//     0,
//   );


//   const handlePayment = async () => {
//   if (loading) return;

//   if (!address.fullName || !address.phone || !address.street) {
//     alert("Fill address");
//     return;
//   }

//   if (cartItems.length === 0) {
//     alert("Cart is empty");
//     return;
//   }

//   setLoading(true);

//   const orderItems = cartItems.map((item) => ({
//     productId: item.productId._id,
//     quantity: item.quantity,
//   }));

//   try {
//     const { data } = await axios.post(
//       "http://localhost:2000/razorpay/v1",
//       { amount: total },
//       { withCredentials: true }
//     );

//     const order = data.order;

//     const options = {
//       key: "rzp_test_ShJcjApETAk8H8",
//       amount: order.amount,
//       currency: "INR",
//       name: "My Shop",
//       order_id: order.id,

//       handler: async function (response) {
//         const verifyRes = await axios.post(
//           "http://localhost:2000/razorpay/v1/verify",
//           response,
//           { withCredentials: true }
//         );

//         if (verifyRes.data.success) {
//           await dispatch(
//             placeOrder({
//               items: orderItems,
//               shippingAddress: address,
//               paymentInfo: {
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//               },
//             })
//           ).unwrap();

//           dispatch(getAllCartProduct());
//           alert("Order placed successfully");
//           navigate("/");
//         } else {
//           alert("Payment verification failed");
//         }

//         setLoading(false);
//       },
//     };

//     const rzp = new window.Razorpay(options);

//     rzp.on("payment.failed", function (response) {
//       console.error(response.error);
//       alert(response.error.description);
//       setLoading(false);
//     });

//     rzp.open();

//   } catch (err) {
//     console.error(err);
//     alert("Payment error");
//     setLoading(false);
//   }
// };

  
//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-20">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//           {cartItems.map((item) => (
//             <div key={item._id} className="flex gap-4 mb-4 border-b pb-3">
//               <img
//                 src={item.productId?.images?.[0]?.url}
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <div>
//                 <p>{item.productId?.title}</p>
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.productId?.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Address</h2>

//           <div className="grid gap-3">
//             <input
//               name="fullName"
//               placeholder="Full Name"
//               onChange={handleChange}
//               className="border p-2"
//             />
//             <input
//               name="phone"
//               placeholder="Phone"
//               onChange={handleChange}
//               className="border p-2"
//             />
//             <input
//               name="street"
//               placeholder="Street"
//               onChange={handleChange}
//               className="border p-2"
//             />
//             <input
//               name="city"
//               placeholder="City"
//               onChange={handleChange}
//               className="border p-2"
//             />
//             <input
//               name="state"
//               placeholder="State"
//               onChange={handleChange}
//               className="border p-2"
//             />
//             <input
//               name="pincode"
//               placeholder="Pincode"
//               onChange={handleChange}
//               className="border p-2"
//             />
//           </div>

//           <p className="mt-4 font-bold">Total: ₹ {total}</p>

//           <button
//   onClick={handlePayment}
//   disabled={loading}
//   className="w-full bg-black text-white py-3 mt-4 rounded"
// >
//   {loading ? "Processing..." : "Pay Now"}
// </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { placeOrder, getAllCartProduct } from "../redux/feature/Cart.jsx";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function Checkout() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { item } = useSelector((state) => state.cart);
//   const cartItems = item?.[0]?.items || [];

//   const [loading, setLoading] = useState(false);

//   const [address, setAddress] = useState({
//     fullName: "",
//     phone: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "India",
//     pincode: "",
//   });

//   const handleChange = (e) => {
//     setAddress({ ...address, [e.target.name]: e.target.value });
//   };

//   const total = cartItems.reduce(
//     (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
//     0
//   );

//   const handlePayment = async () => {
//     if (loading) return;

//     if (!address.fullName || !address.phone || !address.street) {
//       alert("Fill address");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("Cart is empty");
//       return;
//     }

//     setLoading(true);

//     const orderItems = cartItems.map((item) => ({
//       productId: item.productId._id,
//       quantity: item.quantity,
//     }));

//     try {
//       // ✅ STEP 1: Create DB Order (PENDING)
//       const orderRes = await dispatch(
//         placeOrder({
//           items: orderItems,
//           shippingAddress: address,
//         })
//       ).unwrap();

//       const orderId = orderRes.data._id;

//       // ✅ STEP 2: Create Razorpay Order using orderId
//       const { data } = await axios.post(
//         "http://localhost:2000/razorpay/v1",
//         { orderId },
//         { withCredentials: true }
//       );

//       const razorpayOrder = data.razorpayOrder;

//       const options = {
//         key:"rzp_test_Srann0BT3vXkkX",
//         amount: razorpayOrder.amount,
//         currency: "INR",
//         name: "My Shop",
//         order_id: razorpayOrder.id,

//         handler: async function (response) {
//           try {
//             // ✅ STEP 3: Verify Payment
//             const verifyRes = await axios.post(
//               "http://localhost:2000/razorpay/v1/verify",
//               { 
//                 ...response,
//                 orderId,
//               },
//               { withCredentials: true }
//             );

//             if (verifyRes.data.success) {
//               dispatch(getAllCartProduct());
//               alert("Payment successful & order placed");
//               navigate("/");
//             } else {
//               alert("Payment verification failed");
//             }
//           } catch (err) {
//             console.error(err);
//             console.log(err)
//             alert("Verification error");
//           }

//           setLoading(false);
//         },
//       };

//       const rzp = new window.Razorpay(options);

//       console.log(window.Razorpay);

//       rzp.on("payment.failed", function (response) {
//         console.error(response.error);
//         alert("Payment failed: " + response.error.description);
//         setLoading(false);
//       });

//       rzp.open();

//     } catch (err) {
//       console.error(err);
//       alert("Payment error");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 mt-20">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        
//         {/* Order Summary */}
//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

//           {cartItems.map((item) => (
//             <div key={item._id} className="flex gap-4 mb-4 border-b pb-3">
//               <img
//                 src={item.productId?.images?.[0]?.url}
//                 className="w-20 h-20 object-cover rounded"
//                 alt=""
//               />
//               <div>
//                 <p>{item.productId?.title}</p>
//                 <p>Qty: {item.quantity}</p>
//                 <p>₹ {item.productId?.price}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Address */}
//         <div className="bg-white p-5 rounded-2xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Address</h2>

//           <div className="grid gap-3">
//             <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2" />
//             <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
//             <input name="street" placeholder="Street" onChange={handleChange} className="border p-2" />
//             <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
//             <input name="state" placeholder="State" onChange={handleChange} className="border p-2" />
//             <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2" />
//           </div>

//           <p className="mt-4 font-bold">Total: ₹ {total}</p>

//           <button
//             onClick={handlePayment}
//             disabled={loading}
//             className="w-full bg-black text-white py-3 mt-4 rounded"
//           >
//             {loading ? "Processing..." : "Pay Now"}
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }

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

      console.log("ORDER ITEMS:", orderItems);

      // ✅ STEP 1: CREATE DB ORDER
      const orderRes = await dispatch(
        placeOrder({
          items: orderItems,
          shippingAddress: address,
        })
      ).unwrap();

      console.log("ORDER RESPONSE:", orderRes);

      const orderId = orderRes.data._id;

      console.log("MONGO ORDER ID:", orderId);

      // ✅ STEP 2: CREATE RAZORPAY ORDER
      const { data } = await axios.post(
        "http://localhost:2000/razorpay/v1",
        { orderId }
      );

      
      const razorpayOrder = data.razorpayOrder;

//       console.log("RAZORPAY ORDER:", razorpayOrder);

//       // ✅ IMPORTANT DEBUG
//       console.log("RAZORPAY ORDER ID:", razorpayOrder.id);
//       console.log("RAZORPAY AMOUNT:", razorpayOrder.amount);
//       console.log("RAZORPAY RESPONSE:", data);
//       console.log("BACKEND KEY:", data.key);
// console.log("ORDER:", razorpayOrder);
// console.log("ORDER ID:", razorpayOrder.id);
// console.log("AMOUNT:", razorpayOrder.amount);
console.log("=========.......................... FINAL DEBUG =========");

console.log("FULL BACKEND DATA:", data);

console.log("KEY:", data.key);

console.log("RAZORPAY ORDER:", razorpayOrder);

console.log("ORDER ID:", razorpayOrder?.id);

console.log("AMOUNT:", razorpayOrder?.amount);

console.log("WINDOW RAZORPAY:", window.Razorpay);


      // const options = {


      //   // ⚠️ USE SAME ACCOUNT KEY
      //   key: data.key,

      //   amount: razorpayOrder.amount,

      //   currency: "INR",

      //   name: "My Shop",

      //   description: "Test Transaction",

      //   order_id: razorpayOrder.id,

      //   handler: async function (response) {

      //     console.log("========= PAYMENT SUCCESS =========");

      //     console.log("RAZORPAY SUCCESS RESPONSE:", response);

      //     console.log("PAYMENT ID:", response.razorpay_payment_id);

      //     console.log("ORDER ID:", response.razorpay_order_id);

      //     console.log("SIGNATURE:", response.razorpay_signature);

      //     try {

      //       const verifyPayload = {
      //         ...response,
      //         orderId,
      //       };

      //       console.log("VERIFY PAYLOAD:", verifyPayload);

      //       const verifyRes = await axios.post(
      //         "http://localhost:2000/razorpay/v1/verify",
      //         verifyPayload
      //       );

      //       console.log("VERIFY RESPONSE:", verifyRes.data);

      //       if (verifyRes.data.success) {

      //         console.log("✅ PAYMENT VERIFIED");

      //         dispatch(getAllCartProduct());

      //         alert("Payment successful & order placed");

      //         navigate("/");

      //       } else {

      //         console.log("❌ VERIFY FAILED");

      //         alert("Payment verification failed");
      //       }

      //     } catch (err) {

      //       console.log("========= VERIFY ERROR =========");

      //       console.log("FULL ERROR:", err);

      //       if (err.response) {

      //         console.log("ERROR STATUS:", err.response.status);

      //         console.log("ERROR DATA:", err.response.data);
      //       }

      //       alert("Verification error");
      //     }

      //     setLoading(false);
      //   },

      //   modal: {
      //     ondismiss: function () {

      //       console.log("❌ PAYMENT POPUP CLOSED");

      //       setLoading(false);
      //     },
      //   },

      //   prefill: {
      //     name: address.fullName,
      //     contact: address.phone,
      //   },

      //   theme: {
      //     color: "#000000",
      //   },
      // };

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

    console.log("✅ PAYMENT SUCCESS");

    console.log(response);

    try {

      const verifyRes = await axios.post(
        "http://localhost:2000/razorpay/v1/verify",
        {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId,
        }
      );

      console.log("VERIFY RESPONSE:", verifyRes.data);

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
      // ✅ IMPORTANT DEBUG
      console.log("========= RAZORPAY OPTIONS =========");

      console.log("WINDOW RAZORPAY:", window.Razorpay);

      console.log("OPTIONS:", options);

      console.log("KEY:", options.key);

      console.log("ORDER ID:", options.order_id);

      console.log("AMOUNT:", options.amount);

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

        console.log("========= PAYMENT FAILED =========");

        console.log("FULL FAILED RESPONSE:", response);

        console.log("ERROR:", response.error);

        console.log("CODE:", response.error.code);

        console.log("DESCRIPTION:", response.error.description);

        console.log("SOURCE:", response.error.source);

        console.log("STEP:", response.error.step);

        console.log("REASON:", response.error.reason);

        console.log("METADATA:", response.error.metadata);

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