import express from "express";
import {getReviewSummary} from "../controller/ai/ai.controller.js";
import {storeDataInVd,query} from "../controller/ai/productsearch.js";
import isLogin  from "../middleware/loginMiddleware.js"
import wrapAsync from '../utils/wrapAsync.js';
import {adminDashboard} from "../controller/admin.js"

const router = express.Router();

router.get("/review-summary/:productId",wrapAsync(getReviewSummary)
);

router.get("/",wrapAsync(storeDataInVd)
);

router.post("/query",isLogin,wrapAsync(query))
router.get("/admin/dashboard",wrapAsync(adminDashboard))

export default router;