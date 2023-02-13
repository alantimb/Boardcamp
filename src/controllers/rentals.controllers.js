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

export async function findRentals(req, res) {}

// export async function createRental(req, res) {}

export async function deleteRental(req, res) {}
