import Razorpay from "razorpay";
import crypto from "crypto";
import Product from "../models/product.js";
import  Cart  from "../models/cart.js";
import Payment from "../models/payment.js";
import Order from "../models/order.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});



//  export const verifyPayment = (req, res) => {
// //   const {
// //     razorpay_order_id,
// //     razorpay_payment_id,
// //     razorpay_signature,
// //   } = req.body;

// //   const body = razorpay_order_id + "|" + razorpay_payment_id;

// //   const expected = crypto
// //     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
// //     .update(body)
// //     .digest("hex");

// //   if (expected === razorpay_signature) {
// //     res.json({ success: true });
// //   } else {
// //     res.status(400).json({ success: false });
// //   }
//  };




// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId, // 🔥 optional from frontend
//       userId,
//       amount
//     } = req.body;

//     console.log(req.body)
//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expected = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false });
//     }

//     // ✅ SAVE PAYMENT (only if data available)
//     if (orderId && userId) {
//       await Payment.create({
//         userId,
//         orderId,
//         amount,
//         status: "SUCCESS",
//         paymentMethod: "UPI",
//         transactionId: razorpay_payment_id,
//       });

//       await Order.findByIdAndUpdate(orderId, {
//         paymentStatus: "PAID",
//         orderStatus: "CONFIRMED",
//         transactionId: razorpay_payment_id,
//       });
//     }

//     return res.json({ success: true });

//   } catch (err) {
//     console.error("VERIFY ERROR:", err);
//     return res.status(500).json({ success: false });
//   }
// };


export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    console.log("VERIFY BODY:", req.body);

    // ✅ Step 1: verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected !== razorpay_signature) {
      // ❌ mark failed
      await Order.findByIdAndUpdate(orderId, {
        paymentStatus: "FAILED",
      });

      return res.status(400).json({ success: false });
    }

    // ✅ Step 2: get order from DB (IMPORTANT)
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false });
    }

    // ✅ Step 3: save payment (NO frontend trust)
    await Payment.create({
      userId: order.userId,
      orderId: order._id,
      amount: order.totalAmount,
      status: "SUCCESS",
      paymentMethod: "RAZORPAY",
      transactionId: razorpay_payment_id,
    });

    // ✅ Step 4: update order
    order.paymentStatus = "PAID";
    order.orderStatus = "CONFIRMED";
    order.transactionId = razorpay_payment_id;

    await order.save();

    // ✅ Step 5: update stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    // ✅ Step 6: clear cart
    await Cart.findOneAndUpdate(
      { userId: order.userId },
      { $set: { items: [], totalPrice: 0 } }
    );

    res.json({ success: true });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    res.status(500).json({ success: false });
  }
};

export const createRazorpayOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const options = {
      amount: order.totalAmount * 100, // ✅ from DB
      currency: "INR",
      receipt: order._id.toString(), // ✅ link Razorpay ↔ Mongo
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.json({
      success: true,
      razorpayOrder,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Razorpay order failed",
    });
  }
};


// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { amount } = req.body; // amount in rupees

//     const options = {
//       amount: amount * 100, // Razorpay works in paisa
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       order,
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Razorpay order failed",
//     });
//   }
// };






// import Razorpay from "razorpay";
// import crypto from "crypto";
// import Order from "../models/order.js";
// import Payment from "../models/payment.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });


// // ✅ 1. CREATE RAZORPAY ORDER
// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body; // 🔥 Mongo Order ID

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ success: false, message: "Order not found" });
//     }

//     const options = {
//       amount: order.totalAmount * 100,
//       currency: "INR",
//       receipt: order._id.toString(), // link
//     };

//     const razorpayOrder = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       razorpayOrder,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// };



// // ✅ 2. VERIFY PAYMENT + SAVE
// export const verifyPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId, // Mongo Order ID
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expected = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expected !== razorpay_signature) {
//       return res.status(400).json({ success: false });
//     }

//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ success: false });
//     }

//     // ✅ Save payment
//     await Payment.create({
//       userId: order.userId,
//       orderId: order._id,
//       amount: order.totalAmount,
//       status: "SUCCESS",
//       paymentMethod: "UPI", // can improve later
//       transactionId: razorpay_payment_id,
//     });

//     // ✅ Update order
//     order.paymentStatus = "PAID";
//     order.orderStatus = "CONFIRMED";
//     order.transactionId = razorpay_payment_id;

//     await order.save();

//     res.json({ success: true });

//   } catch (err) {
//     console.error("VERIFY ERROR:", err);
//     res.status(500).json({ success: false });
//   }
// };