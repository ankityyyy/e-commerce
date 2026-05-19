import Review from "../models/review.js";
import Product from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
 

// 🔹 GET REVIEWS
export const getProductReviews = async (req, res, next) => {
  const { productId } = req.params;

  const reviews = await Review
    .find({ productId, isDeleted: false })
    .populate("userId", "email");
  res.status(StatusCodes.OK).json({ data: reviews });
};


// 🔹 CREATE REVIEW
export const createReview = async (req, res, next) => {
  const { productId } = req.params;



  const product = await Product.findById(productId);
  if (!product) {
    return next(new ExpressError("Product not found", 400));
  }

console.log(productId)
  try {
    const newReview = new Review({
      userId:req.user._id ,
      productId,
      ...req.body,
    });

    await newReview.save();

    res.status(StatusCodes.CREATED).json({ data: newReview });

  } catch (err) {
    if (err.code === 11000) {
      return next(new ExpressError("You already reviewed this product", 400));
    }
    next(err);
  }
};


// 🔹 DELETE REVIEW (SOFT DELETE)
export const deleteReview = async (req, res, next) => {
  const { productId, reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review) {
    return next(new ExpressError("Review not found", 400));
  }

  if (review.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "Not authorized" });
  }

  if (review.productId.toString() !== productId) {
    return next(new ExpressError("Invalid product review", 400));
  }

  await Review.findByIdAndUpdate(reviewId, {
    isDeleted: true,
  });

  res.status(StatusCodes.OK).json({ message: "Review deleted" });
};