import { db } from "../database/database.connection.js";
import { gamesSchema } from "../schemas/games.schema.js";

export async function gamesValidation(req, res, next) {
  const game = req.body;

  const { error } = gamesSchema.validate(game, { abortEarly: false });

  if (error) {
    const errorMessages = error.details.map((detail) => detail.message);

    return res.status(400).send(errorMessages);
  }

  try {
    const gameExist = await db.query("SELECT * FROM games WHERE name=$1", [
      game.name,
    ]);

    if (gameExist.rowCount > 0) {
      return res
        .status(409)
        .send("This game already exists. Please try another name.");
    }

    res.locals.game = game;

    next();
  } catch (err) {
    return res.status(500).send(err.message);
  }
}
