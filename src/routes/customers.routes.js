import { Router } from "express";
import { createCustomer } from "../controllers/customers.controllers.js";
import { customersValidation } from "../middlewares/customers.middleware.js";

const router = Router();

router.post("/customers", customersValidation, createCustomer);
router.get("/customers");
router.get("/customers");
router.put("/customers");

export default router;
