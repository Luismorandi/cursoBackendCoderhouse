import { Router } from "express";
import { authMiddl } from "../services/auth.service.js";
import  Products from "../controllers/products.controllers.js"

const products = Router();
const productsController = new Products


products.get('/', authMiddl, productsController.getAllProducts)
products.get("/:id", productsController.getProductById);
products.post("/", productsController.addProduct);
products.put("/:productId", productsController.updateProduct);

export default products