import { Router } from "express";
import { authMiddl } from "../services/auth.service.js";
import  Products from "../controllers/products.controllers.js"

const products = Router();
const productsController = new Products


products.get('/', authMiddl, productsController.getAllProducts)

export default products