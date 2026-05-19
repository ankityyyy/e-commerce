import express from "express";
import { createRazorpayOrder,verifyPayment } from "../controller/payment.js";
import wrapAsync from '../utils/wrapAsync.js';
import isLogin  from "../middleware/loginMiddleware.js"

const router = express.Router();

router.post("/", isLogin, wrapAsync(createRazorpayOrder));
router.post("/verify", isLogin, wrapAsync(verifyPayment));

export default router;