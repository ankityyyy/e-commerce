import express from "express";
const router=express.Router();
import isLogin  from "../middleware/loginMiddleware.js"
import wrapAsync from '../utils/wrapAsync.js';
import {deleteCart,getCart,createCart} from "../controller/cart.js"
import rateLimiter from "../middleware/RateLimiter.js"


router.get("/",isLogin,wrapAsync(getCart))
router.post("/:id",isLogin,rateLimiter(2,60,"cart") ,wrapAsync(createCart))
router.delete("/:id",isLogin,wrapAsync( deleteCart));


export default router;

