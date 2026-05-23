import User from "../models/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
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


// const validateTokenAndFindUser = wrapAsync(async (req, res, next) => {

//   // ✅ DEBUG 1
//   console.log("========= AUTH DEBUG =========");

//   // ✅ DEBUG 2
//   console.log("HEADERS:", req.headers);

//   // ✅ DEBUG 3
//   console.log("COOKIES:", req.cookies);

//   // ✅ DEBUG 4
//   const token = req.cookies.token;

//   console.log("TOKEN:", token);

//   if (!token) {
//     console.log("❌ NO TOKEN FOUND");

//     return next(
//       new ExpressError("Unauthorized - No token", StatusCodes.UNAUTHORIZED)
//     );
//   }

//   let decoded;

//   try {

//     // ✅ DEBUG 5
//     decoded = jwt.verify(token, process.env.JWT_SECRET);

//     console.log("✅ TOKEN VERIFIED:", decoded);

//   } catch (err) {

//     console.log("❌ JWT ERROR:", err.message);

//     if (err.name === "TokenExpiredError") {
//       return next(
//         new ExpressError("Token expired", StatusCodes.UNAUTHORIZED)
//       );
//     }

//     return next(
//       new ExpressError("Invalid token", StatusCodes.UNAUTHORIZED)
//     );
//   }

//   // ✅ DEBUG 6
//   const user = await User.findById(decoded.userId).select("-password");

//   console.log("USER FOUND:", user);

//   if (!user) {

//     console.log("❌ USER NOT FOUND");

//     return next(
//       new ExpressError("User not found", StatusCodes.UNAUTHORIZED)
//     );
//   }

//   req.user = user;

//   console.log("✅ AUTH SUCCESS");
//   console.log("==============================");

//   next();
// });

export default validateTokenAndFindUser;

// export default validateTokenAndFindUser;