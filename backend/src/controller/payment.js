import Razorpay from "razorpay";
import crypto from "crypto";
import Product from "../models/Product.js";
import  Cart  from "../models/cart.js";
import Payment from "../models/payment.js";
import Order from "../models/order.js";
import dotenv from "dotenv";
import User from "../models/user.js";
import { sendOrderEmail } from "./sendEmail.js";

dotenv.config();
  

const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_KEY_SECRET,
});



export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

 

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


    try {

  const user = await User.findById(order.userId);

  console.log("USER EMAIL:", user.email);

  await sendOrderEmail(user.email, order);

  console.log("✅ ORDER EMAIL SENT");

} catch (err) {

  console.log("❌ EMAIL SEND ERROR");

  console.log(err);
}

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
  amount:Number(order.totalAmount) * 100,
  currency:"INR",
  receipt:order._id.toString(),
};
  const razorpayOrder = await razorpay.orders.create(options);
    
res.json({
  success: true,
  razorpayOrder,
  key: process.env.RAZORPAY_KEY_ID,
});

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Razorpay order failed",
    });
  }
};


