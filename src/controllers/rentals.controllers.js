import { db } from "../database/database.connection.js";

export async function createRental(req, res) {
  const rental = res.locals.rental;

  try {
    await db.query(
      'INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [
        rental.customerId,
        rental.gameId,
        rental.rentDate,
        rental.daysRented,
        rental.returnDate,
        rental.originalPrice,
        rental.delayFee,
      ]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findRentals(req, res) {
  try {
    const rentals = await db.query(
      `SELECT rentals.*, customers.id, customers.name, games.id, games.name FROM rentals 
      JOIN customers ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id`
    );

    return res.send(rentals.rows);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

// export async function createRental(req, res) {}

export async function deleteRental(req, res) {
  const { id } = req.params;

  try {
    const rentalID = await db.query("SELECT * FROM rentals WHERE id=$1", [id]);

    const rental = rentalID.rows[0];

    if (rentalID.rowCount === 0) {
      return res.sendStatus(404);
    } else if (!rental.returnDate) {
      return res.sendStatus(400);
    }

    await connectionDB.query("DELETE FROM rentals WHERE id=$1", [id]);

    return res.sendStatus(200);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
