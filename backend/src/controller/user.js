import User from "../models/user.js";
import ExpressError from "../utils/expressError.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

/* ================= REGISTER ================= */
const register = async (req, res, next) => {
  let { email, password, name } = req.body;

 
  email = email.toLowerCase().trim();

  const foundUser = await User.findOne({ email });

  if (foundUser) {
    return next(
      new ExpressError("User already exists", StatusCodes.CONFLICT)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
let role=null;
    if (email === process.env.ADMIN_EMAIL) {
    role = "admin";
  }


  const newUser = await User.create({
    email,
    name,
     role,
    password: hashedPassword,
    provider: "local",
  });

  
  return res.status(StatusCodes.CREATED).json({
    message: "User Registered",
    user: {
      id: newUser._id,
      email: newUser.email,
      name: newUser.name,
    },
  });
};

/* ================= LOGIN ================= */
const login = async (req, res, next) => {
  let { email, password } = req.body;

  email = email.toLowerCase().trim();

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return next(new ExpressError("User not exists", 404));
  }

  // 🔥 important for google users
  if (foundUser.provider === "google") {
    return next(
      new ExpressError("Please login with Google", StatusCodes.BAD_REQUEST)
    );
  }

  const isPassCorrect = await bcrypt.compare(
    password,
    foundUser.password
  );

  if (!isPassCorrect) {
    return next(new ExpressError("Invalid credentials", 401));
  }

  const token = jwt.sign(
    { userId: foundUser._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(StatusCodes.OK).json({
    message: "User login successful",
    user: {
      id: foundUser._id,
      email: foundUser.email,
      name: foundUser.name,
    },
  });
};

/* ================= LOGOUT ================= */
const logout = async (req, res, next) => {
  // 🔥 clear JWT cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });

  // 🔥 logout from passport session
  req.logout(function (err) {
    if (err) {
      return next(err);
    }

    // 🔥 destroy session completely
    req.session.destroy(() => {
      res.status(StatusCodes.OK).json({
        message: "User logout successful",
      });
    });
  });
};

const getUser=async(req,res)=>{
  let user= req.user;
  return res.status(StatusCodes.OK).json({message:"User found",user})

  }


export { register, login, logout,getUser };