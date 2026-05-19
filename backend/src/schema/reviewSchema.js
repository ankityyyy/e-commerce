import joi from "joi";

const reviewJoiSchema = joi.object({
  comment: joi.string().required().messages({
    "any.required": "comment is required",
    "string.empty": "comment cannot be empty",
    "string.base": "Enter a valid comment",
  }),

  rating: joi.number().min(1).max(5).required().messages({
    "any.required": "rating is required",
    "number.min": "rating must be at least 1",
    "number.max": "rating must not be greater than 5",
    "number.base": "rating must be a number",
  }),
});

export default reviewJoiSchema;