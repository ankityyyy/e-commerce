import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be empty",
    "string.base": "Name must be a valid string",
  }),

  description: Joi.string().required().messages({
    "any.required": "Description is required",
    "string.empty": "Description cannot be empty",
    "string.base": "Description must be a valid string",
  }),

  price: Joi.number().min(0).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 0",
  }),

  stock: Joi.number().min(0).required().messages({
    "any.required": "Stock is required",
    "number.base": "Stock must be a number",
    "number.min": "Stock must be at least 0",
  }),

  category: Joi.string().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be empty",
    "string.base": "Category must be a valid string",
  }),

  subcategory: Joi.string().required().messages({
    "any.required": "Subcategory is required",
    "string.empty": "Subcategory cannot be empty",
    "string.base": "Subcategory must be a valid string",
  }),

  bestSeller: Joi.boolean().optional().messages({
    "boolean.base": "BestSeller must be true or false",
  }),

  // 🚫 Prevent user from sending images manually
  images: Joi.forbidden().messages({
    "any.unknown": "Images are handled by server, not allowed here",
  }),

}).options({ stripUnknown: true }); // 🔥 important




const updateProductSchema = Joi.object({
  title: Joi.string().messages({
    "string.base": "title must be a string",
    "string.empty": "title cannot be empty",
  }),

  description: Joi.string().messages({
    "string.base": "description must be a string",
    "string.empty": "description cannot be empty",
  }),

  price: Joi.number().min(0).messages({
    "number.base": "price must be a number",
    "number.min": "price must be at least 0",
  }),

  discountPrice: Joi.number().min(0).messages({
    "number.base": "discount price must be a number",
    "number.min": "discount price must be at least 0",
  }),

  stock: Joi.number().min(0).messages({
    "number.base": "stock must be a number",
    "number.min": "stock must be at least 0",
  }),

  category: Joi.string().messages({
    "string.base": "category must be a string",
    "string.empty": "category cannot be empty",
  }),

  status: Joi.string()
    .valid("ACTIVE", "OUT_OF_STOCK", "DRAFT")
    .messages({
      "any.only": "status must be one of ACTIVE, OUT_OF_STOCK, DRAFT",
      "string.base": "status must be a string",
    }),
    

  image: Joi.forbidden().messages({
    "any.unknown": "image cannot be updated directly",
  }),

  isDeleted: Joi.forbidden().messages({
    "any.unknown": "isDeleted cannot be updated",
  }),
})
.min(1)
.messages({
  "object.min": "At least one field must be provided for update",
});

export { productSchema,updateProductSchema }