import { Router } from "express";
import { gamesSchemaValidation } from "../middlewares/games.middlewares";

const router = Router();

router.post("/games", gamesSchemaValidation);
router.get("/games");

export default router;
