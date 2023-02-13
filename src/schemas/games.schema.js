import joi from "joi";

export const gamesSchema = joi.object({
  id: joi.number().required(),
  name: joi.string().min(3).required(),
  image: joi.string().min(3).required(), //"http://",
  stockTotal: joi.number().greater(0).integer().required(),
  pricePerDay: joi.number().greater(0).integer().required(),
});
