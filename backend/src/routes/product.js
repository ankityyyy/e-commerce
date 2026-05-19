import express from "express";
import validate from "../middleware/validate.js"
import {productSchema,updateProductSchema } from "../schema/product.js"
import wrapAsync from "../utils/wrapAsync.js";
import {getAllProduct,getProductByName,createProduct,updateProduct,deleteProduct,getProductById} from "../controller/product.js"
import isLogin  from "../middleware/loginMiddleware.js"
import multer from "multer";
import {storage} from "../cloudConfig.js";
const upload = multer({ storage});
import isOwner from "../middleware/productMill.js"
import roleMiddleware from "../middleware/roleMiddleware.js"
import rateLimiter from "../middleware/RateLimiter.js"

const router = express.Router();

router.get("/", wrapAsync(getAllProduct));

router.get("/search", wrapAsync(getProductByName));

router.get("/:id",isLogin,  rateLimiter(5, 60, "product"),wrapAsync(getProductById));


router.post(
  "/",
  isLogin,
  roleMiddleware("admin", "seller"),
   validate(productSchema),
  upload.single("image"),
 
  wrapAsync(createProduct)
);


router.put(
  "/:id",
  isLogin,
  roleMiddleware("admin", "seller"),
  isOwner,
  upload.single("image"),
  validate(updateProductSchema),
  wrapAsync(updateProduct)
);


router.delete(
  "/:id",
  isLogin,
  roleMiddleware("admin", "seller"),
  isOwner,
  wrapAsync(deleteProduct)
);

export default router;

