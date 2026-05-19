import Joi from "joi";
 
 const userRegister = Joi.object({
  email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Enter a valid email",
      "string.empty": "Email cannot be empty",
    }),

  password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must not exceed 50 characters",
      "string.empty": "Password cannot be empty",
    }),

  name: Joi.string().required().messages({
      "any.required": " name is required",
      "string.empty": " name cannot be empty",
      "string.base": "Enter a valid  name",
    }),

      role: Joi.string()
    .valid("admin", "seller", "customer")
    .default("customer"),

  })


 const userLogin = Joi.object({
      email: Joi.string()
    .email()
    .trim()
    .lowercase()
    .required()
    .messages({
      "any.required": "Email is required",
      "string.email": "Enter a valid email",
      "string.empty": "Email cannot be empty",
    }),

    password: Joi.string()
    .min(6)
    .max(50)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.min": "Password must be at least 6 characters",
      "string.max": "Password must not exceed 50 characters",
      "string.empty": "Password cannot be empty",
    })
})

export {userRegister,userLogin}