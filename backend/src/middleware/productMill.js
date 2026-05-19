import Product from "../models/product.js";
import ExpressError from "../utils/ExpressError.js";
import {StatusCodes} from "http-status-codes"
import wrapAsync from "../utils/wrapAsync.js";

const isOwner = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ExpressError("Product id is required", StatusCodes.BAD_REQUEST));
  }

  const product = await Product.findById(id);

  if (!product) {
    return next(new ExpressError("Product not found", StatusCodes.NOT_FOUND));
  }

  // ✅ Role check (correct way)
  if (req.user.role === "seller" || req.user.role === "admin") {
    
    // ✅ Ownership check
    if (product.userId.toString() !== req.user._id.toString()) {
      return next(
        new ExpressError(
          "You are not authorized to update this product",
          StatusCodes.FORBIDDEN
        )
      );
    }

  } else {
    return next(
      new ExpressError(
        "Only seller or admin can perform this action",
        StatusCodes.FORBIDDEN
      )
    );
  }

  req.product = product;
  next();
});

export default isOwner;