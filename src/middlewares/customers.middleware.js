import { db } from "../database/database.connection.js";
import { customersSchema } from "../schemas/customers.schema.js";

export async function customersValidation(req, res, next) {
  const customer = req.body;

  console.log(customer)
  const { error } = customersSchema.validate(customer, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);

    return res.status(400).send(errorMessages);
  }

  try {
    const cpfExist = await db.query("SELECT * FROM customers WHERE cpf=$1", [
      customer.cpf,
    ]);

    if (cpfExist.rowCount > 0 && cpfExist.rows[0].id !== Number(req.params.id)) {
      return res
        .status(409)
        .send("This customer already exists. Please try another cpf.");
    }

    res.locals.customer = customer;

    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
