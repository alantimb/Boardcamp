import { db } from "../database/database.connection.js";

export async function createGame(req, res) {
  const game = res.locals.game;
  console.log(game);
  try {
    await db.query(
      'INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)',
      [game.name, game.image, game.stockTotal, game.pricePerDay]
    );

    return res.sendStatus(201);
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function findGames(req, res) {
  try {
const games = await db.query("SELECT * FROM games")

res.send(games.rows)
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
