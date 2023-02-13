import joi from "joi";

export const gamesSchema = joi.object({
  name: joi.string().min(3).required(),
  image: joi.string().min(7).required(),
  stockTotal: joi.number().greater(0).integer().required(),
  pricePerDay: joi.number().greater(0).integer().required(),
});
