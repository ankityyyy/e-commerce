import  Cart  from "../models/cart.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../utils/ExpressError.js";
import  Product  from "../models/Product.js";
import redisClient from "../redis/redis.js"

export const getCart=async(req,res)=>{
 


     const cartItem= await Cart.find({ userId:req.user._id }).populate("items.productId","title stock price images")

     

     return res.status(StatusCodes.OK).json({ message:"all cart product add by user", item:cartItem });

}


export const createCart = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

  
    if (quantity === undefined) {
      return next(new ExpressError("Quantity is missing", StatusCodes.BAD_REQUEST));
    }

    const qty = Number(quantity);
    if (!qty || qty <= 0) {
      return next(new ExpressError("Invalid quantity", StatusCodes.BAD_REQUEST));
    }


    const product = await Product.findById(id);
    if (!product) {
      return next(new ExpressError("Product not found", StatusCodes.BAD_REQUEST));
    }

   

    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = new Cart({
        userId: req.user._id,
        items: [
          {
            productId: id,
            quantity: qty,
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
        });
      }
    }

    

    await cart.save();


    res.status(201).json({
      message: "Added to cart", 
      cart,
    });

  } catch (err) {
    next(err);
  }
};





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


// {
//   _id: ObjectId("cart1111111111111111111111"),

//   userId: ObjectId("111111111111111111111111"),

//   items: [
//     {
//       productId: ObjectId("aaaa11111111111111111111"),
//       quantity: 2
//     },
//     {
//       productId: ObjectId("bbbb22222222222222222222"),
//       quantity: 3
//     }
//   ],

//   createdAt: ISODate("2026-08-15T10:00:00Z"),
//   updatedAt: ISODate("2026-08-15T10:00:00Z")
// }