import { Router } from "express";
import { authMiddl } from "../services/auth.service.js";
import  Carts from "../controllers/carts.controllers.js"

const carts = Router();
const cartsController = new Carts


carts.get("/cart-active",authMiddl, cartsController.getCartActive);

carts.get("/:productId", authMiddl,cartsController.addNewProduct);

carts.delete("/:id",authMiddl, cartsController.deleteCart);

carts.put("/:id/products/:id_prod",authMiddl, cartsController.deleteProductOfCart);

carts.get("/", cartsController.getAllCarts);

export default carts;
