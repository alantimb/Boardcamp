import { Router } from "express";
import { createRental, findRentals, deleteRental } from "../controllers/rentals.controllers.js";
import { rentalValidation } from "../middlewares/rentals.middleware.js";

const router = Router();

router.post("/rentals", rentalValidation, createRental);
router.get("/rentals", findRentals);
router.post("/rentals/:id/return", returnGame);
router.delete("/rentals/:id", deleteRental);


export default router;
