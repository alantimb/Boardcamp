import { Router } from "express";
import {
  createCustomer,
  findCustomers,
} from "../controllers/customers.controllers.js";
import { customersValidation } from "../middlewares/customers.middleware.js";

const router = Router();

router.post("/customers", customersValidation, createCustomer);
router.get("/customers", findCustomers);
router.get("/customers");
router.put("/customers");

export default router;
