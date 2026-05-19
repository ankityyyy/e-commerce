import express from "express";
const router=express.Router();
import isLogin  from "../middleware/loginMiddleware.js"
import wrapAsync from '../utils/wrapAsync.js';
import  reviewJoiSchema from "../schema/reviewSchema.js"
import validate from "../middleware/validate.js"

import { createReview,getProductReviews,deleteReview } from '../controller/review.js';


 router.post("/:productId",isLogin,validate(reviewJoiSchema),wrapAsync(createReview))

router.get("/:productId",isLogin,wrapAsync(getProductReviews))
router.delete("/:reviewId",isLogin,wrapAsync(deleteReview))

export default router; 


