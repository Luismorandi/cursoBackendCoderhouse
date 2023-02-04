import { Router } from "express";
import { authMiddl } from "../services/auth.js";
import  Checkout from "../controllers/checkout.controller.js"

const checkout = Router();
const checkoutController = new Checkout


checkout.get('/', authMiddl, checkoutController.buyCartActive)

export default checkout