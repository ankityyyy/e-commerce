import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "./src/models/user.js";
import userRoute from "./src/routes/user.js";
import productRoute from "./src/routes/product.js";
import orderRoute from "./src/routes/order.js";
import reviewRoute from "./src/routes/reviews.js";
import ExpressError from "./src/utils/expressError.js";
import { StatusCodes } from "http-status-codes";
import  cartRoute from "./src/routes/cart.js";
import razorpayRoute from "./src/routes/payment.js"
 import aiRoutes from "./src/routes/ai.routes.js";
 import {VectorStore} from "./src/services/vectoeStore.js"



 dotenv.config();
const dbUrl = process.env.ATLASDB_URL;   

export const app = express();

/* ================= DB ================= */
async function Main() {
  try {
    await mongoose.connect(dbUrl);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
}
Main();
 
/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
    methods: ["GET", "POST", "PUT","PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);



/* ================= SESSION ================= */
app.use(
  session({
    secret: "secretkey", // use env in production
    resave: false,
    saveUninitialized: false,
  })
);

/* ================= PASSPORT INIT ================= */
app.use(passport.initialize());
app.use(passport.session());

/* ================= PASSPORT GOOGLE STRATEGY ================= */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ providerId: profile.id });

        if (!user) {
          user = await User.create({
            email: profile.emails[0].value,
            provider: "google",
            providerId: profile.id,
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

/* ================= SERIALIZE ================= */
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

const startDb=new VectorStore();
// await startDb.deleteCollection();

 await startDb.createCollection()
app.get("/me", (req, res) => {
 
  res.json("i am working");
});



/* ================= OTHER ROUTES ================= */
app.use("/user/v1", userRoute);
app.use("/product/v1", productRoute);
app.use("/review/v1",reviewRoute) 
app.use("/cart/v1",cartRoute) 
app.use("/order/v1",orderRoute) 
app.use("/razorpay/v1",razorpayRoute) 
 app.use("/api/v1/ai", aiRoutes);


/* ================= ERROR ================= */
app.use((req, res, next) => {
  console.log("REQUEST:", req.method, req.url);
  next(new ExpressError("Page not found", StatusCodes.NOT_FOUND));
});

app.use((err, req, res, next) => {
  console.log("ERROR:", err);
  res.status(err.statusCode || 500).json({
    message: err.message || "Something went wrong",
  });
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 2000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
