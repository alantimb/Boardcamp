import { rentalsSchema } from "../schemas/rentals.schema.js";
import { db } from "../database/database.connection.js";
import dayjs from "dayjs";

export async function rentalValidation(req, res, next) {
  const { customerId, gameId, daysRented } = req.body;

  try {
    const customerExist = await db.query(
      "SELECT * FROM customers WHERE id=$1",
      [customerId]
    );

    if (customerExist.rowCount === 0) {
      return res.sendStatus(400);
    }

    const rentedGame = await db.query("SELECT * FROM games WHERE id=$1", [
      gameId,
    ]);

    if (rentedGame.rowCount === 0) {
      return res.sendStatus(400);
    }

    const rentedGames = await db.query(
      'SELECT * FROM rentals WHERE "gameId"=$1',
      [rentedGame.rows[0].id]
    );

    if (rentedGames.rows.length > rentedGame.rows[0].stockTotal) {
      return res.sendStatus(400);
    }

    const rental = {
      customerId,
      gameId,
      rentDate: new Date(),
      daysRented,
      returnDate: null,
      originalPrice: daysRented * rentedGame.rows[0].pricePerDay,
      delayFee: null,
    };

    const { error } = rentalsSchema.validate(rental, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);

      return res.status(400).send(errorMessages);
    }

    res.locals.rental = rental;
    res.locals.game = rentedGame;

    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
