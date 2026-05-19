import express from "express";
import {
  createOrder,
getAllOrders,
  getSingleOrder,
  cancelOrder,
  updateOrderStatus
} from "../controller/order.js";
import isLogin  from "../middleware/loginMiddleware.js"
import roleMiddleware from "../middleware/roleMiddleware.js"

const router = express.Router();

// Create order
router.post("/",isLogin , createOrder);

// Get all orders of user
router.get("/admin",isLogin,roleMiddleware("admin", "seller"),getAllOrders);


// Get single order
router.get("/", getSingleOrder);

router.patch("/admin/:id/status", isLogin,roleMiddleware("admin", "seller"),updateOrderStatus);

// Cancel order
router.delete("/:orderId", isLogin, cancelOrder);

export default router;