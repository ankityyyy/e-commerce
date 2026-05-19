import User from "../models/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/expressError.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const validateTokenAndFindUser = wrapAsync(async (req, res, next) => {
  const token = req.cookies.token;
  


  if (!token) {
    return next(
      new ExpressError("Unauthorized - No token", StatusCodes.UNAUTHORIZED)
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return next(
        new ExpressError("Token expired", StatusCodes.UNAUTHORIZED)
      );
    }
    return next(
      new ExpressError("Invalid token", StatusCodes.UNAUTHORIZED)
    );
  }


  const user = await User.findById(decoded.userId).select("-password");

  if (!user) {
    return next(
      new ExpressError("User not found", StatusCodes.UNAUTHORIZED)
    );
  }


  req.user = user;

  next();
});

export default validateTokenAndFindUser;