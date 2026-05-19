import Product from "../models/product.js";
import ExpressError from "../utils/ExpressError.js";
import {StatusCodes} from "http-status-codes"
import redisClient from "../redis/redis.js"
 


export const getAllProduct=async(req,res)=>{  

//   let {pageNo,limit}=req.query;

//   let options={ 
//     page:parseInt(page),
//     limit:parseInt(limit)
//   }

//   let product=await Product.paginate({},options);

// // {
//   docs: [...products],        // actual data
//   totalDocs: 100,             // total products
//   limit: 5,                   // per page
//   totalPages: 20,
//   page: 2,
//   hasNextPage: true,
//   hasPrevPage: true
// }

// product: result.docs
// 👉 Only sending current page data

  // return res.status(StatusCodes.OK).json({
  //       product: result.docs,
  //       pagination: {
  //         totalItems: result.totalDocs,
  //         totalPages: result.totalPages,
  //         currentPage: result.page,
  //         limit: result.limit,
  //         hasNextPage: result.hasNextPage,
  //         hasPrevPage: result.hasPrevPage
  //       },
  //       message: "Products fetched successfully"
  //     });



     let alldata = await Product.find({});
  return res.status(StatusCodes.OK).json({ product: [ ...alldata] ,message:"featch all product"});
}

export const getProductById=async(req,res,next)=>{
  const { id } = req.params;

  if (!id) {
    return next(new ExpressError("Product id is required", StatusCodes.BAD_REQUEST));

  }

  const cachedProduct = await redisClient.get(`product:${id}`);

  if (cachedProduct) {
   
    return res.status(StatusCodes.OK).json({
      product: JSON.parse(cachedProduct),
      message: "fetch product (from cache)"
    });
  }


  const product = await Product.findById(id);

  if (!product) {
    return next(new ExpressError("Product not found", StatusCodes.NOT_FOUND));
  }

    await redisClient.setEx(`product:${id}`,3600,JSON.stringify(product));


  return res.status(StatusCodes.OK).json({ product ,message:"fetch product (from DB)"});

}

export const getProductByName=async(req,res,next)=>{

      

     const { search } = req.query;

const products = await Product.find({
  name: { $regex: search, $options: "i" }
});

       if(!products){
          return next(new ExpressError("Product not found", StatusCodes.NOT_FOUND))
       }
          
      
        return res.status(StatusCodes.OK).json({ product:products,message:"featch the product"});
}

export const createProduct = async (req, res,next) => {
     
 if (!req.file) {
    return next(new ExpressError("No file uploaded", StatusCodes.BAD_REQUEST));
  }



  let url = req.file.path;
  let filename = req.file.filename;
  
    const product = new Product({
       ...req.body,
   
      images:[{ url, filename }],
      userId: req.user._id  
    });

    await product.save();

    

    res.status(StatusCodes.CREATED).json({
      message: "Product created successfully",
      product
    });
 
};


export const updateProduct = async (req, res) => {
  let product = req.product;
  let id = product._id;
  let updateData = await Product.findByIdAndUpdate(id, req.body, { new: true });

   await redisClient.del(`product:${id}`);

  res
    .status(StatusCodes.OK)
    .json({ message: "product updated", product: updateData });
};

export const deleteProduct = async (req, res) => {
  let product = req.product;
  let id = product._id;

  let deleteData = await Product.findByIdAndDelete(id);

    await redisClient.del(`product:${id}`);

  res.status(StatusCodes.OK).json({ message: "product deleted", deleteProduct:deleteData });
};
