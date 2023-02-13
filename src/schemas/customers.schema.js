import Joi from "joi";
import date from "@joi/date";

const joi = Joi.extend(date);

export const customersSchema = joi.object({
  name: joi.string().min(3).required(),
  phone: joi.string().min(10).max(11).required(),
  cpf: joi.string().length(11).pattern(/^\d+$/).required(),
  birthday: joi.date().format("YYYY-MM-DD").required(),
});
