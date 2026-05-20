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


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { placeOrder, getAllCartProduct } from "../redux/feature/Cart.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  );

  const handlePayment = async () => {
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

    try {
      // ✅ STEP 1: Create DB Order (PENDING)
      const orderRes = await dispatch(
        placeOrder({
          items: orderItems,
          shippingAddress: address,
        })
      ).unwrap();

      const orderId = orderRes.data._id;

      // ✅ STEP 2: Create Razorpay Order using orderId
      const { data } = await axios.post(
        "https://ecommerce-backend1-117w.onrender.com/razorpay/v1",
        { orderId },
        { withCredentials: true }
      );

      const razorpayOrder = data.razorpayOrder;

      const options = {
        key: "rzp_test_ShJcjApETAk8H8",
        amount: razorpayOrder.amount,
        currency: "INR",
        name: "My Shop",
        order_id: razorpayOrder.id,

        handler: async function (response) {
          try {
            // ✅ STEP 3: Verify Payment
            const verifyRes = await axios.post(
              "https://ecommerce-backend1-117w.onrender.com/razorpay/v1/verify",
              {
                ...response,
                orderId,
              },
              { withCredentials: true }
            );

            if (verifyRes.data.success) {
              dispatch(getAllCartProduct());
              alert("Payment successful & order placed");
              navigate("/");
            } else {
              alert("Payment verification failed");
            }
          } catch (err) {
            console.error(err);
            alert("Verification error");
          }

          setLoading(false);
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error(response.error);
        alert("Payment failed: " + response.error.description);
        setLoading(false);
      });

      rzp.open();

    } catch (err) {
      console.error(err);
      alert("Payment error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
        
        {/* Order Summary */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item._id} className="flex gap-4 mb-4 border-b pb-3">
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

        {/* Address */}
        <div className="bg-white p-5 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Address</h2>

          <div className="grid gap-3">
            <input name="fullName" placeholder="Full Name" onChange={handleChange} className="border p-2" />
            <input name="phone" placeholder="Phone" onChange={handleChange} className="border p-2" />
            <input name="street" placeholder="Street" onChange={handleChange} className="border p-2" />
            <input name="city" placeholder="City" onChange={handleChange} className="border p-2" />
            <input name="state" placeholder="State" onChange={handleChange} className="border p-2" />
            <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2" />
          </div>

          <p className="mt-4 font-bold">Total: ₹ {total}</p>

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