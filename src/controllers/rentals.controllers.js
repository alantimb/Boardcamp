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

[
  {
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: "2021-06-20",
    daysRented: 3,
    returnDate: null, // troca pra uma data quando já devolvido
    originalPrice: 4500,
    delayFee: null,
    customer: {
      id: 1,
      name: "João Alfredo",
    },
    game: {
      id: 1,
      name: "Banco Imobiliário",
    },
  },
];

// export async function createRental(req, res) {}

export async function deleteRental(req, res) {}
