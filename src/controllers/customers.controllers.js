import { db } from "../database/database.connection.js";

export async function createCustomer(req, res) {
  const customer = res.locals.customer;

  try {
    await db.query(
      "INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)",
      [customer.name, customer.phone, customer.cpf, customer.birthday]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findCustomer(req, res) {
  try {
    // const customers = await db.query("SELECT * FROM games");

    // res.send(games.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
