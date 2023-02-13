import Joi from "joi";
import date from "@joi/date";

const joi = Joi.extend(date);

export const rentalsSchema = joi.object({
  customerId: joi.number().required(),
  gameId: joi.number().required(),
  rentDate: joi.date().format("YYYY-MM-DD").required(),
  daysRented: joi.number().greater(0).required(),
  returnDate: joi.date().allow(null),
  originalPrice: joi.number().required(),
  delayFee: joi.number().allow(null),
});
