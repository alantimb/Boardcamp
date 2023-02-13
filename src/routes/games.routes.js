import { Router } from "express";
import { createGame, findGames } from "../controllers/games.controllers.js";
import { gamesValidation } from "../middlewares/games.middleware.js";

const router = Router();

router.post("/games", gamesValidation, createGame);
router.get("/games", findGames);

export default router;
