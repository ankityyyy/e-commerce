import Order from "../models/order.js";
import Product from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import wrapAsync from "../utils/wrapAsync.js";
import  Cart  from "../models/cart.js";
import {sendOrderEmail} from "./sendEmail.js"

export const createOrder = wrapAsync(async (req, res) => {
  const { items, shippingAddress } = req.body;

  if (!items || items.length === 0) {
    throw new ExpressError("Order items cannot be empty", 400);
  }

  const detailedItems = await Promise.all(
    items.map(async (item) => {
      const product = await Product.findById(item.productId);

      if (!product) {
        throw new ExpressError("Product not found", 404);
      }

      return {
        productId: product._id,
        title: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images?.[0] || {},
      };
    })
  );

  const subtotal = detailedItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const totalAmount = subtotal;

  // ✅ ONLY create order (no payment yet)
  const order = await Order.create({
    userId: req.user._id,
    items: detailedItems,
    shippingAddress,
    subtotal,
    tax: 0,
    shippingCharge: 0,
    totalAmount,

    paymentStatus: "PENDING",   // ✅ FIX
    paymentMethod: "RAZORPAY",
    orderStatus: "PENDING",     // ✅ FIX
  });

  res.status(201).json({
    success: true,
    message: "Order created",
    data: order,
  });
});

// ✅ GET SINGLE ORDER
export const getSingleOrder = wrapAsync(async (req, res) => {
  

  const order = await Order.find({});

 

 return res.status(StatusCodes.OK).json({ order,message:"featch all order"});
});

export const getAllOrders = wrapAsync(async (req, res) => {
  

  const orde = await Order.find({})
    .populate("userId", "name email")
    .sort({ createdAt: -1 });

  return res.status(StatusCodes.OK).json({
    orde,
    message: "Fetched all orders",
  });
});

export const updateOrderStatus = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const order = await Order.findById(id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  order.orderStatus = status;
  await order.save();

  

  return res.status(200).json({
    message: "Order status updated",
    order,
  });
});

// ✅ CANCEL ORDER
export const cancelOrder = wrapAsync(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findById(orderId);

  if (!order) {
    throw new ExpressError("Order not found", 404);
  }

  // ❗ security check
  if (order.userId.toString() !== req.user._id.toString()) {
    throw new ExpressError("Not authorized", 403);
  }

  if (order.orderStatus === "DELIVERED") {
    throw new ExpressError("Delivered order cannot be cancelled", 400);
  }

  order.orderStatus = "CANCELLED";
  await order.save();

  res.status(200).json({
    success: true,
    message: "Order cancelled successfully",
  });
});