import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken"; // 👈 add this at top
import { register, login, logout ,getUser} from "../controller/user.js";
import validate from "../middleware/validate.js";
import { userLogin, userRegister } from "../schema/user.js";
import wrapAsync from "../utils/wrapAsync.js";
import validateTokenAndFindUser from "../middleware/loginMiddleware.js"

const router = express.Router();

/* ================= NORMAL AUTH ================= */

// Register
router.post("/register", validate(userRegister), wrapAsync(register));

// Login
router.post("/login", validate(userLogin), wrapAsync(login));

// Logout
router.post("/logout", wrapAsync(logout));

/* ================= GOOGLE AUTH ================= */

// 👉 Step 1: Redirect to Google
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 👉 Step 2: Callback

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    // 🔥 create JWT token after Google login
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🍪 send token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    // ✅ redirect to frontend
    res.redirect("http://localhost:5173");
  }
);
/* ================= CURRENT USER ================= */

// Get logged-in user
router.get("/me",validateTokenAndFindUser,wrapAsync(getUser));

export default router;