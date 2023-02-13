import { db } from "../database/database.connection.js";

export async function createCustomer(req, res) {
  const customer = res.locals.customer;
  console.log(customer);
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

export async function findCustomers(req, res) {
  try {
    const customers = await db.query("SELECT * FROM customers");

    return res.send(customers.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findCustomerById(req, res) {
  const { id } = req.params;

  try {
    const customers = await db.query("SELECT * FROM customers WHERE id=$1", [
      id,
    ]);

    if (customers.rows.length === 0) {
      return res.sendStatus(404);
    }

    return res.send(customers.rows[0]);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function updateCustomer(req, res) {
  try {
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
