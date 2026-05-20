import  Cart  from "../models/cart.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import  Product  from "../models/Product.js";

export const getCart=async(req,res)=>{
 


     const cartItem= await Cart.find({ userId:req.user._id }).populate("items.productId","title stock price images")

     

     return res.status(StatusCodes.OK).json({ message:"all cart product add by user", item:cartItem });

}

// export const getCart = async (req, res) => {
//   const cartKey = `cart:${req.user._id}`;

//   const cartItems = await redisClient.hGetAll(cartKey);

//   let result = [];

//   for (let productId in cartItems) {
//     const product = await Product.findById(productId);

//     if (product) {
//       result.push({
//         product,
//         quantity: Number(cartItems[productId])
//       });
//     }
//   }

//   res.status(200).json({
//     message: "Cart fetched (Redis)",
//     item: result
//   });
// };


export const createCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    // ✅ validate quantity
    if (quantity === undefined) {
      return next(new ExpressError("Quantity is missing", 400));
    }

    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      return next(new ExpressError("Invalid quantity", 400));
    }

    // ✅ get product
    const product = await Product.findById(id);
    if (!product) {
      return next(new ExpressError("Product not found", 400));
    }

    if (!product.price) {
      return next(new ExpressError("Product price missing", 400));
    }

    // ✅ find cart
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [
          {
            productId: id,
            quantity: qty,
            price: Number(product.price),
          },
        ],
      });
    } else {
      const item = cart.items.find(
        (i) => i.productId.toString() === id
      );

      if (item) {
        item.quantity += qty;
      } else {
        cart.items.push({
          productId: id,
          quantity: qty,
          price: Number(product.price),
        });
      }
    }

    // 🔥 IMPORTANT FIX: handle old items without price
    for (let item of cart.items) {
      if (!item.price) {
        const prod = await Product.findById(item.productId);
        item.price = Number(prod.price) || 0;
      }
    }

    // ✅ safe total calculation (no NaN ever)
    cart.totalPrice = cart.items.reduce((acc, item) => {
      const q = Number(item.quantity) || 0;
      const p = Number(item.price) || 0;
      return acc + q * p;
    }, 0);

    await cart.save();


    res.status(201).json({
      message: "Added to cart", 
      cart,
    });

  } catch (err) {
    next(err);
  }
};



// export const createCart = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { quantity } = req.body;

//     const qty = Number(quantity);
//     if (!qty || qty <= 0) {
//       return next(new ExpressError("Invalid quantity", 400));
//     }

//     const product = await Product.findById(id);
//     if (!product) {
//       return next(new ExpressError("Product not found", 400));
//     }

//     const cartKey = `cart:${req.user._id}`;

//     // 🔥 Add / update quantity
//     await redisClient.hIncrBy(cartKey, id, qty);
 
//     // Optional: expire cart after 24h
//     await redisClient.expire(cartKey, 86400);

//     res.status(201).json({
//       message: "Added to cart (Redis)"
//     });

//   } catch (err) {
//     next(err);
//   }
// };


export const deleteCart = async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ userId:req.user._id });
  if (!cart) {
    return next(new ExpressError("Cart not found", StatusCodes.NOT_FOUND));
  }

  if (cart.userId.toString() !== req.user._id.toString()) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to remove ' });
        }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== id
  );
 
  await cart.save();

  const cartKey = `cart:${req.user._id}`;

  await redisClient.hDel(cartKey, id);

  return res.status(StatusCodes.OK).json({ message: "Item removed from cart", data:cart });
};
