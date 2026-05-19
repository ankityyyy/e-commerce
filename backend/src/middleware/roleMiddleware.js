import User from "../models/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import ExpressError from "../utils/ExpressError.js";
import { StatusCodes } from "http-status-codes";


const roleMiddleware = (...role) => (req, res, next) => {
     if (!req.user) {
          return next(new ExpressError("user is  not coming", StatusCodes.UNAUTHORIZED))
     }

     if (!role.includes(req.user.role)) {
          return next(new ExpressError("role is not correct", StatusCodes.FORBIDDEN))
     }

     next()

}

export default roleMiddleware


